import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const getButtonStyle = (path) => ({
    color: location.pathname === path ? "#1976d2" : "#888888", 
    fontWeight: location.pathname === path ? "bold" : "normal",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 12px",
    textDecoration: "none",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        zIndex: 1000,
      }}
    >
      <h1 style={{color:"#4288e5"}}>QA Hub</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={getButtonStyle("/")}>
          New Validation
        </Link>
        <Link to="/history" style={getButtonStyle("/history")}>
          History
        </Link>
      </div>
    </header>
  );
}
