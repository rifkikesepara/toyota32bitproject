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
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams, Navigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import KeyboardAltTwoToneIcon from "@mui/icons-material/KeyboardAltTwoTone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import { useFormik } from "formik";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import useGetData from "../Hooks/GetData";
import DefectSelect from "../Components/DefectSelect";

export default function LogIN() {
  const [depName, setDepName] = useState("");
  const [count, setCount] = React.useState(0);
  const [refs] = useState([createRef(null)]);
  const [selectedRefa, setSelectedRef] = useState(1);

  const [inputName, setInputName] = useState("default");
  const [inputs, setInputs] = useState({});
  const [logged, setLogged] = useState(2);
  const [loading, setLoading] = useState(false);
  const keyboard = useRef();

  const terminalList = useGetData("http://localhost:3001/login", 500, () => {}); //getting terminals data
  const shifts = useGetData("http://localhost:3001/shifts", 500, () => {}); //getting shift data

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

  const [user] = useState({
    sicilno: 321,
    password: 12345,
    assembleno: 770,
  });

  // const validationSchema = yup.object({
  //   email: yup.string("Enter your a terminal").required("Terminal is required"),
  //   password: yup
  //     .string("Enter your password")
  //     .min(8, "Password should be of minimum 8 characters length")
  //     .required("Password is required"),
  // });

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
      setLoading(true);
      let a = checkUser(values);
      if (a) {
        // alert("User exitst");
        setLogged(1);
        setLoading(true);
      } else {
        setLogged(0);
        // alert("User does not exist");
      }
      // alert(JSON.stringify(values, null, 6));
    },
  });

  let params = useParams();
  let i = 0;
  let selectedRef = 0;

  // const scroll = (scrollOffset) => {
  //   selectedRef = selectedRefa;
  //   if (scrollOffset > 0 && selectedRef > 0) {
  //     if (selectedRef >= count - 10) selectedRef -= 20;
  //     else selectedRef -= 3;
  //     refs[selectedRef].current.scrollIntoView({ behavior: "smooth" });
  //   } else if (scrollOffset < 0 && selectedRef <= count) {
  //     if (selectedRef >= count - 20) selectedRef = count;
  //     else selectedRef += 3;
  //     refs[selectedRef].current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  //   if (selectedRef <= 1) {
  //     selectedRef = 0;
  //     refs[0].current.scrollIntoView({ behavior: "smooth" });
  //   }
  //   setSelectedRef(selectedRef);
  //   // console.log(selectedRef);
  // };

  useEffect(() => {
    axios
      .get("http://localhost:3001/terminals")
      .then((response) => {
        // console.log(response.data.data);
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
      terminalList.data.map((data) => {
        if (data.termId === formik.values.terminal) {
          assyno = data.lastAssyNo;
        }
      });
      return assyno;
    }
  };

  if (logged === 1 && loading) {
    setTimeout(() => {
      setLogged(8);
    }, 1000);
    setTimeout(() => {
      console.log("5 saniye sonra");
      setLogged(5);
    }, 4000);
  }

  if (logged === 0 && loading) {
    setTimeout(() => {
      console.log("1 saniye sonra");
      setLogged(7);
      setLoading(false);
    }, 1500);
  }

  return (
    <>
      {logged == 5 && (
        <Navigate
          to={
            "../terminal/defectentry/" +
            params.depCode +
            "/" +
            params.filterCode +
            "/3070725"
          }
        ></Navigate>
      )}

      {logged == 8 && (
        <div className="alert">
          <Alert
            severity="success"
            sx={{ minWidth: "40%", justifyContent: "center" }}
          >
            Logged In
          </Alert>
        </div>
      )}
      {logged == 7 && (
        <div className="alert">
          <Alert
            severity="error"
            sx={{ minWidth: "40%", justifyContent: "center" }}
          >
            Invalid User
          </Alert>
        </div>
      )}

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
            <DefectSelect
              data={terminalList}
              count={count}
              value={formik.values.terminal}
              onChange={formik.handleChange}
              name="terminal"
              menuItemName="termName"
            />
          </div>
          <div className="row">
            <p>Sicil No</p>
            <TextField
              disabled={loading}
              autoComplete="off"
              sx={{ minWidth: "65%" }}
              name="sicilno"
              id="outlined-size-normal"
              value={getInputValue("sicilno")}
              onChange={onChangeInput}
              onFocus={() => setInputName("sicilno")}
            />
          </div>
          <div className="row">
            <p>Şifre</p>
            <TextField
              disabled={loading}
              autoComplete="off"
              name="password"
              sx={{ minWidth: "65%" }}
              id="filled-basic"
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
              className="TextField"
              name="assembleno"
              sx={{ minWidth: "65%" }}
              disabled={true}
              variant="outlined"
              placeholder="123"
              value={findAssyNo()}
              inputProps={{
                maxLength: 3,
              }}
              onChange={onChangeInput}
              onFocus={() => setInputName("assembleno")}
              focused
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"tr"}
            >
              <DatePicker
                disabled={loading}
                className="datepicker"
                name="date"
                value={formik.values.date}
                onChange={(newValue) => {
                  formik.values.date = newValue;
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <p>Vardiya</p>
            <FormControl>
              <Select
                disabled={loading}
                name="shift"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.shift}
                inputProps={{ "aria-label": "Without label" }}
                onChange={formik.handleChange}
              >
                {shifts.data &&
                  shifts.data.map((prevdata) => {
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
            <LoadingButton
              loading={loading}
              type="submit"
              sx={{ width: "100%", height: "70px", margin: "15px" }}
              variant="contained"
            >
              Kaydet
            </LoadingButton>

            <Button
              disabled={loading}
              color="error"
              sx={{ height: "70px", width: "100%", margin: "15px" }}
              href="/terminals"
              variant="contained"
            >
              Kapat
            </Button>
          </div>

          <Accordion
            disabled={loading}
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
            <VirtualKeyboard
              keyboard={keyboard}
              setInputs={setInputs}
              inputName={inputName}
              setValues={formik.setValues}
              values={formik.values}
            />
            <AccordionDetails>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></div>
            </AccordionDetails>
          </Accordion>
        </form>
      </div>
    </>
  );
}
