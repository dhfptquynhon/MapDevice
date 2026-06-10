import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T4.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
        { name: "AP-Tang-4-405-U6", top: "12%", left: "6%" },
        { name: "AP-Tang-4-406-U6", top: "13%", left: "22%" },
        { name: "AP-Tang-4-408-U6P", top: "11%", left: "39%" },
        { name: "AP-Tang-4-409-U6P", top: "11%", left: "59%" },
        { name: "AP-Tang-4-411-U6", top: "14%", left: "75%" },
        { name: "AP-Tang-4-412-U6", top: "11%", left: "88%" },
        { name: "AP-Tang-4-414-U6", top: "35%", left: "75%" },
        { name: "AP-Tang-4-413-U6", top: "33%", left: "90%" },
        { name: "AP-Tang-4-416-U6", top: "52%", left: "84%" },
        { name: "AP-Tang-4-417-U6", top: "67%", left: "76%" },
        { name: "AP-Tang-4-418-U6", top: "69%", left: "90%" },
        { name: "AP-Tang-4-419-U6", top: "91%", left: "88%" },
        { name: "AP-Tang-4-420-U6", top: "89%", left: "75%" },
        { name: "AP-Tang-4-421-U6", top: "91%", left: "21%" },
        { name: "AP-Tang-4-422-U6", top: "89%", left: "10%" },
        { name: "AP-Tang-4-423-U6", top: "68%", left: "9%" },
        { name: "AP-Tang-4-424-U6P", top: "70%", left: "22%" },
        { name: "AP-Tang-4-401-U6", top: "52%", left: "13%" },
        { name: "AP-Tang-4-404-U6", top: "36%", left: "07%" },
        { name: "AP-Tang-4-403-U6", top: "33%", left: "20%" },
];

export function Tang4Beta() {
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
