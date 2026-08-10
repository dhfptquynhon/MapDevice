import React, { useEffect, useState } from "react";
import "./NhaCongVu.css";
import image from "../assets/T1NCVso5.jpg";
import { Wifi, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP-NCV-5-T1-U6P", top: "53.04%", left: "43.90%", ch24: 6, ch5: 153 },
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
                <WifiMarkers wifiLocations={wifiLocations} highlightedWifi={highlightedWifi} />
            </div>
        </div>
    );
}
