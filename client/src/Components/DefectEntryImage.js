import { useState } from "react";
import LineTo from "react-lineto";
import "./DefectEntryImage.css";
import NearMeSharpIcon from "@mui/icons-material/NearMeSharp";
import NearMeTwoToneIcon from "@mui/icons-material/NearMeTwoTone";
import CustomMenu from "./CustomMenu";

export default function DefectEntryImage(props) {
  const [selectDefect, setSelectDefect] = useState({
    enabled: false,
    anchorEl: 0,
    value: 0,
  });

  const [localMousePos, setLocalMousePos] = useState({});
  const [cursorPos, setCursorPos] = useState({ x: 365, y: 300 });

  const [images] = useState([
    { id: 71835, data: "/screen" },
    { id: 87897, data: "/defectselect" },
  ]);

  const handleMouseMove = (event) => {
    var bounds = event.target.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;

    setLocalMousePos({ x: localX, y: localY });
    localStorage.setItem("defectEntryCursorPosX", cursorPos.x);
    localStorage.setItem("defectEntryCursorPosY", cursorPos.y);
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
          {props.data[0].defectButtonRecords.map((data, _index) => {
            let posX, posY;
            if (data.boxX >= 375) posX = data.boxX - 80;
            else posX = data.boxX;
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
                    borderRadius: "7px",
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
                  <CustomMenu
                    open={selectDefect.enabled}
                    anchorEl={selectDefect.anchorEl}
                    onClose={() => {
                      setSelectDefect({ enabled: false, anchorEl: 0 });
                      props.setSelectedDefect("");
                    }}
                    data={props.data[0].arcDefects}
                    onClick={(id) => {
                      setSelectDefect({
                        enabled: false,
                        anchorEl: 0,
                        value: id,
                      });
                      props.setSelectedDefect(data.labelText);
                    }}
                  />
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
                  from="A" //TODO: if there is more than one div with a line rendere only one line is being rendered
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
          <NearMeTwoToneIcon
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
