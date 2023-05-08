import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import Turkish from "../Resources/turkish.png";
import English from "../Resources/english.png";
import { useState } from "react";

export default function Footer({ children }) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e);
    localStorage.setItem("language", e);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <Menu onClose={handleClose} anchorEl={anchorEl} open={open}>
          <MenuItem
            onClick={(e) => {
              // i18n.changeLanguage("en");
              // localStorage.setItem("language", e.target.value);
              changeLanguage("en");
              handleClose();
            }}
          >
            <img height={18} width={30} src={English} />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              console.log(e.currentTarget.value);
              // i18n.changeLanguage("tr");
              // localStorage.setItem("language", e.target.value);
              changeLanguage("tr");
              handleClose();
            }}
          >
            <img height={18} width={30} src={Turkish} />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
