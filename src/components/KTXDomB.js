import React, { useState, useEffect } from "react";
import "./KTX.css";
import image from "../assets/KTXDomB.jpg";
import { Wifi, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP - KTX Dom B-ACP", top: "41.51%", left: "37.52%" },
    { name: "Ban Xay Dung-ACP", top: "23.90%", left: "13.85%" },
];

export function KTXDomB() {
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
        <div className="ktx">
            <div className="map-container-ktx">
                <img src={image} alt="Tang 1 Beta" className="map-image-ktx" />
                {wifiLocations.map((wifi, index) => (
                    <div
                        key={index}
                        className="wifi-marker-ktx"
                        style={{ top: wifi.top, left: wifi.left,
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