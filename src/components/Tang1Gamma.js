import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T1Gamma.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
        { name: "AP-GM-VPFSC-U6P", top: "18%", left: "82%" },
        { name: "AP-GM-SanTruong-01-U6P", top: "28%", left: "43%" },
        { name: "AP-GM-SanTruong-03-U6P", top: "50%", left: "79%" },
        { name: "AP-GM-PDichVu-U6P", top: "89%", left: "81%" },
        { name: "AP-GM-SanTruong-02-U6P", top: "75%", left: "55%" },
        { name: "AP-GM-104-PhongHop-U6P", top: "80%", left: "65%" },
        { name: "AP-GM-ThuVien-01-U6P", top: "83%", left: "14%" },
        { name: "AP-GM-Server-ACP", top: "84%", left: "35%" },
        { name: "AP-GM-ThuVien-03-U6P", top: "53%", left: "14%" },
        { name: "AP-GM-ThuVien-04-U6", top: "33%", left: "14%" },
];

export function Tang1Gamma() {
    const location = useLocation();
    const [highlightedWifi, setHighlightedWifi] = useState(null);

    useEffect(() => {
        if (location.state?.highlightedWifi) {
            setHighlightedWifi(location.state.highlightedWifi);
        } else {
            setHighlightedWifi(null); // Clear highlight when no search term
        }
    }, [location.state]);

    return (
        <div className="tang1beta">
            <div className="map-container">
                <img src={image} alt="Tang 1 Beta" className="map-image" />
                {wifiLocations.map((wifi, index) => (
                    <div
                        key={index}
                        className="wifi-marker"
                        style={{ top: wifi.top, left: wifi.left ,
                        animation: highlightedWifi === wifi.name ? 'pulse 0.5s infinite' : 'none'
                        }}
                        data-name={wifi.name}
                    >
                        <Wifi
                            className="wifi-icon"
                            size={28}
                            color={highlightedWifi === wifi.name ? "red" : "green"}
                        />
                        <div
                            className="wifi-name"
                            style={{
                                color: highlightedWifi === wifi.name ? "red" : "blue",
                                fontWeight: highlightedWifi === wifi.name ? "bold" : "bold",
                            }}
                        >
                            {wifi.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
