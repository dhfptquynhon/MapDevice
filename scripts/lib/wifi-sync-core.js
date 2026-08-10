// Logic dùng chung để khớp một danh sách bản ghi { name, ch24, ch5 } (lấy từ Excel
// hoặc từ UniFi Controller) với các AP đã đặt vị trí (top/left) trong src/components/Tang*.js,
// KTXDomA.js, KTXDomB.js, SanVovinam.js — rồi cập nhật lại "name"/"ch24"/"ch5" trong các file đó.
//
// Việc khớp dựa vào Tòa nhà + Tầng + Số phòng (hoặc tên khu vực) suy ra từ tên AP, không dựa
// vào so khớp chuỗi tuyệt đối, nên vẫn khớp đúng dù nguồn dữ liệu sửa lỗi chính tả/đổi hậu tố.

const fs = require("fs");
const path = require("path");

const SUFFIX_WORDS = new Set([
  "U6P", "U6P1", "U6", "ACP", "ACP1", "LITE", "OLD", "DUPHONG",
]);

function parseName(rawName) {
  const raw = rawName.trim();
  let tokens = raw.split(/[\s-]+/).filter(Boolean);
  if (tokens.length && tokens[0].toUpperCase() === "AP") {
    tokens = tokens.slice(1);
  }
  if (!tokens.length) return { building: null, floor: null, room: null, area: null };

  let idx = 0;
  const b0 = tokens[0].toUpperCase();
  let building;
  if (b0 === "NCV") {
    if (tokens[1] && /^\d+$/.test(tokens[1])) {
      building = `NCV-${tokens[1]}`;
      idx = 2;
    } else {
      building = "NCV";
      idx = 1;
    }
  } else if (b0 === "BT" || b0 === "GM") {
    building = b0;
    idx = 1;
  } else {
    building = null;
    idx = 0;
  }

  let floor = null;
  if (idx < tokens.length) {
    const tok = tokens[idx];
    const m = /^Tang(\d+)$/i.exec(tok);
    const m2 = /^T(\d)$/i.exec(tok);
    if (m) {
      floor = m[1];
      idx += 1;
    } else if (tok.toLowerCase() === "tang" && tokens[idx + 1] && /^\d+$/.test(tokens[idx + 1])) {
      floor = tokens[idx + 1];
      idx += 2;
    } else if (m2) {
      floor = m2[1];
      idx += 1;
    }
  }

  let room = null;
  if (floor !== null && idx < tokens.length && /^\d+[A-Za-z]?$/.test(tokens[idx])) {
    room = tokens[idx];
    idx += 1;
    if (idx < tokens.length && /^\d$/.test(tokens[idx])) {
      room += "-" + tokens[idx];
      idx += 1;
    }
  }

  const rest = tokens.slice(idx);
  const areaTokens = rest.filter((t) => !SUFFIX_WORDS.has(t.toUpperCase()));
  const area = areaTokens.length ? areaTokens.join(" ") : null;

  return { building, floor, room, area };
}

function normArea(s) {
  if (!s) return "";
  return s.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function buildIndexes(records) {
  const byBRoom = new Map();
  const byBArea = new Map();
  const byBFloor = new Map();

  for (const rec of records) {
    if (rec.floor !== null && rec.room !== null) {
      const key = `${rec.building}|${rec.floor}|${rec.room}`;
      if (!byBRoom.has(key)) byBRoom.set(key, []);
      byBRoom.get(key).push(rec);
    } else if (rec.areaNorm) {
      const key = `${rec.building}|${rec.areaNorm}`;
      if (!byBArea.has(key)) byBArea.set(key, []);
      byBArea.get(key).push(rec);
    }
    if (rec.floor !== null && rec.room === null && !rec.areaNorm) {
      const key = `${rec.building}|${rec.floor}`;
      if (!byBFloor.has(key)) byBFloor.set(key, []);
      byBFloor.get(key).push(rec);
    }
  }
  return { byBRoom, byBArea, byBFloor };
}

function lookup(name, ctxBuilding, ctxFloor, indexes) {
  const parsed = parseName(name);
  const building = parsed.building || ctxBuilding;
  const floor = parsed.floor || ctxFloor;
  const { room, area } = parsed;

  let match = null;
  if (floor !== null && room !== null) {
    match = indexes.byBRoom.get(`${building}|${floor}|${room}`);
  }
  if (!match && area) {
    const an = normArea(area);
    match = indexes.byBArea.get(`${building}|${an}`);
    if (!match) {
      for (const [key, recs] of indexes.byBArea) {
        const [b, keyArea] = key.split("|");
        if (b !== building) continue;
        if (an && (an.includes(keyArea) || keyArea.includes(an))) {
          match = recs;
          break;
        }
      }
    }
  }
  if (!match && floor !== null && room === null && !area) {
    match = indexes.byBFloor.get(`${building}|${floor}`);
  }
  return match ? match[0] : null;
}

// Ngữ cảnh (tòa nhà, tầng) suy ra từ tên file, dùng khi bản thân tên AP trên
// bản đồ không tự chứa tiền tố tòa nhà (ví dụ "AP-Tang-2-206-U6" ở trang Beta).
const FILE_CONTEXT = {
  Tang1Beta: ["BT", "1"], Tang2Beta: ["BT", "2"], Tang3Beta: ["BT", "3"],
  Tang4Beta: ["BT", "4"], Tang5Beta: ["BT", "5"],
  Tang1Gamma: ["GM", "1"], Tang2Gamma: ["GM", "2"], Tang3Gamma: ["GM", "3"],
  Tang4Gamma: ["GM", "4"], Tang5Gamma: ["GM", "5"],
  Tang1NCVso5: ["NCV-5", "1"], Tang2NCVso5: ["NCV-5", "2"],
  Tang1NCVso6: ["NCV-6", "1"], Tang2NCVso6: ["NCV-6", "2"],
  Tang1NCVso7: ["NCV-7", "1"], Tang2NCVso7: ["NCV-7", "2"],
  KTXDomA: [null, null], KTXDomB: ["GM", null], SanVovinam: ["BT", null],
};

const BLOCK_RE = /export const wifiLocations = \[([\s\S]*?)\n\s*\];/;
const ENTRY_RE = /\{\s*name:\s*"([^"]+)"\s*,\s*top:\s*"([^"]+)"\s*,\s*left:\s*"([^"]+)"\s*(?:,\s*ch24:\s*\d+)?\s*(?:,\s*ch5:\s*\d+)?\s*\}/g;

