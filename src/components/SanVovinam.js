import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/Vovinam.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";
import { WifiMarkers } from "./WifiMarkers";

export const wifiLocations = [
    { name: "AP - BT - VOVINAM-ACP", top: "50%", left: "44%", ch24: 1, ch5: 36 },
];

    export function SanVovinam() {
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
