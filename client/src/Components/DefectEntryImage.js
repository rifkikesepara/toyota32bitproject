import react from "react";

export default function DefectEntryImage(props) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
        }}
      >
        <h1>Test</h1>
      </div>
      <img src={props.img} width="750px" height="750px" />
    </div>
  );
}