function syncFile(filePath, ctxBuilding, ctxFloor, indexes) {
  const base = path.basename(filePath, ".js");
  const text = fs.readFileSync(filePath, "utf8");
  const blockMatch = BLOCK_RE.exec(text);
  if (!blockMatch) {
    return { base, total: 0, matched: 0, skipped: true };
  }

  const entries = [...blockMatch[1].matchAll(ENTRY_RE)];
  if (!entries.length) {
    return { base, total: 0, matched: 0, skipped: false };
  }

  let matchedCount = 0;
  const newLines = entries.map(([, name, top, left]) => {
    const rec = lookup(name, ctxBuilding, ctxFloor, indexes);
    const parts = [`name: "${rec ? rec.name : name}"`, `top: "${top}"`, `left: "${left}"`];
    if (rec) {
      matchedCount += 1;
      if (rec.ch24 !== null && rec.ch24 !== undefined) parts.push(`ch24: ${rec.ch24}`);
      if (rec.ch5 !== null && rec.ch5 !== undefined) parts.push(`ch5: ${rec.ch5}`);
    }
    return "    { " + parts.join(", ") + " },";
  });

  const newBody = "\n" + newLines.join("\n");
  const newText =
    text.slice(0, blockMatch.index) +
    "export const wifiLocations = [" +
    newBody +
    "\n];" +
    text.slice(blockMatch.index + blockMatch[0].length);

  fs.writeFileSync(filePath, newText, "utf8");
  return { base, total: entries.length, matched: matchedCount, skipped: false };
}

// records: [{ name, building, floor, room, area, areaNorm, ch24, ch5 }]
// (building/floor/room/area/areaNorm có thể tính sẵn bằng parseName()+normArea() của nguồn dữ liệu,
//  hoặc để null/"" nếu chưa biết — lookup() vẫn tự suy ra ngữ cảnh building/floor từ FILE_CONTEXT).
function syncAllFiles(records, compDir) {
  const indexes = buildIndexes(records);
  const results = [];
  for (const [base, [ctxBuilding, ctxFloor]] of Object.entries(FILE_CONTEXT)) {
    const filePath = path.join(compDir, `${base}.js`);
    if (!fs.existsSync(filePath)) continue;
    results.push(syncFile(filePath, ctxBuilding, ctxFloor, indexes));
  }
  return results;
}

function printSummary(results) {
  console.log("Đồng bộ dữ liệu xong:\n");
  for (const r of results) {
    if (r.skipped) {
      console.log(`  ${r.base.padEnd(15)} !! không tìm thấy khối wifiLocations`);
    } else {
      console.log(`  ${r.base.padEnd(15)} tổng ${String(r.total).padStart(2)} AP, khớp kênh ${r.matched}/${r.total}`);
    }
  }
  console.log("\nLưu ý: vị trí (top/left) trên bản đồ không có trong nguồn dữ liệu nên luôn được giữ nguyên.");
  console.log("AP nào không tìm thấy trên bản đồ nào sẽ không tự thêm được (không có tọa độ) - cần tự thêm thủ công vào file Tang*.js tương ứng.");
}

module.exports = {
  parseName,
  normArea,
  buildIndexes,
  lookup,
  FILE_CONTEXT,
  syncAllFiles,
  printSummary,
};
