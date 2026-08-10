import React, { useState, useEffect } from "react";
import "./KTX.css";
import image from "../assets/KTXDomA.jpg";
import { Wifi, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    // { name: "AP-KTX Dom A-ACP", top: "53.46%", left: "37.33%" },
    // { name: "AP-KTX-Dom A-Pantry-U6P", top: "23.46%", left: "35.33%" },
];

export function KTXDomA() {
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