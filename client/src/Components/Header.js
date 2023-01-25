import React from "react";
import "../Pages/Terminal.css";

export default function Header() {
  return (
    <nav className="nav">
      <h1>Araç Kalite Kontrol</h1>
      <section>
        <a href="/terminals" className="menu">
          Anasayfa
        </a>
        <a href="/terminals" className="menu">
          Yardım
        </a>
        <a href="/terminals" className="menu">
          İletişim
        </a>
      </section>
    </nav>
  );
}
