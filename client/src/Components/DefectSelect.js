import { Button, Select, MenuItem } from "@mui/material";
import { createRef, useState } from "react";
import React from "react";

export default function DefectSelect(props) {
  const [refs] = useState([createRef(null)]);
  let i = 0;
  let selectedRef = 0;
  const count = props.count;
  const [selectedRefa, setSelectedRef] = useState(1);
  const scroll = (scrollOffset) => {
    selectedRef = selectedRefa;
    if (scrollOffset > 0 && selectedRef > 0) {
      if (selectedRef >= count - 10) selectedRef -= 20;
      else selectedRef -= 3;
      refs[selectedRef].current.scrollIntoView({ behavior: "smooth" });
    } else if (scrollOffset < 0 && selectedRef <= count) {
      if (selectedRef >= count - 20) selectedRef = count;
      else selectedRef += 3;
      refs[selectedRef].current.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (selectedRef <= 1) {
      selectedRef = 0;
      refs[0].current.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedRef(selectedRef);
    // console.log(selectedRef);
  };

  return (
    <Select
      open={props.open}
      sx={props.sx}
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
          position: "sticky",
          top: "0px",
          zIndex: "100",
          minWidth: "100%",
          height: "50px",
          fontSize: "40px",
          textAlign: "center",
        }}
        onClick={() => scroll(10)}
        variant="contained"
      >
        ↑
      </Button>
      {props.data.data &&
        props.data.data.slice(0, count).map((prevdata) => {
          refs.push(createRef(null));
          i++;
          return (
            <MenuItem ref={refs[i]} value={prevdata.termId}>
              {prevdata.termName}
            </MenuItem>
          );
        })}

      <Button
        sx={{
          bottom: "0px",
          position: "sticky",
          zIndex: "100",
          minWidth: "100%",
          height: "50px",
          fontSize: "40px",
          textAlign: "center",
        }}
        onClick={() => scroll(-10)}
        variant="contained"
      >
        ↓
      </Button>
    </Select>
  );
}
