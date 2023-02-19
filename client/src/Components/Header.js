import React from "react";
import "../Pages/Terminal.css";

export default function Header() {
  return (
    <nav className="nav">
      <div className="nav-header">
        <h1>Araç Kalite Kontrol</h1>
      </div>
      <div className="menu-nav">
        <a href="/terminals" className="menu">
          Anasayfa
        </a>
        <a href="/terminals" className="menu">
          Yardım
        </a>
        <a href="/terminals" className="menu">
          İletişim
        </a>
      </div>
    </nav>
  );
}
