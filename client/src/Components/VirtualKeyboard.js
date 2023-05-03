import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "../Components/Keyboard.css";
import "react-simple-keyboard/build/css/index.css";

export default function VirtualKeyboard(props) {
  const divRef = useRef();
  const [layoutName, setLayoutName] = useState("default");
  const onChangeAll = (inputs) => {
    if (props.onChange) props.onChange(inputs);
    // props.setValues({
    //   ...props.values,
    //   [props.inputName]: props.inputRef.current + inputs[props.inputName],
    // });
    props.setValues({
      ...props.values,
      [props.inputName]: inputs[props.inputName],
    });
    // props.inputRef.current = inputs[props.inputName];
    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     */
    // console.log(inputs[props.inputName]);

    // console.log("Inputs changed", inputs);
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    divRef.current.focus();
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  useEffect(() => {
    props.keyboard.current.setInput(props.inputRef.current);
  }, []);

  return (
    <div
      ref={divRef}
      style={{ ...props.style }}
      onBlur={() => {
        props.onBlur();
        props.inputRef.current = props.values[props.inputName];
      }}
      tabIndex={100}
    >
      <Keyboard
        onInit={() => {
          divRef.current.focus();
        }}
        // disableca
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
    </div>
  );
}
