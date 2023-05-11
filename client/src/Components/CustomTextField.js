import { TextField } from "@mui/material";
import KeyboardAltTwoToneIcon from "@mui/icons-material/KeyboardAltTwoTone";
import React, { useEffect, useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
export default function CustomTextField(props) {
  const [bools, setBools] = useState({ showIcon: false, showKeyboard: false });
  let inputRef = useRef();
  //--------------------Virtual Keyboard Stuff----------------------
  const keyboard = useRef("");

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
          placeholder={props.placeholder}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          sx={{ ...props.sx, width: "100%" }}
          name={props.name}
          id={props.id}
          value={props.values[props.name]}
          onChange={(event) => {
            onChangeInput(event);
          }}
          onFocus={(e) => {
            // props.onFocus();
            setBools({ ...bools, showIcon: true });
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
              setBools({ ...bools, showKeyboard: true, showIcon: false });
            }}
          >
            <KeyboardAltTwoToneIcon sx={{ fontSize: "50px" }} />
          </div>
        )}
      </div>

      {bools.showKeyboard && (
        <VirtualKeyboard
          onBlur={() => {
            setBools({ ...bools, showKeyboard: false });
            if (props.onClose) props.onClose();
          }}
          style={{
            ...props.keyboardSX,
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
