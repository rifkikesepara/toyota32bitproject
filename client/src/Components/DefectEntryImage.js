import react from "react";
import LineTo from "react-lineto";
import "./DefectEntryImage.css";

export default function DefectEntryImage(props) {
  const data = props.data;

  // console.log(props.data[0].defectButtonRecords);
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
              >
                <h2 style={{ fontSize: "10px" }}>{data.labelText}</h2>
              </div>
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
