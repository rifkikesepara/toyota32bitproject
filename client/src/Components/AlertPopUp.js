import { Alert } from "@mui/material";
import useAlert from "../Hooks/useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <div className="alert">
        <Alert
          severity={type}
          sx={{ minWidth: "40%", justifyContent: "center" }}
        >
          {text}
        </Alert>
      </div>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
