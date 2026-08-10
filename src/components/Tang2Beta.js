import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T2.png";
import { Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

export const wifiLocations = [
    { name: "AP-BT-Tang-2-206-U6", top: "13%", left: "20%", ch24: 1, ch5: 153 },
    { name: "AP-BT-Tang-2-208-ACP", top: "13%", left: "39%", ch24: 11, ch5: 157 },
    { name: "AP-BT-Tang-2-209-U6P", top: "13%", left: "57%", ch24: 6, ch5: 40 },
    { name: "AP-BT-Tang-2-212-U6", top: "13%", left: "88%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-2-214-U6P", top: "35%", left: "73%", ch24: 11, ch5: 44 },
    { name: "AP-BT-Tang-2-213-U6P", top: "38%", left: "87%", ch24: 6, ch5: 40 },
    { name: "AP-BT-Tang-2-216-ACP", top: "52%", left: "82%", ch24: 6, ch5: 48 },
    { name: "AP-BT-Tang-2-217-ACP", top: "67%", left: "75%", ch24: 11, ch5: 36 },
    { name: "AP-BT-Tang-2-218-U6", top: "70%", left: "86%", ch24: 1, ch5: 157 },
    { name: "AP-BT-Tang-2-218-U6", top: "90%", left: "87%", ch24: 1, ch5: 157 },
    { name: "AP-BT-Tang 2-219-U6P", top: "90%", left: "77%", ch24: 6, ch5: 153 },
    { name: "AP-BT-Tang-2-220-U6", top: "90%", left: "17%", ch24: 11, ch5: 36 },
    { name: "AP-BT-Tang-2-221-U6", top: "90%", left: "7%", ch24: 1, ch5: 40 },
    { name: "LAB SE-ARUBA", top: "63%", left: "4%" },
    { name: "AP-BT-Tang-2-201-U6P", top: "68%", left: "11%", ch24: 6, ch5: 40 },
    { name: "AP-BT-Tang-2-201-2-U6P", top: "66%", left: "22%", ch24: 1, ch5: 36 },
    { name: "AP-BT-Tang-2-202-U6P", top: "52%", left: "13%", ch24: 11, ch5: 44 },
    { name: "AP-BT-Tang-2-204-U6P", top: "36%", left: "08%", ch24: 6, ch5: 149 },
    { name: "AP-BT-Tang-2-203-U6P", top: "39%", left: "20%", ch24: 1, ch5: 48 },
];

    export function Tang2Beta() {
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
