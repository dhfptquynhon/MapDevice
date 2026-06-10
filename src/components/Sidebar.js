import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { X, Printer, Wifi, BarChart2 } from "lucide-react"; // Added Wifi and BarChart2 icons
import { allWifiLocations } from './wifiData'; // Import dữ liệu WiFi cục bộ

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBetaOpen, setIsBetaOpen] = useState(false);
    const [isGammaOpen, setIsGammaOpen] = useState(false);
    const [isCongVuOpen, setIsCongVuOpen] = useState(false);
    const [isNha5Open, setIsNha5Open] = useState(false);
    const [isNha6Open, setIsNha6Open] = useState(false);
    const [isNha7Open, setIsNha7Open] = useState(false);
    const [isKTXOpen, setIsKTXOpen] = useState(false);
    const [isVovinamOpen, setIsVovinamOpen] = useState(false);
    
    // Search functionality states
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedWifi, setSelectedWifi] = useState(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search');
        if (search) {
            setSearchTerm(search);
            const results = allWifiLocations.filter(wifi =>
                wifi.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(results);
            setNoResultsFound(results.length === 0);
        } else {
            setSearchResults([]);
            setNoResultsFound(false);
        }
    }, [location.search]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === "") {
            setSearchResults([]);
            setNoResultsFound(false);
            setSelectedWifi(null);
        } else {
            const results = allWifiLocations.filter(wifi =>
                wifi.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
            setNoResultsFound(results.length === 0);
        }
    };

    // Handle WiFi selection and navigation
    const handleWifiSelect = (wifi) => {
        setSelectedWifi(wifi);
        setSearchTerm(wifi.name);
        setSearchResults([]);
        setNoResultsFound(false);
        setIsSidebarOpen(false);
        
        navigate(wifi.path, { 
            state: { 
                highlightedWifi: wifi.name,
                scrollToWifi: false
            } 
        });
    };

    // Clear search input
    const handleClearSearch = () => {
        setSearchTerm("");
        setSearchResults([]);
        setSelectedWifi(null);
        setNoResultsFound(false);
        navigate(location.pathname, { 
            state: { 
                highlightedWifi: null,
                scrollToWifi: false 
            },
            replace: true
        });
    };

    return (
        <>
            <button className="menu-button" onClick={() => setIsSidebarOpen(true)}>
                ☰
            </button>

            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✖</button>

                {/* Search Component */}
                <div className="search-container" ref={searchContainerRef}>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên WiFi..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button 
                                className="clear-search-button"
                                onClick={handleClearSearch}
                                aria-label="Xóa tìm kiếm"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    {isSearchFocused && (
                        <div className="search-results-container">
                            {searchResults.length > 0 ? (
                                <div className="search-results">
                                    {searchResults.map((wifi, index) => (
                                        <div
                                            key={index}
                                            className="search-result-item"
                                            onClick={() => handleWifiSelect(wifi)}
                                        >
                                            {wifi.name}
                                        </div>
                                    ))}
                                </div>
                            ) : noResultsFound && searchTerm.trim() !== "" ? (
                                <div className="no-results-message">
                                    Không tìm thấy WiFi "{searchTerm}" trên bản đồ
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                {/* Beta */}
                <button 
                    className={`toggle-button ${selectedWifi?.path.includes("beta") ? "highlighted" : ""}`}
                    onClick={() => setIsBetaOpen(!isBetaOpen)}
                >
                    <div className="button-content">
                        <Wifi size={18} className="button-icon" />
                        <span>Vị trí AP nhà Beta</span>
                        {isBetaOpen ? "▲" : "▼"}
                    </div>
                </button>
                {isBetaOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton 
                            to="/tang1beta" 
                            text="Tầng 1 Beta" 
                            isHighlighted={selectedWifi?.path === "/tang1beta"}
                        />
                        <SidebarButton 
                            to="/tang2beta" 
                            text="Tầng 2 Beta" 
                            isHighlighted={selectedWifi?.path === "/tang2beta"}
                        />
                        <SidebarButton 
                            to="/tang3beta" 
                            text="Tầng 3 Beta" 
                            isHighlighted={selectedWifi?.path === "/tang3beta"}
                        />
                        <SidebarButton 
                            to="/tang4beta" 
                            text="Tầng 4 Beta" 
                            isHighlighted={selectedWifi?.path === "/tang4beta"}
                        />
                        <SidebarButton 
                            to="/tang5beta" 
                            text="Tầng 5 Beta" 
                            isHighlighted={selectedWifi?.path === "/tang5beta"}
                        />
                    </nav>
                )}

                {/* Gamma */}
                <button 
                    className={`toggle-button ${selectedWifi?.path.includes("gamma") ? "highlighted" : ""}`}
                    onClick={() => setIsGammaOpen(!isGammaOpen)}
                >
                    <div className="button-content">
                        <Wifi size={18} className="button-icon" />
                        <span>Vị trí AP nhà Gamma</span>
                        {isGammaOpen ? "▲" : "▼"}
                    </div>
                </button>
                {isGammaOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton 
                            to="/tang1gamma" 
                            text="Tầng 1 Gamma" 
                            isHighlighted={selectedWifi?.path === "/tang1gamma"}
                        />
                        <SidebarButton 
                            to="/tang2gamma" 
                            text="Tầng 2 Gamma" 
                            isHighlighted={selectedWifi?.path === "/tang2gamma"}
                        />
                        <SidebarButton 
                            to="/tang3gamma" 
                            text="Tầng 3 Gamma" 
                            isHighlighted={selectedWifi?.path === "/tang3gamma"}
                        />
                        <SidebarButton 
                            to="/tang4gamma" 
                            text="Tầng 4 Gamma" 
                            isHighlighted={selectedWifi?.path === "/tang4gamma"}
                        />
                        <SidebarButton 
                            to="/tang5gamma" 
                            text="Tầng 5 Gamma" 
                            isHighlighted={selectedWifi?.path === "/tang5gamma"}
                        />
                    </nav>
                )}

                {/* Nhà công vụ */}
                <button 
                    className={`toggle-button ${selectedWifi?.path.includes("ncv") ? "highlighted" : ""}`}
                    onClick={() => setIsCongVuOpen(!isCongVuOpen)}
                >
                    <div className="button-content">
                        <Wifi size={18} className="button-icon" />
                        <span>Vị trí AP nhà Công Vụ</span>
                        {isCongVuOpen ? "▲" : "▼"}
                    </div>
                </button>
                {isCongVuOpen && (
                    <div className="sidebar-menu nha-cong-vu">
                        {/* Nhà 5 */}
                        <button 
                            className={`nha-cong-vu-title ${selectedWifi?.path.includes("so5") ? "highlighted" : ""}`}
                            onClick={() => setIsNha5Open(!isNha5Open)}
                        >
                            <div className="button-content">
                                <Wifi size={16} className="button-icon" />
                                <span>Nhà công vụ số 5</span>
                                {isNha5Open ? "▲" : "▼"}
                            </div>
                        </button>
                        {isNha5Open && (
                            <div className="floor-buttons-container">
                                <SidebarButton 
                                    to="/tang1ncvso5" 
                                    text="Tầng 1" 
                                    className="floor-button"
                                    isHighlighted={selectedWifi?.path === "/tang1ncvso5"}
                                />
                                <SidebarButton 
                                    to="/tang2ncvso5" 
                                    text="Tầng 2" 
                                    className="floor-button"
                                    isHighlighted={selectedWifi?.path === "/tang2ncvso5"}
                                />
                            </div>
                        )}

                        {/* Nhà 6 */}
                        <button 
                            className={`nha-cong-vu-title ${selectedWifi?.path.includes("so6") ? "highlighted" : ""}`}
                            onClick={() => setIsNha6Open(!isNha6Open)}
                        >
                            <div className="button-content">
                                <Wifi size={16} className="button-icon" />
                                <span>Nhà công vụ số 6</span>
                                {isNha6Open ? "▲" : "▼"}
                            </div>
                        </button>
                        {isNha6Open && (
                            <div className="floor-buttons-container">
                                <SidebarButton 
                                    to="/tang1ncvso6" 
                                    text="Tầng 1" 
                                    className="floor-button"
                                    isHighlighted={selectedWifi?.path === "/tang1ncvso6"}
                                />
                                <SidebarButton 
                                    to="/tang2ncvso6" 
                                    text="Tầng 2" 
                                    className="floor-button"
                                    isHighlighted={selectedWifi?.path === "/tang2ncvso6"}
                                />
                            </div>
                        )}

                        {/* Nhà 7 */}
                        <button 
                            className={`nha-cong-vu-title ${selectedWifi?.path.includes("so7") ? "highlighted" : ""}`}
                            onClick={() => setIsNha7Open(!isNha7Open)}
                        >
                            <div className="button-content">
                                <Wifi size={16} className="button-icon" />
                                <span>Nhà công vụ số 7</span>
                                {isNha7Open ? "▲" : "▼"}
                            </div>
                        </button>
                        {isNha7Open && (
                            <div className="floor-buttons-container">
                                <SidebarButton 
                                    to="/tang1ncvso7" 
                                    text="Tầng 1" 
                                    className="floor-button"
                                    isHighlighted={selectedWifi?.path === "/tang1ncvso7"}
                                />
                                <SidebarButton 
                                    to="/tang2ncvso7" 
                                    text="Tầng 2" 
                                    className="floor-button"
                                    isHighlighted={selectedWifi?.path === "/tang2ncvso7"}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* KTX */}
                <button 
                    className={`toggle-button ${selectedWifi?.path.includes("ktx") ? "highlighted" : ""}`}
                    onClick={() => setIsKTXOpen(!isKTXOpen)}
                >
                    <div className="button-content">
                        <Wifi size={18} className="button-icon" />
                        <span>Vị trí AP Kí Túc Xá</span>
                        {isKTXOpen ? "▲" : "▼"}
                    </div>
                </button>
                {isKTXOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton 
                            to="/ktxdomB" 
                            text="KTX Dom B" 
                            isHighlighted={selectedWifi?.path === "/ktxdomB"}
                        />
                        <SidebarButton 
                            to="/ktxdomA" 
                            text="KTX Dom A" 
                            isHighlighted={selectedWifi?.path === "/ktxdomA"}
                        />
                    </nav>
                )}

                {/* Vovinam */}
                <button 
                    className={`toggle-button ${selectedWifi?.path.includes("vovinam") ? "highlighted" : ""}`}
                    onClick={() => setIsVovinamOpen(!isVovinamOpen)}
                >
                    <div className="button-content">
                        <Wifi size={18} className="button-icon" />
                        <span>Vị trí AP sân Vovinam</span>
                        {isVovinamOpen ? "▲" : "▼"}
                    </div>
                </button>
                {isVovinamOpen && (
                    <nav className="sidebar-menu">
                        <SidebarButton 
                            to="/sanvovinam" 
                            text="Sân Vovinam" 
                            isHighlighted={selectedWifi?.path === "/sanvovinam"}
                        />
                    </nav>
                )}

                {/* Printer List with special styling */}
                <SidebarButton
                    to="/danhsachmayin"
                    text="Danh sách máy in"
                    icon={<Printer size={16} />}
                    isHighlighted={location.pathname === "/danhsachmayin"}
                    className="printer-list-button"
                />

                {/* Thống kê */}
                <Link to="/thongke" className="stat-button">
                    <div className="button-content">
                        <BarChart2 size={18} className="button-icon" />
                        <span>Thống kê số lượng wifi</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

function SidebarButton({ to, text, isHighlighted = false, className = "", icon, ...props }) {
    return (
        <Link 
            to={to} 
            className={`sidebar-button ${className} ${isHighlighted ? "highlighted" : ""}`}
            {...props}
        >
            {icon && <span className="sidebar-button-icon">{icon}</span>}
            {text}
        </Link>
    );
}