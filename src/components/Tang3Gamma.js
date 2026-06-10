import React, { useEffect, useState } from "react";
import "./Tang1Beta.css";
import image from "../assets/T3Gamma.jpg";
import { Wifi } from "lucide-react"; // Import icon Wi-Fi
import { useLocation } from "react-router-dom";

// ✅ Xuất danh sách WiFi để dùng ở các file khác
export const wifiLocations = [
        { name: "AP-GM-Tang-3-319-U6P", top: "13%", left: "07%" },
        { name: "AP-GM-Tang-3-322-ACP", top: "13%", left: "37%" },
        { name: "AP-GM-Tang-3-323-U6P", top: "13%", left: "75%" },
        { name: "AP-GM-Tang-3-326-U6P", top: "33%", left: "75%" },
        { name: "AP-GM-Tang-3-325-U6P", top: "36%", left: "88%" },
        { name: "AP-GM-Tang-3-301-U6P", top: "50%", left: "82%" },
        { name: "AP-GM-Tang-3-303-U6P", top: "67%", left: "76%" },
        { name: "AP-GM-Tang-3-304-U6P", top: "70%", left: "88%" },
        { name: "AP-GM-Tang-3-305-U6P", top: "90%", left: "87%" },
        { name: "AP-GM-Tang-3-308-U6P", top: "91%", left: "58%" },
        { name: "AP-GM-Tang-3-309-ACP", top: "91%", left: "35%" },
        { name: "AP-GM-Tang-3-311-U6", top: "89%", left: "18%" },
        { name: "AP-GM-Tang-3-314-U6P", top: "66%", left: "20%" },
        { name: "AP-GM-Tang-3-313-U6P", top: "69%", left: "7%" },
        { name: "AP-GM-Tang-3-315-U6P", top: "51%", left: "11%" },
        { name: "AP-GM-Tang-3-318-U6P", top: "33%", left: "6%" },
        { name: "AP-GM-Tang-3-317-U6P", top: "36%", left: "20%" },
];

export function Tang3Gamma() {
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
