import { useState } from "react";
import LineTo from "react-lineto";
import "./DefectEntryImage.css";
import NearMeTwoToneIcon from "@mui/icons-material/NearMeTwoTone";
import CustomMenu from "./CustomMenu";

export default function DefectEntryImage(props) {
  //selected box's variables
  const [selectDefect, setSelectDefect] = useState({
    enabled: false,
    anchorEl: 0,
    value: 0,
  });

  const [localMousePos, setLocalMousePos] = useState({}); //mouse local positions

  //setting the defect position according to local position of the mouse
  const [cursorPos, setCursorPos] = useState({ x: 365, y: 300 });

  //ids of images and their data's api link
  const [images] = useState([
    { id: 71835, data: "/screen" },
    { id: 87897, data: "/defectselect" },
  ]);

  //the function that gets mouse local position on the div when we move the cursor on the div
  const handleMouseMove = (event) => {
    var bounds = event.target.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;

    setLocalMousePos({ x: localX, y: localY });

    //storing the defect position into the local storage to get position when defect is logged
    localStorage.setItem("defectEntryCursorPosX", cursorPos.x);
    localStorage.setItem("defectEntryCursorPosY", cursorPos.y);
  };

  //the function that handles if the clicked box has child image if not then the defect positioning will be activated
  const clickHandle = (e, data) => {
    //if picture doesn't have child pic then open the menu to select defect
    if (data.childPicID == 0)
      setSelectDefect({
        ...selectDefect,
        enabled: true,
        anchorEl: e.currentTarget,
      });

    //if picture has a child picture set the picture
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

            //positioning the boxes according to the image
            if (data.boxX >= 375) posX = data.boxX - 80;
            else posX = data.boxX;
            posY = data.boxY;

            return (
              <>
                <div
                  //if the box has a line set the className to A to determine the boxes that will be rendered line
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
                      props.setSelectedDefect(null, null);
                    }}
                    data={props.data[0].arcDefects}
                    onClick={(event) => {
                      setSelectDefect({
                        enabled: false,
                        anchorEl: 0,
                        value: event.defectId,
                      });
                      props.setSelectedDefect(data.labelText, event.defectName);
                    }}
                  />
                </div>
                {data.lineX != -100 && (
                  //setting a div to the end of the line to render the line through two points
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
        //if the defect has been selected then the defect positioning will be activated
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
