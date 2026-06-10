import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T2.png";
import { Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";

export const wifiLocations = [
        { name: "AP-Tang-2-206-U6", top: "13%", left: "20%" },
        { name: "AP-Tang-2-208-ACP", top: "13%", left: "39%" },
        { name: "AP-Tang-2-209-U6P", top: "13%", left: "57%" },
        { name: "AP-Tang-2-212-U6", top: "13%", left: "88%" },
        { name: "AP-Tang-2-214-U6P", top: "35%", left: "73%" },
        { name: "AP-Tang-2-213-U6P", top: "38%", left: "87%" },
        { name: "AP-Tang-2-216-ACP", top: "52%", left: "82%" },
        { name: "AP-Tang-2-217-U6P", top: "67%", left: "75%" },
        { name: "AP-Tang-2-218-ACP", top: "70%", left: "86%" },
        { name: "AP-Tang-2-218-U6", top: "90%", left: "87%" },
        { name: "AP-Tang-2-219-U6P", top: "90%", left: "77%" },
        { name: "AP-Tang-2-220-U6", top: "90%", left: "17%" },
        { name: "AP-Tang-2-221-U6", top: "90%", left: "7%" },
        { name: "LAB SE-ARUBA", top: "63%", left: "4%" },
        { name: "AP-Tang-2-201-U6P", top: "68%", left: "11%" },
		{ name: "AP-Tang-2-201-2-U6P", top: "66%", left: "22%" },
        { name: "AP-Tang-2-202-U6P", top: "52%", left: "13%" },
        { name: "AP-Tang-2-204-U6P", top: "36%", left: "08%" },
        { name: "AP-Tang-2-203-U6P", top: "39%", left: "20%" },
        
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
                {wifiLocations.map((wifi, index) => (
                    <div
                        key={index}
                        className="wifi-marker"
                        style={{ top: wifi.top, left: wifi.left ,
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
