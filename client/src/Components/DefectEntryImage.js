import react, { useEffect, useState } from "react";
import LineTo from "react-lineto";
import "./DefectEntryImage.css";
import DefectSelect from "./DefectSelect";
import { Menu, MenuItem } from "@mui/material";
import NearMeSharpIcon from "@mui/icons-material/NearMeSharp";

export default function DefectEntryImage(props) {
  const [selectDefect, setSelectDefect] = useState({
    enabled: false,
    anchorEl: 0,
    value: 0,
  });

  const [localMousePos, setLocalMousePos] = useState({});
  const [cursorPos, setCursorPos] = useState({ x: 365, y: 300 });
  // console.log(selectDefect.value);

  const [images] = useState([
    { id: 71835, data: "/screen" },
    { id: 87897, data: "/defectselect" },
  ]);

  const handleMouseMove = (event) => {
    var bounds = event.target.getBoundingClientRect();
    // console.log(bounds);
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;

    setLocalMousePos({ x: localX, y: localY });
    // console.log(localMousePos);
  };

  const clickHandle = (e, data) => {
    if (data.childPicID == 0)
      setSelectDefect({
        enabled: true,
        anchorEl: e.currentTarget,
        value: selectDefect.value,
      });
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
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (selectDefect.value)
          setCursorPos({ x: localMousePos.x, y: localMousePos.y });
      }}
    >
      {!selectDefect.value && (
        <>
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
                    className="defectBorder"
                    style={{
                      display: "flex",
                      width: data.boxWidth,
                      height: data.boxHeight,
                      border: "2px solid",
                      borderColor: data.boxColor,
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "7px",
                    }}
                    onClick={(event) => clickHandle(event, data)}
                  >
                    <h2 style={{ position: "absolute", fontSize: "10px" }}>
                      {data.labelText}
                    </h2>
                  </div>
                  <Menu
                    id="basic-menu"
                    open={selectDefect.enabled}
                    anchorEl={selectDefect.anchorEl}
                    onClose={() => {
                      setSelectDefect({ enabled: false, anchorEl: 0 });
                      props.setSelectedDefect("");
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {props.data && //TODO: in the first image there are lots of iteration fix it!!
                      props.data[0].arcDefects.map((defects) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              setSelectDefect({
                                enabled: false,
                                anchorEl: 0,
                                value: defects.defectId,
                              });
                              props.setSelectedDefect(data.labelText);
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
        </>
      )}
      {selectDefect.value ? (
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            marginLeft: cursorPos.x,
            marginTop: cursorPos.y,
          }}
        >
          <NearMeSharpIcon
            sx={{
              "@keyframes fade": {
                "0%": { color: "white", fontSize: "20px" },
                "100%": { color: "red", fontSize: "50px" },
              },
              fontSize: "50px",
              transform: "rotateY(180deg)",
              animationName: "fade",
              animationIterationCount: "infinite",
              animationDirection: "alternate",
              animationDuration: "1s",
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <img src={props.img} width="750px" height="600px" />
    </div>
  );
}
