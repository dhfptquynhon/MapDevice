import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrinterList.css';
import { allWifiLocations } from './wifiData'; 

// Dữ liệu máy in cục bộ
const printersData = [
  // Đại Học
  { id: 1, name: "CANON MF465DW", department: "HÀNH CHÁNH 1", ip: "172.16.0.254", mac: "20:0B:74:AA:CC:0F", type: 'university' },
  { id: 2, name: "CANON MF244DW", department: "HÀNH CHÁNH 2", ip: "172.16.0.90", mac: "EC:2E:98:A7:FC:42", type: 'university' },
  { id: 3, name: "CANON MF244DW", department: "TUYỂN SINH T5", ip: "172.16.0.69", mac: "20:4E:F6:0A:53:75", type: 'university' },
  { id: 4, name: "CANON MF244DW", department: "TUYỂN SINH T1", ip: "172.16.0.98", mac: "20:4E:F6:5F:9C:2D", type: 'university' },
  { id: 5, name: "CANON MF244DW", department: "ĐÀO TẠO", ip: "172.16.0.54", mac: "20:4E:F6:0A:35:B7", type: 'university' },
  { id: 6, name: "IN MÀU EPSON L8050", department: "CTSV", ip: "172.16.0.70", mac: "DC:CD:2F:E8:FE:01", type: 'university' },
  { id: 7, name: "CANON MF264DW", department: "VĂN PHÒNG FE", ip: "172.16.0.9", mac: "C4:AE:59:9E:12:2F", type: 'university' },
  { id: 8, name: "HP LaserJet Pro M404DW", department: "CTSV", ip: "172.16.0.154", mac: "C8:5A:CF:D0:B6:51", type: 'university' },
  { id: 9, name: "IN THẺ ENTRUST SIGMA DS2", department: "CTSV", ip: "Dùng cổng USB", mac: "XPS Card Printer", type: 'university' },
  // Phổ Thông
  { id: 10, name: "PHOTO TOSHIBA 357", department: "VĂN PHÒNG FSC", ip: "172.16.0.43", mac: "00:80:91:76:D7:9B", type: 'high_school' },
  { id: 11, name: "CANON MF244DW", department: "VĂN PHÒNG FSC", ip: "172.16.0.26", mac: "F0:03:8C:95:1D:C4", type: 'high_school' },
  { id: 12, name: "CANON MF244DW", department: "TUYỂN SINH FSC", ip: "172.16.0.88", mac: "20:4E:F6:0A:35:BD", type: 'high_school' },
];

