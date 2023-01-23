import React from "react";
import "./Terminal.css";

export default function Header() {
  return (
    <nav className="nav">
      <h1>Araç Kalite Kontrol</h1>
      <section>
        <a className="menu">Anasayfa</a>
        <a className="menu">Yardım</a>
        <a className="menu">İletişim</a>
      </section>
    </nav>
  );
}
