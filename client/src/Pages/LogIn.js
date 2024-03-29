import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Select, MenuItem, TextField, Button, Skeleton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams, Navigate } from "react-router-dom";
import "dayjs/locale/tr";
import { useFormik } from "formik";
import useGetData from "../Hooks/GetData";
import CustomSelect from "../Components/CustomSelect";
import useGetDataOnce from "../Hooks/GetDataOnce";
import API from "../Resources/api.json";
import useAlert from "../Hooks/useAlert";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import CustomDatePicker from "../Components/CustomDatePicker";

export default function LogIN() {
  const { t } = useTranslation(); //getting context for the localization on the page
  const { setAlert } = useAlert(); //getting context to pop the alert up whenever we need

  const [inputName, setInputName] = useState("");
  const [keyboardLayout, setKeyboardLayout] = useState("numeric");
  const keyboard = useRef();

  const [depName, setDepName] = useState("");
  const [count, setCount] = React.useState(0);
  const [booleans, setBooleans] = useState({
    loading: false,
    navigate: false,
  });

  const terminalList = useGetDataOnce(API.link + "/login"); //fetching terminals data
  const shifts = useGetDataOnce(API.link + "/shifts"); //fetching shift data

  let params = useParams();
  useGetDataOnce(API.link + "/terminals", true, (response) => {
    //iterating thorugh data to find the correct department that matches with the parameters that we get from the link
    response.data.map((prevdata) => {
      if (prevdata.depCode === params.depCode) {
        setDepName(prevdata.depName); //setting the department name that matches with the correct terminal
        prevdata.filterBaseds.map((filter) => {
          if (filter.filterCode === params.filterCode) {
            setCount(filter.linkCount);
          }
        });
      }
    });
  });

  useEffect(() => localStorage.removeItem("shift"), []); //if shift has been stored in the local storage remove it whenever we come back to this page

  //test user informations to log into the system
  const [user] = useState({
    sicilno: 321,
    password: 12345,
    assembleno: 500,
  });

  //validation for the user information
  const validationSchema = yup.object({
    sicilno: yup.string().required(t("cantNullError")),
    password: yup.string().required(t("cantNullError")),
    assembleno: yup.string().required(t("cantNullError")),
  });

  //the function that checks whether the user entered the right informations or not (checks with fake info)
  function checkUser(values) {
    if (
      values.sicilno == user.sicilno &&
      values.password == user.password &&
      values.assembleno == user.assembleno
    ) {
      return true;
    }
    return false;
  }

  const formik = useFormik({
    //initializing values
    initialValues: {
      terminal: 82842,
      sicilno: "",
      password: "",
      assembleno: "770",
      shift: "M",
      date: new Date(),
    },
    validationSchema: validationSchema,

    //when the user submits the values of the info if they are correct then it will navigate us to the next page if not then we'll be alerted
    onSubmit: (values) => {
      console.log(values);

      setBooleans({ ...booleans, loading: true });
      if (checkUser(values)) {
        setAlert(t("loginAlert"), "success", 3000, () => {
          setBooleans({ ...booleans, loading: true, navigate: true });
          localStorage.setItem("shift", formik.values.shift);
        });
      } else {
        setAlert(t("invalidUserAlert"), "error", 3000, () => {
          setBooleans({ ...booleans, loading: false });
        });
      }
    },
  });

  //the function that finds assy no according to the terminal that user selects and returns it
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

  return (
    <>
      {/* if the user infos are correct we'll be navigated */}
      {booleans.navigate && (
        <Navigate
          to={
            "../terminal/defectentry/" +
            params.depCode +
            "/" +
            params.filterCode +
            "/3070725"
          }
        />
      )}

      <div className="login-container">
        <form className="login-box" onSubmit={formik.handleSubmit}>
          <div className="row" style={{ justifyContent: "center" }}>
            {depName ? (
              <h1>{depName}</h1>
            ) : (
              <Skeleton variant="rectangular" width={300} height={40} />
            )}
          </div>
          <div className="row">
            <p>{t("terminalList")}</p>
            <CustomSelect
              disabled={count == 1 || booleans.loading ? true : false}
              sx={{ width: "65%", color: "black" }}
              data={terminalList.data}
              count={count} //the terminal count according to the filter that the user has been selected
              value={formik.values.terminal}
              onChange={(event) => {
                //TODO: change the assemble number considering selected terminal
                formik.handleChange(event);
              }}
              name="terminal"
            />
          </div>
          <div className="row">
            <p>{t("regNumber")}</p>
            <TextField
              sx={{ width: "65%" }}
              disabled={booleans.loading}
              error={formik.touched.sicilno}
              // helperText={formik.errors.sicilno}
              autoComplete="off"
              name="sicilno"
              value={formik.values.sicilno}
              onChange={(event) => {
                keyboard.current.setInput(event.target.value);
                formik.handleChange(event);
              }}
              onFocus={(event) => {
                setInputName(event.currentTarget.name);
                setKeyboardLayout("numeric");
              }}
            />
          </div>
          <div className="row">
            <p>{t("password")}</p>
            <TextField
              sx={{ width: "65%" }}
              disabled={booleans.loading}
              error={formik.touched.password}
              // helperText={formik.errors.password}
              autoComplete="off"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={(event) => {
                keyboard.current.setInput(event.target.value);
                formik.handleChange(event);
              }}
              onFocus={(event) => {
                setInputName(event.currentTarget.name);
                setKeyboardLayout("normal");
              }}
            />
          </div>
          <div className="row">
            <p>{t("assemblyNo")}</p>
            <TextField
              disabled={booleans.loading}
              className="TextField"
              name="assembleno"
              error={formik.touched.assembleno}
              sx={{ minWidth: "65%" }}
              autoComplete="off"
              variant="outlined"
              placeholder="123"
              value={formik.values.assembleno}
              inputProps={{
                maxLength: 3,
              }}
              onChange={(event) => {
                keyboard.current.setInput(event.target.value);
                formik.handleChange(event);
              }}
              onFocus={(event) => {
                setInputName(event.currentTarget.name);
                setKeyboardLayout("numeric");
              }}
            />
          </div>
          <div
            id="shift"
            style={{
              //changing the background color considering the shift that has been selected
              backgroundColor:
                formik.values.shift == "M"
                  ? "#12a6eb"
                  : formik.values.shift == "B"
                  ? "#ffffff"
                  : formik.values.shift == "K" && "#ff0000",
              border: formik.values.shift == "B" && "0.1px solid black",
            }}
          >
            <p>{t("date")}</p>
            <CustomDatePicker
              disabled={booleans.loading}
              date={(date) => (formik.values.date = date)}
            />

            <p>{t("shift")}</p>
            <Select
              disabled={booleans.loading}
              name="shift"
              value={formik.values.shift}
              onChange={formik.handleChange}
            >
              {shifts.data &&
                shifts.data.map((shiftData) => {
                  return (
                    <MenuItem value={shiftData.shiftCode}>
                      {shiftData.shiftCode}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <div id="buttons">
            <LoadingButton
              loading={booleans.loading}
              type="submit"
              sx={{
                width: "100%",
                height: "70px",
                fontSize: "20px",
                marginTop: "5px",
                marginInline: "7px",
              }}
              variant="contained"
            >
              {t("login")}
            </LoadingButton>

            <Button
              disabled={booleans.loading}
              color="error"
              sx={{
                height: "70px",
                width: "100%",
                fontSize: "20px",
                marginTop: "5px",
                marginInline: "7px",
              }}
              href="/terminals"
              variant="contained"
            >
              {t("close")}
            </Button>
          </div>
          <VirtualKeyboard
            keyboard={keyboard}
            disabled={booleans.loading}
            layout={keyboardLayout}
            width={keyboardLayout != "numeric" ? "100%" : "50%"}
            helperText="false"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              boxShadow: "none",
            }}
            values={formik.values}
            setValues={formik.setValues}
            inputName={inputName}
          />
        </form>
      </div>
    </>
  );
}
