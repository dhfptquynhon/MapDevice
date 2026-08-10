// Đồng bộ tên WiFi + kênh sóng trực tiếp từ UniFi Controller (qua Ubiquiti cloud, giống trang
// https://unifi.ui.com/network-servers/<consoleId>/network/<site>/devices) vào các trang bản đồ
// (src/components/Tang*.js, KTXDomA.js, KTXDomB.js, SanVovinam.js).
//
// Cách dùng: điền UNIFI_API_KEY (và UNIFI_CONSOLE_ID/UNIFI_SITE_ID nếu khác mặc định) vào file
// .env (xem .env.example), rồi chạy:
//   npm run sync-wifi-unifi
//
// Vì sao gọi API "legacy" (/stat/device) thay vì API chính thức mới (/integration/v1)?
// API integration/v1 mới của UniFi CHƯA trả về kênh sóng (radio/channel) của từng AP — chỉ có
// API nội bộ cũ (được UniFi Network dùng cho chính giao diện của họ) mới có radio_table_stats
// chứa kênh 2.4G/5G. Ubiquiti cho phép gọi API cũ này qua cùng cổng cloud connector proxy, dùng
// chung API Key, nên không cần VPN hay mở cổng tới controller.

require("dotenv").config();
const path = require("path");
const { parseName, normArea, syncAllFiles, printSummary } = require("./lib/wifi-sync-core");

const API_KEY = process.env.UNIFI_API_KEY;
const CONSOLE_ID = process.env.UNIFI_CONSOLE_ID;
const SITE_ID = process.env.UNIFI_SITE_ID || "default";
const COMP_DIR = path.join(__dirname, "..", "src", "components");

if (!API_KEY || !CONSOLE_ID) {
  console.error(
    "Thiếu UNIFI_API_KEY hoặc UNIFI_CONSOLE_ID.\n" +
      "1. Sao chép .env.example thành .env\n" +
      "2. Vào unifi.ui.com > Account Settings > API để tạo API Key (chỉ cần quyền đọc/View)\n" +
      "3. Điền API Key vào UNIFI_API_KEY trong .env\n" +
      "   (UNIFI_CONSOLE_ID mặc định đã điền sẵn theo đường link bạn cung cấp)"
  );
  process.exit(1);
}

const DEVICES_URL =
  `https://api.ui.com/v1/connector/consoles/${CONSOLE_ID}` +
  `/network/api/s/${encodeURIComponent(SITE_ID)}/stat/device`;

// Map tên radio UniFi báo về -> băng tần ta quan tâm.
const RADIO_BAND = { ng: "ch24", na: "ch5" };

function extractChannels(device) {
  const stats = Array.isArray(device.radio_table_stats) ? device.radio_table_stats : [];
  const cfg = Array.isArray(device.radio_table) ? device.radio_table : [];
  const out = { ch24: null, ch5: null };

  for (const entry of stats) {
    const key = RADIO_BAND[entry.radio];
    if (key && typeof entry.channel === "number") out[key] = entry.channel;
  }
  // radio_table_stats trống khi AP offline/chưa có số liệu -> thử lấy kênh cấu hình (radio_table).
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

async function fetchDevices() {
  const res = await fetch(DEVICES_URL, {
    headers: { "X-API-Key": API_KEY, Accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(
      `UniFi API trả lỗi ${res.status} ${res.statusText}.\n` +
        `URL: ${DEVICES_URL}\n` +
        `Nội dung: ${text.slice(0, 500)}\n` +
        (res.status === 401 || res.status === 403
          ? "-> Kiểm tra lại UNIFI_API_KEY (và quyền của key đó với site này)."
          : res.status === 404
          ? "-> Kiểm tra lại UNIFI_CONSOLE_ID và UNIFI_SITE_ID."
          : "")
    );
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Phản hồi từ UniFi API không phải JSON hợp lệ:\n" + text.slice(0, 500));
  }
  const data = Array.isArray(json) ? json : json.data;
  if (!Array.isArray(data)) {
    throw new Error(
      "Không tìm thấy mảng thiết bị trong phản hồi UniFi API. Nội dung nhận được:\n" +
        JSON.stringify(json).slice(0, 800)
    );
  }
  return data;
}

async function main() {
  console.log(`Đang lấy danh sách thiết bị từ UniFi (site "${SITE_ID}")...`);
  const devices = await fetchDevices();

  const aps = devices.filter((d) => d.type === "uap" || Array.isArray(d.radio_table_stats));
  console.log(`Tìm thấy ${devices.length} thiết bị, trong đó ${aps.length} Access Point.\n`);

  const records = [];
  let missingChannel = 0;
  for (const d of aps) {
    const name = d.name || d.mac;
    const { ch24, ch5 } = extractChannels(d);
    if (ch24 === null && ch5 === null) missingChannel += 1;
    const { building, floor, room, area } = parseName(name);
    records.push({ name, building, floor, room, area, areaNorm: normArea(area), ch24, ch5 });
  }

  if (missingChannel > 0) {
    console.log(
      `Lưu ý: ${missingChannel} AP không đọc được kênh sóng (có thể đang offline hoặc chưa cấp phát kênh).`
    );
  }

  const results = syncAllFiles(records, COMP_DIR);
  printSummary(results);
}

main().catch((err) => {
  console.error("\nĐồng bộ thất bại:\n" + err.message);
  process.exit(1);
});
