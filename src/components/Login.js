// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

export function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            onLogin(); // set isAuthenticated = true
            navigate("/"); // chuyển về trang chính
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}
