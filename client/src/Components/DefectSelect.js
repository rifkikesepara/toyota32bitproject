import { Button, Select, MenuItem } from "@mui/material";
import { createRef, useRef, useState } from "react";
import React from "react";

export default function DefectSelect(props) {
  const [refs] = useState([createRef(null)]);
  const count = props.count;
  let selectedRef = useRef(1);

  const scroll = (scrollOffset) => {
    if (scrollOffset > 0 && selectedRef.current > 0) {
      if (selectedRef.current >= count - 10) selectedRef.current -= 20;
      else selectedRef.current -= 3;
      refs[selectedRef.current].current.scrollIntoView({ behavior: "smooth" });
    } else if (scrollOffset < 0 && selectedRef.current <= count) {
      if (selectedRef.current >= count - 20) selectedRef.current = count;
      else selectedRef.current += 3;
      refs[selectedRef.current].current.scrollIntoView({
        behavior: "smooth",
      });
    }
    console.log(selectedRef.current);
    if (selectedRef.current <= 1) {
      selectedRef.current = 0;
      refs[0].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Select
      open={props.open}
      sx={{ ...props.sx }}
      MenuProps={{
        PaperProps: {
          sx: { backgroundColor: "#ffc840", border: "1px solid black" },
        },
      }}
      disabled={props.disabled}
      name={props.name}
      id="select"
      value={props.value}
      onChange={props.onChange}
      onClose={props.onClose}
    >
      <div ref={refs[0]} style={{ margin: "-10px" }}></div>
      <Button
        sx={{
          color: "black",
          position: "sticky",
          backgroundColor: "#ffc840",
          top: "0px",
          zIndex: "100",
          minWidth: "100%",
          height: "50px",
          fontSize: "40px",
          textAlign: "center",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#ffc840",
          },
        }}
        onClick={() => scroll(10)}
      >
        ↑
      </Button>
      {props.data &&
        props.data.slice(0, count).map((prevdata, _index) => {
          refs.push(createRef(null));
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
              ref={refs[_index + 1]}
              onClick={() => console.log(_index + 1)}
              value={prevdata.termId}
            >
              {prevdata.termName}
            </MenuItem>
          );
        })}

      <Button
        sx={{
          color: "black",
          backgroundColor: "#ffc840",
          bottom: 0,
          position: "sticky",
          zIndex: "100",
          minWidth: "100%",
          height: "50px",
          fontSize: "40px",
          textAlign: "center",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#ffc840",
          },
        }}
        onClick={() => scroll(-10)}
      >
        ↓
      </Button>
    </Select>
  );
}
