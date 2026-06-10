import React, { useState, useEffect } from "react";
import { Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import floor1 from "../assets/T1.jpg";
import floor2 from "../assets/T2.jpg";
import "./EditWifi.css";

export function EditWifi() {
    const [selectedFloor, setSelectedFloor] = useState("");
    const [wifiLocations, setWifiLocations] = useState([]);
    const [selectedWifi, setSelectedWifi] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedTopPosition, setUpdatedTopPosition] = useState("");
    const [updatedLeftPosition, setUpdatedLeftPosition] = useState("");
    const navigate = useNavigate();

    // Lấy danh sách WiFi theo tầng
    useEffect(() => {
        if (selectedFloor) {
            fetch(`http://localhost:5000/api/${selectedFloor}`)
                .then((response) => response.json())
                .then((data) => setWifiLocations(data))
                .catch((error) => console.error("Lỗi lấy dữ liệu WiFi:", error));
        }
    }, [selectedFloor]);

    // Handle chọn tầng
    const handleFloorSelection = (e) => {
        setSelectedFloor(e.target.value);
    };

    // Handle chọn WiFi
    const handleWifiSelection = (wifi) => {
        setSelectedWifi(wifi);
        setUpdatedName(wifi.name);
        setUpdatedTopPosition(wifi.topPosition);
        setUpdatedLeftPosition(wifi.leftPosition);
    };

    // Cập nhật WiFi
    const handleUpdateWifi = async () => {
        const mapImage = document.querySelector(".map-image");
        const mapHeight = mapImage.clientHeight;
        const mapWidth = mapImage.clientWidth;
    
        // ✅ Chuyển px (nếu có) thành số để tính %, hoặc nếu đã là %, chuyển thẳng
        const topPx = parseFloat(updatedTopPosition);
        const leftPx = parseFloat(updatedLeftPosition);
    
        const topPercent = (topPx / mapHeight) * 100;
        const leftPercent = (leftPx / mapWidth) * 100;
    
        const updatedData = {
            name: updatedName,
            topPosition: `${topPercent.toFixed(2)}%`,
            leftPosition: `${leftPercent.toFixed(2)}%`,
        };
    
        try {
            const response = await fetch(`http://localhost:5000/api/wifi/${selectedWifi.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
    
            const data = await response.json();
            console.log("Đã cập nhật WiFi:", data);
            alert("Cập nhật WiFi thành công!");
    
            // Reload lại dữ liệu
            if (selectedFloor) {
                fetch(`http://localhost:5000/api/${selectedFloor}`)
                    .then((res) => res.json())
                    .then((list) => setWifiLocations(list))
                    .catch((err) => console.error("Lỗi khi tải lại danh sách WiFi:", err));
            }
    
            setSelectedWifi(null);
        } catch (error) {
            console.error("Lỗi khi cập nhật WiFi:", error);
        }
    };
    
    

    return (
        <div className="edit-wifi-container">
            <h2>Chỉnh sửa WiFi</h2>
            <select onChange={handleFloorSelection} value={selectedFloor}>
                <option value="">Chọn tầng</option>
                <option value="tang1beta">Tầng 1 Beta</option>
                <option value="tang2beta">Tầng 2 Beta</option>
            </select>

            {selectedFloor && (
                <div className="map-container">
                    <img src={selectedFloor === "tang1beta" ? floor1 : floor2} alt="Sơ đồ tầng" className="map-image" />
                    {wifiLocations.map((wifi) => (
                        <div
                        key={wifi.id}
                        className="wifi-marker"
                        style={{
                            top: wifi.topPosition,
                            left: wifi.leftPosition,
                            position: "absolute" // Rất quan trọng
                        }}
                        onClick={() => handleWifiSelection(wifi)}
                    >
                        <Wifi className="wifi-icon" size={28} color="green" />
                        <div className="wifi-name">{wifi.name}</div>
                    </div>
                    
                    ))}
                </div>
            )}

            {selectedWifi && (
                <div className="wifi-edit-form">
                    <h3>Chỉnh sửa WiFi</h3>
                    <label>Tên WiFi:</label>
                    <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                    <label>Vị trí trên:</label>
                    <input type="text" value={updatedTopPosition} onChange={(e) => setUpdatedTopPosition(e.target.value)} />
                    <label>Vị trí trái:</label>
                    <input type="text" value={updatedLeftPosition} onChange={(e) => setUpdatedLeftPosition(e.target.value)} />
                    <button onClick={handleUpdateWifi}>Cập nhật WiFi</button>
                </div>
            )}
        </div>
    );
}
