import { Button, Select, MenuItem } from "@mui/material";
import { useRef } from "react";
import React from "react";

export default function CustomSelect(props) {
  //button styling object
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

  const count = props.count; //count to reduce the menu item count
  const selectRef = useRef(); //getting select component's reference to adjust the scroller

  //the function to scroll up or down according to offset
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
    <Select
      open={props.open}
      sx={{ ...props.sx }}
      MenuProps={{
        PaperProps: {
          ref: selectRef,
          sx: {
            backgroundColor: "#ffc840",
            border: "1px solid black",
            maxHeight: "50%",
          },
        },
      }}
      disabled={props.disabled}
      name={props.name}
      id="select"
      value={props.value}
      onChange={props.onChange}
      onClose={props.onClose}
    >
      <Button
        sx={{
          ...buttonStyle,
          top: 0,
        }}
        onClick={() => scroll(5)}
      >
        ↑
      </Button>
      {props.data &&
        props.data.slice(0, count).map((prevdata) => {
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
              value={prevdata.termId}
            >
              {prevdata.termName}
            </MenuItem>
          );
        })}

      <Button
        sx={{
          ...buttonStyle,
          bottom: 0,
        }}
        onClick={() => scroll(-5)}
      >
        ↓
      </Button>
    </Select>
  );
}
