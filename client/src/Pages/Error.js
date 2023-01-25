import React from "react";

export default function Error() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Oops!</h1>
      <h1 style={{ textAlign: "center" }}>
        Something went <b style={{ color: "red" }}>wrong</b>
      </h1>
      <h1 style={{ textAlign: "center" }}>Please try again later!</h1>
    </div>
  );
}
