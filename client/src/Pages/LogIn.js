import React, { createRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import "./Login.css";
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import KeyboardAltTwoToneIcon from "@mui/icons-material/KeyboardAltTwoTone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import { Formik, useFormik } from "formik";
import VirtualKeyboard from "../Components/VirtualKeyboard";

export default function LogIN() {
  const [depName, setDepName] = useState("");
  const [terminalList, setTerminalList] = React.useState([]);
  const [terminals, setTerminals] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [shifts, setShifts] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [refs, setRefs] = useState([createRef(null)]);
  const [selectedRefa, setSelectedRef] = useState(1);
  const [assyno, setAssyNo] = useState(123);

  const [inputName, setInputName] = useState("default");
  const [inputs, setInputs] = useState({});
  const keyboard = useRef();

  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };

  const onChangeInput = (event) => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });

    formik.setValues({ ...formik.values, [inputName]: inputVal });

    keyboard.current.setInput(inputVal);
  };

  const [user, setUser] = useState({
    sicilno: 321,
    password: 12345,
    assembleno: 770,
  });

  const validationSchema = yup.object({
    email: yup.string("Enter your a terminal").required("Terminal is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  function checkUser(values) {
    if (values.sicilno == user.sicilno) {
      if (values.password == user.password) {
        if (values.assembleno == user.assembleno) {
          return true;
        }
      }
    }
    return false;
  }

  const formik = useFormik({
    initialValues: {
      terminal: 82842,
      sicilno: "",
      password: "",
      assembleno: "770",
      shift: "M",
      date: new Date(),
    },
    onSubmit: (values) => {
      let a = checkUser(values);
      if (a) alert("User exitst");
      else alert("User does not exist");
      alert(JSON.stringify(values, null, 6));
    },
  });

  let params = useParams();
  let i = 0;
  let selectedRef = 0;

  const scroll = (scrollOffset) => {
    selectedRef = selectedRefa;
    if (scrollOffset > 0 && selectedRef > 0) {
      if (selectedRef >= count - 10) selectedRef -= 20;
      else selectedRef -= 3;
      refs[selectedRef].current.scrollIntoView({ behavior: "smooth" });
    } else if (scrollOffset < 0 && selectedRef <= count) {
      if (selectedRef >= count - 20) selectedRef = count;
      else selectedRef += 3;
      refs[selectedRef].current.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (selectedRef <= 1) {
      selectedRef = 0;
      refs[0].current.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedRef(selectedRef);
    console.log(selectedRef);
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.33:3001/login")
      .then((response) => {
        setTerminalList(response);
      })
      .catch((req, err) => console.log(err));

    axios
      .get("http://192.168.1.33:3001/shifts")
      .then((response) => {
        setShifts(response);
        console.log(response.data);
      })
      .catch((req, err) => console.log(err));

    axios
      .get("http://192.168.1.33:3001/terminals")
      .then((response) => {
        setTerminals(response);
        console.log(response.data.data);
        response.data.data.map((prevdata) => {
          if (prevdata.depCode === params.depCode) {
            setDepName(prevdata.depName);
            prevdata.filterBaseds.map((filter) => {
              if (filter.filterCode === params.filterCode) {
                setCount(filter.linkCount);
              }
              return 0;
            });
            return 0;
          }
        });
      })
      .catch((req, err) => console.log(err));
  }, []);

  const findAssyNo = () => {
    if (terminalList.data) {
      let assyno;
      terminalList.data.data.map((data) => {
        if (data.termId === formik.values.terminal) {
          assyno = data.lastAssyNo;
        }
      });
      return assyno;
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={formik.handleSubmit}>
        <div className="row" style={{ justifyContent: "center" }}>
          <h1>{depName}</h1>
        </div>
        <div className="row">
          {count === 1 && (
            <div
              style={{
                position: "absolute",
                left: "0",
                zIndex: "100",
                width: "100%",
                height: "80px",
              }}
            ></div>
          )}
          <p>Terminal Listesi</p>
          <Select
            name="terminal"
            id="select"
            sx={{ m: 1, minWidth: 200, margin: 0 }}
            value={formik.values.terminal}
            inputProps={{ "aria-label": "Without label" }}
            onChange={formik.handleChange}
          >
            <div ref={refs[0]} style={{ margin: "-10px" }}></div>
            <Button
              sx={{
                position: "sticky",
                top: "0px",
                zIndex: "100",
                minWidth: 200,
                height: "50px",
                fontSize: "40px",
                textAlign: "center",
              }}
              onClick={() => scroll(10)}
              variant="contained"
            >
              ↑
            </Button>
            {terminalList.data &&
              terminalList.data.data.slice(0, count).map((prevdata) => {
                refs.push(createRef(null));
                i++;
                return (
                  <MenuItem ref={refs[i]} value={prevdata.termId}>
                    {prevdata.termName}
                  </MenuItem>
                );
              })}

            <Button
              sx={{
                bottom: "0px",
                position: "sticky",
                zIndex: "100",
                minWidth: 200,
                height: "50px",
                fontSize: "40px",
                textAlign: "center",
              }}
              onClick={() => scroll(-10)}
              variant="contained"
            >
              ↓
            </Button>
          </Select>
        </div>
        <div className="row">
          <p>Sicil No</p>
          <TextField
            sx={{ minWidth: 200 }}
            name="sicilno"
            id="filled-basic"
            variant="filled"
            value={getInputValue("sicilno")}
            onChange={onChangeInput}
            onFocus={() => setInputName("sicilno")}
          />
        </div>
        <div className="row">
          <p>Şifre</p>
          <TextField
            name="password"
            sx={{ minWidth: 200 }}
            id="filled-basic"
            variant="filled"
            placeholder="***********"
            value={getInputValue("password")}
            onChange={onChangeInput}
            onFocus={() => {
              setInputName("password");
            }}
          />
        </div>
        <div className="row">
          <p>Montaj NO</p>
          <TextField
            name="assembleno"
            sx={{ minWidth: 200 }}
            id="filled-basic"
            variant="filled"
            placeholder="123"
            value={findAssyNo()}
            inputProps={{
              maxLength: 3,
            }}
            onChange={onChangeInput}
            onFocus={() => setInputName("assembleno")}
          />
        </div>
        <div
          id="shift"
          style={{
            backgroundColor:
              formik.values.shift == "M"
                ? "#12a6eb"
                : formik.values.shift == "B"
                ? "#ffffff"
                : formik.values.shift == "K" && "#ff0000",
            border: formik.values.shift == "B" && "0.1px solid black",
          }}
        >
          <p>Tarih</p>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"tr"}>
            <DatePicker
              className="datepicker"
              name="date"
              value={formik.values.date}
              onChange={(newValue) => {
                formik.values.date = newValue;
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <p>Vardiya</p>
          <FormControl>
            <Select
              name="shift"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.shift}
              inputProps={{ "aria-label": "Without label" }}
              onChange={formik.handleChange}
            >
              {shifts.data &&
                shifts.data.data.map((prevdata) => {
                  return (
                    <MenuItem value={prevdata.shiftCode}>
                      {prevdata.shiftCode}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <div id="buttons">
          <Button
            type="submit"
            sx={{ width: "100%", marginRight: "40px", height: "70px" }}
            variant="contained"
          >
            Kaydet
          </Button>
          <Button
            color="error"
            sx={{
              height: "70px",
              width: "100%",
              marginLeft: "40px",
            }}
            href="/terminals"
            variant="contained"
          >
            Kapat
          </Button>
        </div>

        <Accordion
          elevation={0}
          sx={{
            "&:before": {
              display: "none",
            },
            "& .MuiAccordion-root": {
              backgroundColor: "black",
            },
            width: "100%",
            border: "0px solid black",
          }}
          disableGutters
        >
          <AccordionSummary
            sx={{
              "& .MuiAccordionSummary-content": {
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            <KeyboardAltTwoToneIcon
              onClick={() => console.log("tikladi")}
              sx={{ fontSize: "50px", cursor: "pointer" }}
            />
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <VirtualKeyboard
                keyboard={keyboard}
                setInputs={setInputs}
                inputName={inputName}
                setValues={formik.setValues}
                values={formik.values}
              ></VirtualKeyboard>
            </div>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
}
