import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T3.png";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

export const wifiLocations = [
    { name: "AP-BT-Tang-3-305-U6P", top: "12%", left: "6%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-3-306-U6P", top: "13%", left: "22%", ch24: 6, ch5: 44 },
    { name: "AP-BT-Tang-3-308-U6P", top: "11%", left: "41%", ch24: 6, ch5: 149 },
    { name: "AP-BT-Tang-3-309-U6P", top: "13%", left: "55%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-3-311-U6P", top: "14%", left: "76%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-3-312-U6P", top: "11%", left: "86%", ch24: 6, ch5: 149 },
    { name: "AP-BT-Tang-3-314-U6P", top: "35%", left: "73%", ch24: 1, ch5: 44 },
    { name: "AP-BT-Tang-3-313-U6P", top: "33%", left: "86%", ch24: 11, ch5: 36 },
    { name: "AP-BT-Tang-3-316-U6P", top: "52%", left: "80%", ch24: 1, ch5: 149 },
    { name: "AP-BT-Tang-3-317-U6P", top: "67%", left: "74%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang3-318-ACP", top: "69%", left: "88%", ch24: 6, ch5: 40 },
    { name: "AP-BT-Tang-3-320-U6", top: "90%", left: "80%", ch24: 1, ch5: 157 },
    { name: "AP-BT-Tang-3-322-U6", top: "90%", left: "11%", ch24: 11, ch5: 161 },
    { name: "AP-BT-Tang-3-323-U6P", top: "68%", left: "9%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-3-324-U6", top: "70%", left: "22%", ch24: 6, ch5: 40 },
    { name: "AP-BT-Tang-3-301-U6P", top: "52%", left: "13%", ch24: 11, ch5: 40 },
    { name: "AP-BT-Tang-3-304-U6P", top: "36%", left: "07%", ch24: 11, ch5: 48 },
    { name: "AP-BT-Tang-3-303-U6P", top: "36%", left: "23%", ch24: 6, ch5: 44 },
];

    export function Tang3Beta() {
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
