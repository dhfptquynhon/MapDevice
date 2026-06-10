import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/Vovinam.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";

export const wifiLocations = [
        { name: "AP-VOVINAM-ACP", top: "50%", left: "44%" },
         
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
                    {wifiLocations.map((wifi, index) => (
                        <div
                            key={index}
                            className="wifi-marker"
                            style={{ top: wifi.top, left: wifi.left,
                            animation: highlightedWifi === wifi.name ? 'pulse 0.5s infinite' : 'none'
                             }}
                            data-name={wifi.name}
                        >
                            <Wifi
                                className="wifi-icon"
                                size={28}
                                color={highlightedWifi === wifi.name ? "red" : "green"}
                            />
                            <div
                                className="wifi-name"
                                style={{
                                    color: highlightedWifi === wifi.name ? "red" : "blue",
                                    fontWeight: highlightedWifi === wifi.name ? "bold" : "bold",
                                }}
                            >
                                {wifi.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
