import React from "react";
import LineTo from "react-lineto";

export default function Test() {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="A" style={{ width: "50px" }}>
          A
        </div>
        <div className="B" style={{ width: "50px", height: "50px" }}>
          B
        </div>
      </div>
      <LineTo from="A" to="B" borderColor="red" borderWidth={5} delay={true} />
    </>
  );
}
