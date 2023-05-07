import { Alert } from "@mui/material";
import { useEffect } from "react";

export default function CustomAlert(props) {
  useEffect(() => {
    setTimeout(() => {
      props.onFinished(true);
    }, 3000);
  }, []);
  return (
    //class name alert is in Login.css file
    <div key={props.key} className="alert">
      <Alert
        severity={props.type}
        sx={{ minWidth: "40%", justifyContent: "center" }}
      >
        {props.message}
      </Alert>
    </div>
  );
}
