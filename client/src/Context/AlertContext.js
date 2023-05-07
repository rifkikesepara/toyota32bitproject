import { createContext, useState } from "react";

const initialState = {
  text: "",
  type: "",
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const setAlert = (text, type, time, onFinish) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      onFinish();
      setText("");
      setType("");
    }, time);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
