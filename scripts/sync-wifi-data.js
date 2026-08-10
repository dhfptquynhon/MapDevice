// Đồng bộ tên WiFi + kênh sóng từ file "tên và kênh sóng wifi các phòng.xlsx" vào các trang
// bản đồ (src/components/Tang*.js, KTXDomA.js, KTXDomB.js, SanVovinam.js).
//
// Cách dùng: sau khi sửa tên/kênh trong file Excel, chạy:
//   npm run sync-wifi

const path = require("path");
const XLSX = require("xlsx");
const { parseName, normArea, syncAllFiles, printSummary } = require("./lib/wifi-sync-core");

const XLSX_PATH = path.join(__dirname, "..", "tên và kênh sóng wifi các phòng.xlsx");
const COMP_DIR = path.join(__dirname, "..", "src", "components");

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
    throw new Error('Không tìm thấy dòng tiêu đề chứa "Tên wifi" trong file Excel.');
  }
  const header = rows[headerRowIdx];
  const nameCol = header.findIndex((c) => typeof c === "string" && c.toLowerCase().includes("tên wifi"));
  const ch24Col = header.findIndex((c) => typeof c === "string" && c.includes("2.4"));
  const ch5Col = header.findIndex((c) => typeof c === "string" && c.includes("5G"));

  if (nameCol === -1 || ch24Col === -1 || ch5Col === -1) {
    throw new Error("Không tìm thấy đủ 3 cột Tên wifi / Kênh 2.4G / Kênh 5G trong file Excel.");
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

function main() {
  const records = loadXlsxRecords();
  const results = syncAllFiles(records, COMP_DIR);
  printSummary(results);
}

main();
