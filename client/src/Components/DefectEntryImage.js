import react, { useState } from "react";
import LineTo from "react-lineto";
import "./DefectEntryImage.css";
import DefectSelect from "./DefectSelect";
import { Menu, MenuItem } from "@mui/material";

export default function DefectEntryImage(props) {
  const data = props.data;
  const [selectDefect, setSelectDefect] = useState({
    enabled: false,
    value: 0,
  });

  // console.log(props.data);

  const [images] = useState([
    { id: 71835, data: "/screen" },
    { id: 87897, data: "/defectselect" },
  ]);

  const clickHandle = (e, data) => {
    if (data.childPicID == 0)
      setSelectDefect({ enabled: true, value: e.currentTarget });
    images.map((prev) => {
      if (prev.id == data.childPicID) {
        props.setPicture(data.childPicID);
        props.setData([]);
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      {props.data[0].defectButtonRecords.map((data) => {
        let posX, posY;
        if (data.boxX >= 375) posX = data.boxX - 80;
        else posX = data.boxX;

        // if (data.boxY >= 375) posY = data.boxY - 80;
        posY = data.boxY;

        return (
          <>
            <div
              className={data.lineX != -100 ? "A" : "C"}
              style={{
                marginLeft: posX,
                marginTop: posY,
                position: "absolute",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: data.boxWidth,
                  height: data.boxHeight,
                  border: "2px solid red",
                  borderColor: data.boxColor,
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff5b",
                  borderRadius: "7px",
                }}
                onClick={(event) => clickHandle(event, data)}
              >
                <h2 style={{ fontSize: "10px" }}>{data.labelText}</h2>
              </div>
              <Menu
                id="basic-menu"
                open={selectDefect.enabled}
                anchorEl={selectDefect.value}
                onClose={() => {
                  setSelectDefect({ enabled: false, value: 0 });
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {props.data &&
                  props.data[0].arcDefects.map((defects) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setSelectDefect({ enabled: false, value: 0 });
                        }}
                      >
                        {defects.defectName}
                      </MenuItem>
                    );
                  })}
              </Menu>
            </div>
            {data.lineX != -100 && (
              <div
                className="B"
                style={{
                  marginLeft: data.lineX,
                  marginTop: data.lineY,
                  position: "absolute",
                }}
              ></div>
            )}
            <LineTo
              from="A"
              to="B"
              borderColor="red"
              borderWidth={1}
              delay={true}
              zIndex={0}
            />
          </>
        );
      })}
      <img src={props.img} width="750px" height="600px" />
    </div>
  );
}
