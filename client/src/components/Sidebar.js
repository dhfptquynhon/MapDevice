import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBetaOpen, setIsBetaOpen] = useState(false);
    const [isGammaOpen, setIsGammaOpen] = useState(false);
    const [isCongVuOpen, setIsCongVuOpen] = useState(false);
    const [isNha5Open, setIsNha5Open] = useState(false);
    const [isNha6Open, setIsNha6Open] = useState(false);
    const [isNha7Open, setIsNha7Open] = useState(false);
    const [isKTXOpen, setIsKTXOpen] = useState(false);

    return (
        <>
            <button className="menu-button" onClick={() => setIsSidebarOpen(true)}>
                ☰
            </button>

            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✖</button>

                {/* Beta */}
                <button className="toggle-button" onClick={() => setIsBetaOpen(!isBetaOpen)}>
                    Vị trí AP nhà Beta {isBetaOpen ? "▲" : "▼"}
                </button>
                {isBetaOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton to="/tang1beta" text="Tầng 1 Beta" />
                        <SidebarButton to="/tang2beta" text="Tầng 2 Beta" />
                        <SidebarButton to="/tang3beta" text="Tầng 3 Beta" />
                        <SidebarButton to="/tang4beta" text="Tầng 4 Beta" />
                        <SidebarButton to="/tang5beta" text="Tầng 5 Beta" />
                    </nav>
                )}

                {/* Gamma */}
                <button className="toggle-button" onClick={() => setIsGammaOpen(!isGammaOpen)}>
                    Vị trí AP nhà Gamma {isGammaOpen ? "▲" : "▼"}
                </button>
                {isGammaOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton to="/tang1gamma" text="Tầng 1 Gamma" />
                        <SidebarButton to="/tang2gamma" text="Tầng 2 Gamma" />
                        <SidebarButton to="/tang3gamma" text="Tầng 3 Gamma" />
                        <SidebarButton to="/tang4gamma" text="Tầng 4 Gamma" />
                        <SidebarButton to="/tang5gamma" text="Tầng 5 Gamma" />
                    </nav>
                )}

                {/* Nhà công vụ */}
                <button className="toggle-button" onClick={() => setIsCongVuOpen(!isCongVuOpen)}>
                    Vị trí AP nhà Công Vụ {isCongVuOpen ? "▲" : "▼"}
                </button>
                {isCongVuOpen && (
                    <div className="sidebar-menu nha-cong-vu">
                        {/* Nhà 5 */}
                        <button className="nha-cong-vu-title" onClick={() => setIsNha5Open(!isNha5Open)}>
                            Nhà công vụ số 5 {isNha5Open ? "▲" : "▼"}
                        </button>
                        {isNha5Open && (
                            <>
                                <SidebarButton to="/tang1ncvso5" text="Tầng 1" className="nha-cong-vu-tang" />
                                <SidebarButton to="/tang2ncvso5" text="Tầng 2" className="nha-cong-vu-tang" />
                            </>
                        )}

                        {/* Nhà 6 */}
                        <button className="nha-cong-vu-title" onClick={() => setIsNha6Open(!isNha6Open)}>
                            Nhà công vụ số 6 {isNha6Open ? "▲" : "▼"}
                        </button>
                        {isNha6Open && (
                            <>
                                <SidebarButton to="/tang1ncvso6" text="Tầng 1" className="nha-cong-vu-tang" />
                                <SidebarButton to="/tang2ncvso6" text="Tầng 2" className="nha-cong-vu-tang" />
                            </>
                        )}

                        {/* Nhà 7 */}
                        <button className="nha-cong-vu-title" onClick={() => setIsNha7Open(!isNha7Open)}>
                            Nhà công vụ số 7 {isNha7Open ? "▲" : "▼"}
                        </button>
                        {isNha7Open && (
                            <>
                                <SidebarButton to="/tang1ncvso7" text="Tầng 1" className="nha-cong-vu-tang" />
                                <SidebarButton to="/tang2ncvso7" text="Tầng 2" className="nha-cong-vu-tang" />
                            </>
                        )}
                    </div>
                )}

{/* KTX */}
<button className="toggle-button" onClick={() => setIsKTXOpen(!isKTXOpen)}>
                    Vị trí AP Kí Túc Xá {isKTXOpen ? "▲" : "▼"}
                </button>
                {isKTXOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton to="/ktxdomB" text="KTX Dom B" />
                        <SidebarButton to="/ktxdomA" text="KTX Dom A" />

                    </nav>
                )}

                {/* Thống kê */}
                <Link to="/thongke" className="stat-button">
                    Thống kê số lượng wifi
                </Link>
            </div>
        </>
    );
}

function SidebarButton({ to, text }) {
    return (
        <Link to={to} className="sidebar-button">
            {text}
        </Link>
    );
}
