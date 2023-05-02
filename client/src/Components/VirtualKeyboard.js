import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "../Components/Keyboard.css";
import "react-simple-keyboard/build/css/index.css";

export default function VirtualKeyboard(props) {
  const [layoutName, setLayoutName] = useState("default");

  const onChangeAll = (inputs) => {
    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     */
    props.setInputs({ ...inputs });
    // console.log(inputs[props.inputName]);
    props.setValues({
      ...props.values,
      [props.inputName]: inputs[props.inputName],
    });
    // console.log("Inputs changed", inputs);
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    // console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  return (
    <>
      {/* <input
        id="firstName"
        value={getInputValue("firstName")}
        onFocus={() => setInputName("firstName")}
        placeholder={"First Name"}
        onChange={onChangeInput}
      />
      <input
        id="lastName"
        value={getInputValue("lastName")}
        onFocus={() => setInputName("lastName")}
        placeholder={"Last Name"}
        onChange={onChangeInput}
      /> */}
      <Keyboard
        keyboardRef={(r) => (props.keyboard.current = r)}
        inputName={props.inputName}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={onKeyPress}
        theme={"hg-theme-default myTheme1"}
        maxLength={props.inputName == "assembleno" ? 3 : 999}
        physicalKeyboardHighlight={true}
        preventMouseDownDefault={true}
        autoUseTouchEvents={true}
      />
    </>
  );
}
