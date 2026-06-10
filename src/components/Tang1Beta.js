import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T1.jpg";
import { Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";

export const wifiLocations = [
    { name: "LAB AI-ARUBA", top: "10%", left: "7%" },
    { name: "AP-BT-Phong AI-U6", top: "17%", left: "15%" },
    { name: "AP-BT-IT-U6P", top: "17%", left: "37%" },
    { name: "AP-BT-Phong hop-U6P", top: "15%", left: "62%" },
    { name: "AP-BT-DVSV-U6P", top: "35%", left: "88%" },
    { name: "AP-BT-CTSV-U6", top: "13%", left: "84%" },
    { name: "AP-BT-SanTruong-03-U6P", top: "28%", left: "55%" },
    { name: "AP-BT-SanTruong-01-U6", top: "50%", left: "67%" },
    { name: "AP-BT-FU-U6P", top: "82%", left: "76%" },
    { name: "AP-BT-TuyenSinh-U6P", top: "90%", left: "89%" },
    { name: "AP-BT-SanTruong-02-U6P", top: "78%", left: "40%" },
    { name: "AP-BT-Thu vien-01-U6P", top: "83%", left: "14%" },
    { name: "AP-BT-Server-ACP", top: "97%", left: "14%" },
    { name: "AP-BT-Thu vien-02-U6P", top: "53%", left: "14%" },
    { name: "AP-BT-Thu vien-03-U6P", top: "33%", left: "14%" },
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