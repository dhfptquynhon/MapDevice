import React from "react";
import './ThongKeWiFi.css';
import { wifiLocations as wifiTang1Beta } from "./Tang1Beta";
import { wifiLocations as wifiTang2Beta } from "./Tang2Beta";
import { wifiLocations as wifiTang3Beta } from "./Tang3Beta";
import { wifiLocations as wifiTang4Beta } from "./Tang4Beta";
import { wifiLocations as wifiTang5Beta } from "./Tang5Beta";
import { wifiLocations as wifiTang1Gamma } from "./Tang1Gamma";
import { wifiLocations as wifiTang2Gamma } from "./Tang2Gamma";
import { wifiLocations as wifiTang3Gamma } from "./Tang3Gamma";
import { wifiLocations as wifiTang4Gamma } from "./Tang4Gamma";
import { wifiLocations as wifiTang5Gamma } from "./Tang5Gamma";
import { wifiLocations as wifiTang1NCVso5 } from "./Tang1NCVso5";
import { wifiLocations as wifiTang2NCVso5 } from "./Tang2NCVso5";
import { wifiLocations as wifiTang1NCVso6 } from "./Tang1NCVso6";
import { wifiLocations as wifiTang2NCVso6 } from "./Tang2NCVso6";
import { wifiLocations as wifiTang1NCVso7 } from "./Tang1NCVso7";
import { wifiLocations as wifiTang2NCVso7 } from "./Tang2NCVso7";
import { wifiLocations as wifiKTXDomA } from "./KTXDomA";
import { wifiLocations as wifiKTXDomB } from "./KTXDomB";
import { wifiLocations as wifiSanVovinam } from "./SanVovinam";

// Hàm phân loại AP với ARUBA
const classifyAP = (wifiList) => {
    const result = { 
        U6Pro: 0, 
        U6LR: 0, 
        ACPro: 0,
        ACLite: 0,
        ARUBA: 0
    };

    if (!Array.isArray(wifiList)) return result;

    wifiList.forEach((wifi) => {
        const name = wifi.name?.toUpperCase();
        switch(true) {
            case name.includes('ARUBA'):
                result.ARUBA += 1;
                break;
            case name.includes('U6P'):
            case name.includes('U6-PRO'):
                result.U6Pro += 1;
                break;
            case name.includes('U6'):
                result.U6LR += 1;
                break;
            case name.includes('ACP'):
            case name.includes('AC-PRO'):
                result.ACPro += 1;
                break;
            case name.includes('LITE'):
                result.ACLite += 1;
                break;
            default:
                // No action needed for other cases
                break;
        }
    });

    return result;
};

// Dữ liệu các tòa nhà
const data = {
    beta: {
        "Tầng 1 Beta": classifyAP(wifiTang1Beta),
        "Tầng 2 Beta": classifyAP(wifiTang2Beta),
        "Tầng 3 Beta": classifyAP(wifiTang3Beta),
        "Tầng 4 Beta": classifyAP(wifiTang4Beta),
        "Tầng 5 Beta": classifyAP(wifiTang5Beta),
    },
    gamma: {
        "Tầng 1 Gamma": classifyAP(wifiTang1Gamma),
        "Tầng 2 Gamma": classifyAP(wifiTang2Gamma),
        "Tầng 3 Gamma": classifyAP(wifiTang3Gamma),
        "Tầng 4 Gamma": classifyAP(wifiTang4Gamma),
        "Tầng 5 Gamma": classifyAP(wifiTang5Gamma),
    },
    ncv: {
        5: {
            "Tầng 1": classifyAP(wifiTang1NCVso5),
            "Tầng 2": classifyAP(wifiTang2NCVso5)
        },
        6: {
            "Tầng 1": classifyAP(wifiTang1NCVso6),
            "Tầng 2": classifyAP(wifiTang2NCVso6)
        },
        7: {
            "Tầng 1": classifyAP(wifiTang1NCVso7),
            "Tầng 2": classifyAP(wifiTang2NCVso7)
        }
    },
    ktx: {
        domA: classifyAP(wifiKTXDomA),
        domB: classifyAP(wifiKTXDomB)
    },
    vovinam: {
        "Sân Vovinam": classifyAP(wifiSanVovinam)
    }
};

