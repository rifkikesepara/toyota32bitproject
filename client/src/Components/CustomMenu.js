import { Button, Menu, MenuItem } from "@mui/material";
import { useRef } from "react";

export default function CustomMenu(props) {
  const buttonStyle = {
    color: "black",
    position: "sticky",
    backgroundColor: "#ffc840",
    zIndex: "100",
    minWidth: "100%",
    height: "50px",
    fontSize: "40px",
    textAlign: "center",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#ffc840",
    },
  };

  const selectRef = useRef();
  const scroll = (scrollOffset) => {
    let scorlling;
    if (scrollOffset > 0) {
      scorlling = selectRef.current.scrollTop - 100;
    } else {
      scorlling = selectRef.current.scrollTop + 100;
    }
    selectRef.current.scrollTo({
      top: scorlling,
      behavior: "smooth",
    });
  };

  return (
    <Menu
      id="basic-menu"
      open={props.open}
      anchorEl={props.anchorEl}
      PaperProps={{
        ref: selectRef,
        sx: { backgroundColor: "#ffc840" },
      }}
      onClose={() => {
        props.onClose();
      }}
      sx={{ maxHeight: "50%" }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Button sx={{ ...buttonStyle, top: 0 }} onClick={() => scroll(5)}>
        ↑
      </Button>
      {props.data && //TODO: in the first image there are lots of iteration fix it!!
        props.data.map((defects) => {
          return (
            <MenuItem
              sx={{
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                height: "50px",
                backgroundColor: "#ffc840",
                "&:hover": {
                  backgroundColor: "#ffc840",
                },
              }}
              onClick={() => props.onClick(defects.defectId)}
            >
              {defects.defectName}
            </MenuItem>
          );
        })}
      <Button sx={{ ...buttonStyle, bottom: 0 }} onClick={() => scroll(-5)}>
        ↓
      </Button>
    </Menu>
  );
}