const PrinterList = () => {
  const [groupedPrinters, setGroupedPrinters] = useState({
    "Đại Học": [],
    "Phổ Thông": []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Driver URLs cho tất cả máy in
  const driverUrls = {
    "CANON MF465DW": "https://vn.canon/vi/support/imageCLASS%20MF465dw/model",
    "CANON MF244DW": "https://drive.google.com/file/d/1EQUza81I5Tb6dj7gqaHP65YLYXbua0EI/view",
    "HP LaserJet Pro M404DW": "https://drive.google.com/file/d/1ivYdOH2aLfq_brIyyGs4hIcXwOEx5jsh/view",
    "IN THẺ ENTRUST SIGMA DS2": "https://drive.google.com/file/d/1oev7Yec9TCf7LY7GDE9dD41tL-uB9sGP/view",
    "IN MÀU EPSON L8050": "https://www.epson.com.vn/Ink-Tank-Printers/L-Series/Epson-L8050/s/SPT_C11CK37501",
    "CANON MF264DW": "https://drive.google.com/file/d/1bskaNQzomK0you3ShxD8DXKPCAWXzewW/view",
    "PHOTO TOSHIBA 357": "https://drive.google.com/file/d/1DcAc9P161j_VSA2XUPEtUjoQisODRkr9/view"
  };

  // Manual URLs cho tất cả máy in
  const manualUrls = {
    "CANON MF465DW": "https://docs.google.com/document/d/11LzfIwuVsuh-WigtfP_1a7FOCCsrevXw/edit",
    "CANON MF244DW": "https://drive.google.com/drive/u/4/folders/10NEl1d0aQklubo1ADqThQn192Y4f5I99",
    "HP LaserJet Pro M404DW": "https://drive.google.com/file/d/1WeE7sByF2RNz-wKsbqa5ny0uvikEr70D/view",
    "IN THẺ ENTRUST SIGMA DS2": "https://drive.google.com/file/d/1t8PnGPcGxXyceALP8ZciJqkA0TrSaJXz/view",
    "IN MÀU EPSON L8050": "https://drive.google.com/file/d/1eQKau0M5hCvabr95In9MEfGFgQE54r_-/view",
    "CANON MF264DW": "https://www.youtube.com/watch?v=ve9eChF3ako",
    "PHOTO TOSHIBA 357": "https://drive.google.com/drive/u/4/folders/1NLUA3sNlDV1zoM0ZfKPpk5ybr1sBlcts"
  };

  // WiFi connections cho tất cả phòng ban
  const wifiConnections = {
    "HÀNH CHÁNH 1": "AP-BT-FU-U6P",
    "HÀNH CHÁNH 2": "AP-BT-FU-U6P",
    "TUYỂN SINH T5": "AP-BT-TuyenSinh-U6P",
    "TUYỂN SINH T1": "AP-BT-TuyenSinh-U6P",
    "ĐÀO TẠO": "AP-Tang-4-401-U6",
      "CTSV": "AP-BT-CTSV-U6",
    "VĂN PHÒNG FE": "AP-Tang-5-503-U6",
    "MÁY PHOTO VĂN PHÒNG FSC": "AP-GM-VPFSC-U6P",
    "VĂN PHÒNG FSC": "AP-GM-VPFSC-U6P",
    "GV FSC": "AP-GM-GV-FSC-U6P",
    "TUYỂN SINH FSC": "AP-GM-PDichVu-U6P"
  };

  useEffect(() => {
    // Xử lý dữ liệu cục bộ thay vì fetch
    const processedData = printersData.map(printer => ({
      ...printer,
      driverUrl: driverUrls[printer.name] || '#',
      manualUrl: manualUrls[printer.name] || '#',
      wifi: wifiConnections[printer.department] || 'Chưa xác định'
    }));

    setGroupedPrinters({
      "Đại Học": processedData.filter(p => p.type === 'university'),
      "Phổ Thông": processedData.filter(p => p.type === 'high_school')
    });
    setLoading(false);
  }, []);

  const handleWifiClick = (wifiName) => {
    if (!wifiName || wifiName === 'Chưa xác định') {
      alert('Chưa xác định WiFi cho máy in này.');
      return;
    }

    const wifi = allWifiLocations.find(w => w.name === wifiName);

    if (wifi) {
      navigate(wifi.path, {
        state: {
          highlightedWifi: wifi.name,
          scrollToWifi: true
        }
      });
    } else {
      alert(`Không tìm thấy thông tin vị trí cho WiFi: ${wifiName}`);
    }
  };

  const handleAction = (printer, type) => {
    if (printer[`${type}Url`] === '#') {
      alert(type === 'driver' ? 'Driver chưa có sẵn để tải về' : 'Hướng dẫn chưa có sẵn');
      return false;
    }
    console.log(`${type === 'driver' ? 'Downloading' : 'Viewing'} ${type} for printer: ${printer.name}`);
    return true;
  };

  if (loading) {
    return <div className="loading">Đang tải danh sách máy in...</div>;
  }

  return (
    <div className="printer-list-container">
      {Object.entries(groupedPrinters).map(([groupName, printers]) => (
        <div key={groupName} className="printer-group">
          <h2 className="group-title">{groupName}</h2>
          <div className="table-responsive">
            <table className="printer-table">
              <thead>
                <tr>
                  <th className="col-name">TÊN THIẾT BỊ</th>
                  <th className="col-dept">PHÒNG/BAN</th>
                  <th className="col-ip">IP</th>
                  <th className="col-mac">MAC</th>
                  <th className="col-location">WIFI KẾT NỐI</th>
                  <th className="col-driver">DRIVER</th>
                  <th className="col-manual">HƯỚNG DẪN</th>
                </tr>
              </thead>
              <tbody>
                {printers.map((printer) => (
                  <tr key={printer.id}>
                    <td className="col-name">{printer.name}</td>
                    <td className="col-dept">{printer.department}</td>
                    <td className="col-ip">{printer.ip}</td>
                    <td className="col-mac">{printer.mac}</td>
                    <td className="col-location">
                      <button 
                        className="wifi-btn"
                        onClick={() => handleWifiClick(printer.wifi)}
                      >
                        {printer.wifi}
                      </button>
                    </td>
                    <td className="col-driver">
                      <a 
                        href={printer.driverUrl} 
                        className="driver-link"
                        onClick={(e) => !handleAction(printer, 'driver') && e.preventDefault()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tải về
                      </a>
                    </td>
                    <td className="col-manual">
                      <a 
                        href={printer.manualUrl} 
                        className="manual-link"
                        onClick={(e) => !handleAction(printer, 'manual') && e.preventDefault()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem hướng dẫn
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrinterList;