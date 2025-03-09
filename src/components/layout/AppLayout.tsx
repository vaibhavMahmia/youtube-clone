import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar";
import { Sidebar } from "../ui/Sidebar";

export const AppLayout: React.FC = () => {
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: '92.5vh' }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
