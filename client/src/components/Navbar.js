import React from "react";
import "./Navbar.css";

export function Navbar() {
    return (
        <div className="navbar">
            <h1 className="title">🔧 SƠ ĐỒ LẮP ĐẶT THIẾT BỊ 🔧</h1>

            {/* Chữ chạy */}
            <div className="marquee-container">
                <div className="marquee">
                    <p>🔥 Chào mừng bạn đến với hệ thống quản lý sơ đồ lắp đặt thiết bị! 🚀🚀🚀 </p>
                </div>
            </div>
        </div>
    );
}
