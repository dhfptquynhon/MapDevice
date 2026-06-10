import React, { useEffect, useState } from "react";
import "./NhaCongVu.css";
import image from "../assets/T1NCVso5.jpg";
import { Wifi, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP-NCV-5-T1-U6P", top: "53.04%", left: "43.90%" },
];

export function Tang1NCVso5() {
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
        <div className="nhacongvu">
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
