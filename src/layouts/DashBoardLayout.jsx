import { useState } from "react";
import SideBar from "./SideBar";
import './DashBoardLayout.css'
import Navbar from "./Navbar";


export default function DashBoardLayout({children, navigate})
{
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="layout">
            <SideBar
                navigate= {navigate}
            />

            <div className={`main-wrap${collapsed ? " collapsed" : ""}`}>
                <Navbar />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
}


