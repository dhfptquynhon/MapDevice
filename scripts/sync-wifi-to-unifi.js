// Push WiFi name + channel changes from file Excel ("tên và kênh sóng wifi các phòng.xlsx")
// LEN UniFi Controller — chiều ngược so với sync-wifi-unifi.js (script kia đọc TỪ UniFi
// xuong app, con script nay day TU Excel len UniFi).
//
// Moi khi sua ten/kenh trong file Excel, chay script nay de cap nhat len UniFi Controller.
// Script se:
//   1. Doc danh sach AP + kenh tu file Excel (nguon true)
//   2. Lay danh sach AP hien tai tu UniFi Controller
//   3. Khop theo vi tri (Toa nha + Tang + Phong) — khong khop theo ten tuyet doi,
//      nen van dung khi ten AP bi doi
//   4. Voi moi AP khop: so sanh ten + kenh 2.4G + kenh 5G
//   5. Neu co khac biet -> PUT API len UniFi de cap nhat
//
// Cach dung:
//   npm run sync-wifi-to-unifi                  (xem truoc - dry run, KHONG thay doi)
//   npm run sync-wifi-to-unifi -- --apply       (ap dung that - cap nhat len UniFi)
//
// YEU CAU: UNIFI_API_KEY can co quyen WRITE (khong phai read-only).
// Tao API key tai: unifi.ui.com > Account Settings > API

require("dotenv").config();
const path = require("path");
const XLSX = require("xlsx");
const { parseName, normArea, buildIndexes, lookup } = require("./lib/wifi-sync-core");

const API_KEY = process.env.UNIFI_API_KEY;
const CONSOLE_ID = process.env.UNIFI_CONSOLE_ID;
const SITE_ID = process.env.UNIFI_SITE_ID || "default";
const XLSX_PATH = path.join(__dirname, "..", "tên và kênh sóng wifi các phòng.xlsx");
const APPLY = process.argv.includes("--apply");

if (!API_KEY || !CONSOLE_ID) {
  console.error(
    "Thieu UNIFI_API_KEY hoac UNIFI_CONSOLE_ID.\n" +
      "1. Sao chep .env.example thanh .env\n" +
      "2. Tao API Key co quyen WRITE tai unifi.ui.com > Account Settings > API\n" +
      "3. Dien thong tin vao .env"
  );
  process.exit(1);
}

const BASE_URL =
  `https://api.ui.com/v1/connector/consoles/${CONSOLE_ID}` +
  `/network/api/s/${encodeURIComponent(SITE_ID)}`;
const DEVICES_URL = `${BASE_URL}/stat/device`;

const RADIO_BAND = { ng: "ch24", na: "ch5" };

// ============ DOC EXCEL (nguon true) ============

function parseChannelCell(cell) {
  if (cell === undefined || cell === null || cell === "") return null;
  if (typeof cell === "number") return cell;
  const m = /^\s*(\d+)/.exec(String(cell));
  return m ? parseInt(m[1], 10) : null;
}

function loadXlsxRecords() {
  const wb = XLSX.readFile(XLSX_PATH);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

  const headerRowIdx = rows.findIndex((r) =>
    r.some((c) => typeof c === "string" && c.toLowerCase().includes("tên wifi"))
  );
  if (headerRowIdx === -1) {
    throw new Error('Khong tim thay dong tieu de chua "Tên wifi" trong file Excel.');
  }
  const header = rows[headerRowIdx];
  const nameCol = header.findIndex((c) => typeof c === "string" && c.toLowerCase().includes("tên wifi"));
  const ch24Col = header.findIndex((c) => typeof c === "string" && c.includes("2.4"));
  const ch5Col = header.findIndex((c) => typeof c === "string" && c.includes("5G"));

  if (nameCol === -1 || ch24Col === -1 || ch5Col === -1) {
    throw new Error("Khong tim thay du 3 cot Ten wifi / Kenh 2.4G / Kenh 5G trong file Excel.");
  }

  const records = [];
  for (let i = headerRowIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row[nameCol]) continue;
    const name = String(row[nameCol]).trim();
    const { building, floor, room, area } = parseName(name);
    records.push({
      name,
      building,
      floor,
      room,
      area,
      areaNorm: normArea(area),
      ch24: parseChannelCell(row[ch24Col]),
      ch5: parseChannelCell(row[ch5Col]),
    });
  }
  return records;
}

