import { TextField } from "@mui/material";
import KeyboardAltTwoToneIcon from "@mui/icons-material/KeyboardAltTwoTone";
import React, { useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
export default function CustomTextField(props) {
  //booleans to show keyboard
  const [bools, setBools] = useState({ showIcon: false, showKeyboard: false });

  //getting virtual keyboard input reference to syncronize with the input after closing the virtual keyboard
  let inputRef = useRef();

  //--------------------Virtual Keyboard Stuff----------------------
  const keyboard = useRef(""); //getting virtual keyboard reference to syncronize with the physical keyboard

  //the function that sends the input value outside of the component whenever the input changes
  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    props.setValues({ ...props.values, [props.name]: inputVal });
    if (props.onChange) props.onChange({ [props.name]: inputVal });
    inputRef.current = inputVal;
  };
  //---------------------------------------------------------------------

  return (
    <>
      <div
        className={props.className}
        style={{ ...props.style, minWidth: props.width, position: "relative" }}
      >
        <TextField
          id={props.id}
          placeholder={props.placeholder}
          error={props.error && Boolean(props.error)}
          helperText={props.error && props.helperText}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          sx={{ ...props.sx, width: "100%" }}
          name={props.name}
          value={props.values[props.name]}
          onChange={(event) => {
            onChangeInput(event);
          }}
          onFocus={(e) => {
            // props.onFocus();
            setBools({ ...bools, showIcon: true }); //show the keyboard icon to open the virtual keyboard
            inputRef.current = e.target.value;
          }}
        />
        {bools.showIcon && (
          <div
            style={{
              position: "absolute",
              left:
                props.iconPosition == "left"
                  ? -50
                  : props.iconPosition == "leftInner" && 0,
              right:
                props.iconPosition == "right"
                  ? -50
                  : props.iconPosition == "rightInner" && 0,
              top: 0,
              cursor: "pointer",
              zIndex: "100",
            }}
            onClick={() => {
              setBools({ ...bools, showKeyboard: true, showIcon: false }); //show the virtual keyboard
            }}
          >
            <KeyboardAltTwoToneIcon sx={{ fontSize: "50px" }} />
          </div>
        )}
      </div>

      {bools.showKeyboard && (
        <VirtualKeyboard
          onInit={() => keyboard.current.setInput(inputRef.current)}
          onBlur={() => {
            //if the user clicks outside of the virtual keyboard close it
            setBools({ ...bools, showKeyboard: false });
            if (props.onClose) props.onClose();
          }}
          style={{
            ...props.keyboardSX,
            position: "absolute",
            justifyContent: "center",
            left: 0,
            zIndex: 1000,
            width: "100%",
            display: bools.showKeyboard ? "flex" : "none",
            marginTop: bools.showKeyboard ? 700 : 0,
          }}
          layout={props.kayboardLayout}
          width={props.keyboardWidth}
          keyboard={keyboard}
          inputName={props.name}
          setValues={props.setValues}
          values={props.values}
          inputRef={inputRef}
          onChange={props.onChange}
        />
      )}
    </>
  );
}
