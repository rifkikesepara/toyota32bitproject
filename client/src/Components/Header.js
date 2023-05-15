import React from "react";
import "../Pages/Terminal.css";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation(); //getting context for the localization on the page

  return (
    <nav className="nav">
      <div className="nav-header">
        <h1>{t("header")}</h1>
      </div>
      <div className="menu-nav">
        <a href="/terminals" className="menu">
          {t("homepage")}
        </a>
        <a href="/terminals" className="menu">
          {t("help")}
        </a>
        <a href="/terminals" className="menu">
          {t("contact")}
        </a>
      </div>
    </nav>
  );
}