// ============ GOI API UNIFI ============

async function fetchDevices() {
  const res = await fetch(DEVICES_URL, {
    headers: { "X-API-Key": API_KEY, Accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(
      `UniFi API tra loi ${res.status} ${res.statusText}.\n` +
        `URL: ${DEVICES_URL}\n` +
        `Noi dung: ${text.slice(0, 500)}`
    );
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Phan hoi UniFi API khong phai JSON hop le:\n" + text.slice(0, 500));
  }
  const data = Array.isArray(json) ? json : json.data;
  if (!Array.isArray(data)) {
    throw new Error("Khong tim thay mang thiet bi trong phan hoi UniFi API.");
  }
  return data;
}

function extractChannels(device) {
  const stats = Array.isArray(device.radio_table_stats) ? device.radio_table_stats : [];
  const cfg = Array.isArray(device.radio_table) ? device.radio_table : [];
  const out = { ch24: null, ch5: null };

  for (const entry of stats) {
    const key = RADIO_BAND[entry.radio];
    if (key && typeof entry.channel === "number") out[key] = entry.channel;
  }
  if (out.ch24 === null || out.ch5 === null) {
    for (const entry of cfg) {
      const key = RADIO_BAND[entry.radio];
      if (key && out[key] === null && typeof entry.channel === "number") {
        out[key] = entry.channel;
      }
    }
  }
  return out;
}

// ============ TAO BODY CAP NHAT ============

function buildUpdateBody(update) {
  const body = {};

  if (update.nameChanged) {
    body.name = update.newName;
  }

  if (update.ch24Changed || update.ch5Changed) {
    const cfg = Array.isArray(update.radioTable) ? update.radioTable : [];
    if (cfg.length === 0) {
      console.log(`    !! AP khong co radio_table trong config - bo qua kenh`);
    } else {
      body.radio_table = cfg.map((entry) => {
        const bandKey = RADIO_BAND[entry.radio];
        if (bandKey === "ch24" && update.ch24Changed) {
          return { ...entry, channel: update.newCh24 };
        }
        if (bandKey === "ch5" && update.ch5Changed) {
          return { ...entry, channel: update.newCh5 };
        }
        return { ...entry };
      });
    }
  }

  return body;
}

// ============ GOI PUT CAP NHAT THIET BI ============

async function updateDevice(deviceId, body) {
  const url = `${BASE_URL}/rest/device/${deviceId}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    let hint = "";
    if (res.status === 401 || res.status === 403) {
      hint = "\n-> API Key khong co quyen WRITE. Tao key moi co quyen write tai:\n" +
             "   unifi.ui.com > Account Settings > API";
    }
    throw new Error(
      `PUT /rest/device that bai: ${res.status} ${res.statusText}\n` +
        `Noi dung: ${text.slice(0, 300)}${hint}`
    );
  }
}

// ============ HIEN THI THAY DOI ============

function fmt(v) {
  return v === null || v === undefined ? "?" : String(v);
}

function printUpdate(u, index) {
  const changes = [];
  if (u.nameChanged) {
    changes.push(`ten: "${u.oldName}" -> "${u.newName}"`);
  }
  if (u.ch24Changed) {
    changes.push(`kenh 2.4G: ${fmt(u.oldCh24)} -> ${fmt(u.newCh24)}`);
  }
  if (u.ch5Changed) {
    changes.push(`kenh 5G: ${fmt(u.oldCh5)} -> ${fmt(u.newCh5)}`);
  }
  console.log(`\n  [${index}] ${u.oldName} (MAC: ${u.mac})`);
  for (const c of changes) {
    console.log(`      ${c}`);
  }
}

// ============ MAIN ============

async function main() {
  console.log("=== PUSH WIFI DATA LEN UNIFI CONTROLLER ===\n");

  if (!APPLY) {
    console.log("Che do: XEM TRUOC (dry-run). Them --apply de ap dung that.\n");
  } else {
    console.log("Che do: AP DUNG THAY DOI LEN UNIFI.\n");
  }

  console.log("1. Doc danh sach AP tu file Excel...");
  const records = loadXlsxRecords();
  console.log(`   Doc duoc ${records.length} ban ghi tu Excel.`);

  const indexes = buildIndexes(records);

  console.log(`2. Lay danh sach thiet bi tu UniFi (site "${SITE_ID}")...`);
  const devices = await fetchDevices();
  const aps = devices.filter((d) => d.type === "uap" || Array.isArray(d.radio_table_stats));
  console.log(`   Tim thay ${devices.length} thiet bi, trong do ${aps.length} Access Point.`);

  console.log("\n3. Khoi tao khop theo vi tri va so sanh...");
  const updates = [];
  let matched = 0;
  let noMatch = 0;
  let noChange = 0;

  for (const d of aps) {
    const apName = d.name || d.mac;
    const parsed = parseName(apName);
    const rec = lookup(apName, parsed.building, parsed.floor, indexes);

    if (!rec) {
      noMatch += 1;
      continue;
    }

    matched += 1;
    const currentCh = extractChannels(d);

    const nameChanged = rec.name !== apName;
    const ch24Changed = rec.ch24 !== null && rec.ch24 !== currentCh.ch24;
    const ch5Changed = rec.ch5 !== null && rec.ch5 !== currentCh.ch5;

    if (!nameChanged && !ch24Changed && !ch5Changed) {
      noChange += 1;
      continue;
    }

    updates.push({
      deviceId: d._id,
      mac: d.mac,
      oldName: apName,
      newName: rec.name,
      nameChanged,
      oldCh24: currentCh.ch24,
      newCh24: rec.ch24,
      ch24Changed,
      oldCh5: currentCh.ch5,
      newCh5: rec.ch5,
      ch5Changed,
      radioTable: d.radio_table,
    });
  }

  console.log(`   Khap: ${matched} AP | Khong khap: ${noMatch} AP | Da dong bo: ${noChange} AP`);

  if (updates.length === 0) {
    console.log("\n=> Khong co thay doi nao can cap nhat. Tat ca da dong bo.");
    return;
  }

  console.log(`\n4. Tim thay ${updates.length} AP can cap nhat:`);
  updates.forEach((u, i) => printUpdate(u, i + 1));

  if (!APPLY) {
    console.log("\n=> Che do xem truoc - KHONG gui thay doi len UniFi.");
    console.log("   De ap dung that, chay: npm run sync-wifi-to-unifi -- --apply");
    return;
  }

  console.log("\n5. Dang cap nhat len UniFi Controller...");
  let ok = 0;
  let fail = 0;

  for (const u of updates) {
    const body = buildUpdateBody(u);
    try {
      await updateDevice(u.deviceId, body);
      console.log(`   [OK] ${u.oldName}`);
      ok += 1;
    } catch (err) {
      console.error(`   [FAIL] ${u.oldName}: ${err.message}`);
      fail += 1;
    }
  }

  console.log(`\n=== KET QUA ===`);
  console.log(`   Thanh cong: ${ok}/${updates.length}`);
  if (fail > 0) {
    console.log(`   That bai: ${fail}/${updates.length}`);
    console.log("   (Xem loi chi tiet ben tren)");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\nCap nhat that bai:\n" + err.message);
  process.exit(1);
});
