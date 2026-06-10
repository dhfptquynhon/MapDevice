import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";
import './Home.css';

export function Home() {
    return (
<>
<div className="container">
            <Navbar/>
            <div className="home">
                <Sidebar/>
                <Main/>
            </div>
            
        <Footer/>
</div>

</>
    );
}
