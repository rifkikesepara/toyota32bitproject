import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "../Components/Keyboard.css";
import "react-simple-keyboard/build/css/index.css";
import turkishLayout from "../KeyboardLayouts/Turkish";
import englishLayout from "../KeyboardLayouts/English";
import numericLayout from "../KeyboardLayouts/Numeric";
import { useTranslation } from "react-i18next";

export default function VirtualKeyboard(props) {
  const { i18n } = useTranslation();
  const divRef = useRef();
  const textAreaRef = useRef();
  const [layoutName, setLayoutName] = useState("default");

  const adjustLayout = () => {
    let layout;
    if (!props.layout) layout = "normal";
    else layout = props.layout;
    switch (layout) {
      case "normal":
        if (i18n.language == "en") return { ...englishLayout.layout };
        else return { ...turkishLayout.layout };

      case "numeric":
        return { ...numericLayout.layout };
    }
  };

  const onChangeAll = (inputs) => {
    textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    if (props.onChange) props.onChange(inputs);

    props.setValues({
      ...props.values,
      [props.inputName]: inputs[props.inputName],
    });
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
    <div className="keyboard-container" style={{ ...props.style }}>
      <div
        ref={divRef}
        onBlur={() => {
          props.onBlur();
          props.inputRef.current = props.values[props.inputName];
        }}
        tabIndex={100}
        className="keyboard"
        style={{
          width: props.width,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <textarea
          ref={textAreaRef}
          style={{
            width: "100%",
            resize: "none",
            fontSize: "20px",
            border: "none",
            outline: "none",
            overflowY: "hidden",
            zIndex: "200",
          }}
          wrap="true"
          value={props.values[props.inputName]}
        />
        <Keyboard
          onInit={() => {
            divRef.current.focus();
          }}
          layout={adjustLayout()}
          keyboardRef={(r) => (props.keyboard.current = r)}
          inputName={props.inputName}
          display={{
            "{enter}": "Enter",
            "{clear}": "Clear",
            "{bksp}": "&#8592",
            "{space}": " ",
            "{tab}": "Tab",
            "{lock}": "Capslock",
            "{shift}": "Shift",
          }}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          theme={"hg-theme-default myTheme1"}
          maxLength={props.inputName == "assembleno" ? 3 : 999}
          physicalKeyboardHighlight={true}
          preventMouseDownDefault={true}
          autoUseTouchEvents={true}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "-12%",
            backgroundColor: "white",
            textAlign: "left",
          }}
        >
          {/* <h1>{props.values[props.inputName]}</h1> */}
        </div>
      </div>
    </div>
  );
}
