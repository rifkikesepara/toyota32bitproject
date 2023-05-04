import { TextField } from "@mui/material";
import KeyboardAltTwoToneIcon from "@mui/icons-material/KeyboardAltTwoTone";
import React, { useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
export default function CustomTextField(props) {
  const [bools, setBools] = useState({ showIcon: false, showKeyboard: false });
  let inputRef = useRef();
  //--------------------Virtual Keyboard Stuff----------------------
  const keyboard = useRef("");

  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    props.setValues({ ...props.values, [props.name]: inputVal });
    inputRef.current = inputVal;
  };
  //---------------------------------------------------------------------
  return (
    <>
      <div style={{ minWidth: props.width, position: "relative" }}>
        <TextField
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          sx={{ ...props.sx, width: "100%" }}
          name={props.name}
          id={props.id}
          value={props.values[props.name]}
          onChange={(event) => {
            if (props.onChange) props.onChange(event.target.value);
            onChangeInput(event);
          }}
          onFocus={() => {
            // props.onFocus();
            setBools({ ...bools, showIcon: true });
          }}
          //   onBlur={() => setBools({ ...bools, showIcon: false })}
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
          onBlur={() => setBools({ ...bools, showKeyboard: false })}
          style={{
            display: bools.showKeyboard ? "flex" : "none",
            ...props.keyboardSX,
          }}
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
