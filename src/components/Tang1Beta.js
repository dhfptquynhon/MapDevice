import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T1.jpg";
import { Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

export const wifiLocations = [
    { name: "LAB AI-ARUBA", top: "10%", left: "7%" },
    { name: "AP-BT-Phong AI-U6", top: "17%", left: "15%", ch24: 11, ch5: 36 },
    { name: "AP-BT-IT-U6P", top: "17%", left: "37%", ch24: 11, ch5: 36 },
    { name: "AP-BT-Phong hop-U6P", top: "15%", left: "62%", ch24: 11, ch5: 36 },
    { name: "AP-BT-DVSV-U6P", top: "35%", left: "88%", ch24: 1, ch5: 36 },
    { name: "AP-BT-CTSV-U6", top: "13%", left: "84%", ch24: 11, ch5: 48 },
    { name: "AP-BT-SanTruong-03-U6P", top: "28%", left: "55%", ch24: 6, ch5: 48 },
    { name: "AP-BT-SanTruong-01-U6", top: "50%", left: "67%", ch24: 1, ch5: 40 },
    { name: "AP-BT-FU-U6P", top: "82%", left: "76%", ch24: 11, ch5: 36 },
    { name: "AP-BT-TuyenSinh-U6P", top: "90%", left: "89%", ch24: 6, ch5: 153 },
    { name: "AP-BT-SanTruong-02-U6P", top: "78%", left: "40%", ch24: 11, ch5: 44 },
    { name: "AP-BT-Thuvien-01-U6P", top: "83%", left: "14%", ch24: 1, ch5: 44 },
    { name: "AP-BT-Server-ACP", top: "97%", left: "14%", ch24: 1, ch5: 149 },
    { name: "AP-BT-Thuvien-02-U6P", top: "53%", left: "14%", ch24: 6, ch5: 48 },
    { name: "AP-BT-Thuvien-03-U6P", top: "33%", left: "14%", ch24: 11, ch5: 36 },
];

export function Tang1Beta() {
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