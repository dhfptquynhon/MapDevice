import React from "react";
import { Wifi } from "lucide-react";

export function WifiMarkers({ wifiLocations, highlightedWifi, variant = "" }) {
  const suffix = variant ? `-${variant}` : "";

  return (
    <>
      {wifiLocations.map((wifi, index) => {
        const isHighlighted = highlightedWifi === wifi.name;

        return (
          <div
            key={index}
            className={`wifi-marker${suffix}`}
            style={{
              top: wifi.top,
              left: wifi.left,
              animation: isHighlighted ? "pulse 0.5s infinite" : "none",
            }}
            data-name={wifi.name}
          >
            <Wifi
              className={`wifi-icon${suffix}`}
              size={28}
              color={isHighlighted ? "red" : "green"}
            />
            <div
              className={`wifi-name${suffix}`}
              style={{
                color: isHighlighted ? "red" : "blue",
                fontWeight: "bold",
              }}
            >
              {wifi.name}
            </div>
            {(wifi.ch24 != null || wifi.ch5 != null) && (
              <div className="wifi-channels">
                {wifi.ch24 != null && (
                  <span className="channel-num channel-24" title={`Kênh 2.4G: ${wifi.ch24}`}>
                    {wifi.ch24}
                  </span>
                )}
                {wifi.ch24 != null && wifi.ch5 != null && (
                  <span className="channel-sep">|</span>
                )}
                {wifi.ch5 != null && (
                  <span className="channel-num channel-5" title={`Kênh 5G: ${wifi.ch5}`}>
                    {wifi.ch5}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
