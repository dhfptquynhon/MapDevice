import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T2Gamma.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP-GM-Tang-2-219-U6P", top: "13%", left: "07%", ch24: 6, ch5: 36 },
    { name: "AP-GM-Tang-2-222-ACP", top: "13%", left: "37%", ch24: 1, ch5: 40 },
    { name: "AP-GM-Tang-2-223-U6P", top: "13%", left: "75%", ch24: 6, ch5: 44 },
    { name: "AP-GM-Tang-2-226-U6P", top: "33%", left: "75%", ch24: 6, ch5: 149 },
    { name: "AP-GM-Tang-2-225-U6P", top: "36%", left: "88%", ch24: 11, ch5: 48 },
    { name: "AP-GM-Tang-2-201-U6P", top: "50%", left: "82%", ch24: 6, ch5: 153 },
    { name: "AP-GM-Tang-2-203-U6P", top: "67%", left: "76%", ch24: 11, ch5: 157 },
    { name: "AP-GM-Tang-2-204-ACP", top: "70%", left: "88%", ch24: 1, ch5: 161 },
    { name: "AP-GM-Tang-2-205-U6P", top: "90%", left: "87%", ch24: 6, ch5: 36 },
    { name: "AP-GM-Tang-2-208-ACP", top: "91%", left: "58%", ch24: 1, ch5: 40 },
    { name: "AP-GM-Tang-2-209-ACP", top: "91%", left: "35%", ch24: 11, ch5: 44 },
    { name: "AP-GM-Tang-2-214-U6", top: "66%", left: "20%", ch24: 1, ch5: 149 },
    { name: "AP-GM-Tang-2-213-U6P", top: "69%", left: "7%", ch24: 11, ch5: 48 },
    { name: "AP-GM-Tang-2-215-U6P", top: "51%", left: "11%", ch24: 6, ch5: 153 },
    { name: "AP-GM-Tang-2-218-U6P", top: "33%", left: "6%", ch24: 1, ch5: 161 },
    { name: "AP-GM-Tang-2-217-U6P", top: "36%", left: "20%", ch24: 11, ch5: 157 },
];

export function Tang2Gamma() {
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
