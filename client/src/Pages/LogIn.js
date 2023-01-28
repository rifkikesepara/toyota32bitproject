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
  setRef,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import { Formik, useFormik } from "formik";
import { width } from "@mui/system";

export default function LogIN() {
  const [terminalList, setTerminalList] = React.useState([]);
  const [terminals, setTerminals] = React.useState([]);
  const [id, setID] = React.useState("82842");
  const [count, setCount] = React.useState(0);
  const [shifts, setShifts] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [refs, setRefs] = useState([createRef(null)]);
  const [selectedRefa, setSelectedRef] = useState(1);

  const validationSchema = yup.object({
    email: yup.string("Enter your a terminal").required("Terminal is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      terminal: "82842",
      sicilno: "",
      password: "",
      assembleno: "",
      shift: "M",
      date: new Date(),
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 6));
    },
  });

  const scrl = useRef(null);
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
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    axios
      .get("http://192.168.1.8:3001/login")
      .then((response) => {
        setTerminalList(response);
      })
      .catch((req, err) => console.log(err));

    axios
      .get("http://192.168.1.8:3001/shifts")
      .then((response) => {
        setShifts(response);
        console.log(response.data);
      })
      .catch((req, err) => console.log(err));

    axios
      .get("http://192.168.1.8:3001/terminals")
      .then((response) => {
        setTerminals(response);
        response.data.data.map((prevdata) => {
          if (prevdata.depCode === params.depCode) {
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

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={formik.handleSubmit}>
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
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
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
            inputProps={{ maxLength: 3, typeof: "numeric" }}
            onChange={formik.handleChange}
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
      </form>
    </div>
  );
}