// Hàm tính tổng từng phần
const calculateTotal = (data) => {
    return Object.values(data).reduce((acc, curr) => {
        acc.U6Pro += curr.U6Pro;
        acc.U6LR += curr.U6LR;
        acc.ACPro += curr.ACPro;
        acc.ACLite += curr.ACLite;
        acc.ARUBA += curr.ARUBA;
        return acc;
    }, { U6Pro: 0, U6LR: 0, ACPro: 0, ACLite: 0, ARUBA: 0 });
};

// Hàm tính tổng toàn hệ thống
const getAllAPCounts = (obj) => {
    let total = 0;

    const countIn = (entry) => {
        if (entry && typeof entry === 'object') {
            if ('U6Pro' in entry) {
                total += entry.U6Pro + entry.U6LR + entry.ACPro + entry.ACLite + entry.ARUBA;
            } else {
                Object.values(entry).forEach(countIn);
            }
        }
    };

    Object.values(obj).forEach(countIn);
    return total;
};

const renderTable = (data, title) => {
    const total = calculateTotal(data);
    
    return (
        <div className="table-wrapper">
            <h3 className="building-title">{title}</h3>
            <table className="wifi-table">
                <thead>
                    <tr>
                        <th>Tầng/Khu vực</th>
                        <th>U6 Pro</th>
                        <th>U6 LR</th>
                        <th>AC-Pro</th>
                        <th>AC-Lite</th>
                        <th>ARUBA</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([name, ap]) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{ap.U6Pro}</td>
                            <td>{ap.U6LR}</td>
                            <td>{ap.ACPro}</td>
                            <td>{ap.ACLite}</td>
                            <td>{ap.ARUBA}</td>
                            <td>{ap.U6Pro + ap.U6LR + ap.ACPro + ap.ACLite + ap.ARUBA}</td>
                        </tr>
                    ))}
                    <tr className="total-row">
                        <td><strong>Tổng</strong></td>
                        <td><strong>{total.U6Pro}</strong></td>
                        <td><strong>{total.U6LR}</strong></td>
                        <td><strong>{total.ACPro}</strong></td>
                        <td><strong>{total.ACLite}</strong></td>
                        <td><strong>{total.ARUBA}</strong></td>
                        <td><strong>{Object.values(total).reduce((a, b) => a + b, 0)}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export function ThongKeWiFi() {
    const grandTotal = getAllAPCounts(data);

    return (
        <div className="thong-ke">
            <h1 className="main-title">THỐNG KÊ HỆ THỐNG WIFI</h1>
            <div className="total-system">
                <span className="total-label">Tổng số lượng AP hiện có:</span>
                <span className="total-value">{grandTotal}</span>
            </div>
            
            <div className="tables-container">
                {renderTable(data.beta, "NHÀ BETA")}
                {renderTable(data.gamma, "NHÀ GAMMA")}
                
                {/* Nhà công vụ */}
                {[5, 6, 7].map(house => (
                    <div key={house} className="ncv-house">
                        <h3 className="building-title">NHÀ CÔNG VỤ SỐ {house}</h3>
                        {renderTable(data.ncv[house])}
                    </div>
                ))}
                
                {/* Ký túc xá */}
                <div className="ktx-tables">
                    {renderTable({ "Dom A": data.ktx.domA }, "KÝ TÚC XÁ DOM A")}
                    {renderTable({ "Dom B": data.ktx.domB }, "KÝ TÚC XÁ DOM B")}
                </div>

                {/* Sân Vovinam */}
                {renderTable(data.vovinam, "SÂN VOVINAM")}
            </div>
        </div>
    );
}