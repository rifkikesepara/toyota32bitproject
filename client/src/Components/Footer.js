import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import Turkish from "../Resources/turkish.png";
import English from "../Resources/english.png";
import { useState } from "react";

export default function Footer({ children }) {
  const { i18n } = useTranslation(); //getting context for the localization on the page

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //the function that change the language according to user's selection of language
  const changeLanguage = (e) => {
    i18n.changeLanguage(e);
    localStorage.setItem("language", e);
  };

  return (
    <>
      {children}
      <div
        style={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          width: "100%",
          justifyContent: "left",
        }}
      >
        <img
          style={{ cursor: "pointer" }}
          height={18}
          width={30}
          src={i18n.language == "tr" ? Turkish : English}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        />
        <Menu onClose={() => setAnchorEl(null)} anchorEl={anchorEl} open={open}>
          <MenuItem
            onClick={(e) => {
              changeLanguage("en");
              setAnchorEl(null);
            }}
          >
            <img height={18} width={30} src={English} />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              changeLanguage("tr");
              setAnchorEl(null);
            }}
          >
            <img height={18} width={30} src={Turkish} />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
