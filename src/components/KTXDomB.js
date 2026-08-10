import React, { useState, useEffect } from "react";
import "./KTX.css";
import image from "../assets/KTXDomB.jpg";
import { Wifi, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP -GM- KTX Dom B-ACP", top: "41.51%", left: "37.52%", ch24: 11, ch5: 40 },
    { name: "AP-GM-Ban Xay Dung-ACP", top: "23.90%", left: "13.85%", ch24: 6, ch5: 161 },
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
                <WifiMarkers wifiLocations={wifiLocations} highlightedWifi={highlightedWifi} variant="ktx" />
            </div>
        </div>
    );
}