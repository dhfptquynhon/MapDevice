import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T1Gamma.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
    { name: "AP-GM-VPFSC-U6P", top: "18%", left: "82%", ch24: 6, ch5: 44 },
    { name: "AP-GM-SanTruong-01-U6P", top: "28%", left: "43%", ch24: 1, ch5: 40 },
    { name: "AP-GM-SanTruong-03-U6P", top: "50%", left: "79%", ch24: 6, ch5: 48 },
    { name: "AP-GM-PDichVu-U6P", top: "89%", left: "81%", ch24: 1, ch5: 36 },
    { name: "AP-GM-SanTruong-02-U6P", top: "75%", left: "55%", ch24: 6, ch5: 44 },
    { name: "AP-GM-104-PhongHop-U6P", top: "80%", left: "65%", ch24: 11, ch5: 157 },
    { name: "AP-GM-ThuVien-01-U6P", top: "83%", left: "14%", ch24: 6, ch5: 161 },
    { name: "AP-GM-Server-ACP", top: "84%", left: "35%", ch24: 6, ch5: 149 },
    { name: "AP-GM-ThuVien-03-U6P", top: "53%", left: "14%", ch24: 1, ch5: 36 },
    { name: "AP-GM-ThuVien-04-U6P", top: "33%", left: "14%", ch24: 11, ch5: 40 },
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
                <WifiMarkers wifiLocations={wifiLocations} highlightedWifi={highlightedWifi} />
            </div>
        </div>
    );
}
