import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T5.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP-BT-Tang-5-503-U6P", top: "11%", left: "65%", ch24: 1, ch5: 157 },
    { name: "AP-BT-Tang-5-505-ACP", top: "11%", left: "88%", ch24: 11, ch5: 161 },
    { name: "AP-BT-Tang-5-506-U6", top: "33%", left: "88%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-5-509-U6", top: "52%", left: "85%", ch24: 1, ch5: 40 },
    { name: "AP-BT-Tang-5-510-U6", top: "67%", left: "76%", ch24: 6, ch5: 44 },
    { name: "AP-BT-Tang-5-511-U6", top: "69%", left: "90%", ch24: 11, ch5: 48 },
    { name: "AP-BT-Tang-5-512-U6", top: "89%", left: "91%", ch24: 1, ch5: 149 },
    { name: "AP-BT-Tang-5-513-U6P", top: "91%", left: "76%", ch24: 6, ch5: 153 },
    { name: "AP-BT- Tang-5-515-U6", top: "90%", left: "16%", ch24: 1, ch5: 44 },
    { name: "AP-BT-Tang-5-H3-U6", top: "67%", left: "16%", ch24: 11, ch5: 36 },
    { name: "AP-BT-Tang-5-H2-U6P", top: "49%", left: "16%", ch24: 6, ch5: 161 },
    { name: "AP-BT-Tang-5-H1-U6", top: "29%", left: "16%", ch24: 1, ch5: 157 },
    { name: "AP-BT-Tang-5-502-ACP", top: "11%", left: "33%", ch24: 11, ch5: 153 },
];

export function Tang5Beta() {
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
                <WifiMarkers wifiLocations={wifiLocations} highlightedWifi={highlightedWifi} />
            </div>
        </div>
    );
}
