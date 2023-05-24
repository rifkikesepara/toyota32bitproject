import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "../Components/Keyboard.css";
import "react-simple-keyboard/build/css/index.css";
import turkishLayout from "../KeyboardLayouts/Turkish";
import englishLayout from "../KeyboardLayouts/English";
import numericLayout from "../KeyboardLayouts/Numeric";
import { useTranslation } from "react-i18next";

export default function VirtualKeyboard(props) {
  const { i18n } = useTranslation(); //getting context for the localization on the page

  const divRef = useRef(); //getting virtual keyboard's container div reference to determine whether the user cliked the outside of the div or not

  const textAreaRef = useRef(null); //getting the text area refrerence to scroll down if the user's input is not fitting the text area anymore

  const [layoutName, setLayoutName] = useState("default"); //layout name to switch different keyboard layout

  //the function that adjusts the keyboard layout according to layout prop
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

  //the function that executes whenever user clicks a button on the virtual keyboard
  const onChangeAll = (inputs) => {
    // textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    if (props.onChange) props.onChange(inputs);

    //setting text field value that is outside of the component
    props.setValues({
      ...props.values,
      [props.inputName]: inputs[props.inputName],
    });
  };

  //the function that chages tha layout if the user clicks the shift button on the virtual keyboard
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

  //whenever virtual keyboard opens it syncronizes with the textfield's value
  useEffect(() => {
    if (props.onInit) props.onInit();
  }, []);

  return (
    <div
      style={{
        ...props.style,
        opacity: props.disabled && "0.4",
        pointerEvents: props.disabled && "none",
      }}
    >
      <div
        className="keyboard"
        ref={divRef}
        onBlur={() => {
          if (props.onBlur) props.onBlur();
          if (props.inputRef)
            props.inputRef.current = props.values[props.inputName];
        }}
        tabIndex={100}
        style={{
          width: props.width,
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
        }}
      >
        {false && (
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
        )}
        <Keyboard
          onInit={() => {
            divRef.current.focus();
          }}
          layout={adjustLayout()}
          keyboardRef={(r) => {
            if (props.keyboard) props.keyboard.current = r;
          }}
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
