import React, { createRef, useEffect, useRef, useState } from "react";
import "./Login.css";
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  Alert,
  Skeleton,
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
import useGetDataOnce from "../Hooks/GetDataOnce";
import API from "../Resources/api.json";
import CustomTextField from "../Components/CustomTextField";

export default function LogIN() {
  const [depName, setDepName] = useState("");
  const [count, setCount] = React.useState(0);
  const [variables, setVariables] = useState({
    key: 0,
    logged: "none",
    loading: false,
    navigate: false,
  });

  const terminalList = useGetData(API.link + "/login", 500); //fetching terminals data
  const shifts = useGetData(API.link + "/shifts", 500); //fetching shift data

  let params = useParams();
  useGetDataOnce(API.link + "/terminals", 500, (response) => {
    //iterating thorugh data to find the correct terminal that matches with the parameters that we get from the link
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

  //test user informations to log into the system
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
    //the function that checks whether the user entered the right informations or not
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
    initialValues: {
      terminal: 82842,
      sicilno: "",
      password: "",
      assembleno: "770",
      shift: "M",
      date: new Date(),
    },
    onSubmit: (values) => {
      if (checkUser(values)) {
        setVariables({ ...variables, loading: true, logged: true });
        AlertFunction(true);
      } else {
        setVariables({ ...variables, loading: true, logged: false });
        AlertFunction(false);
      }
    },
  });

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

  const AlertFunction = (isLogged) => {
    if (isLogged == true) {
      setTimeout(() => {
        setVariables({ ...variables, navigate: true });
      }, 2000);
    }
    if (isLogged == false) {
      setTimeout(() => {
        setVariables({ ...variables, loading: false });
      }, 3000);
    }
  };

  return (
    <>
      {variables.navigate == true && (
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

      {variables.logged == true ? (
        <div className="alert">
          <Alert
            severity="success"
            sx={{ minWidth: "40%", justifyContent: "center" }}
          >
            Logged In
          </Alert>
        </div>
      ) : (
        variables.logged == false && (
          <div className="alert" key={variables.key}>
            <Alert
              severity="error"
              sx={{ minWidth: "40%", justifyContent: "center" }}
            >
              Invalid User
            </Alert>
          </div>
        )
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
            <p>Terminal Listesi</p>
            <DefectSelect
              disabled={count == 1 ? true : false}
              sx={{ width: "65%" }}
              data={terminalList.data}
              count={count}
              value={formik.values.terminal}
              onChange={formik.handleChange}
              name="terminal"
              menuItemName="termName"
            />
          </div>
          <div className="row">
            <p>Sicil No</p>
            <CustomTextField
              disabled={variables.loading}
              autoComplete="off"
              width="65%"
              name="sicilno"
              id="outlined-size-normal"
              setValues={formik.setValues}
              values={formik.values}
            />
          </div>
          <div className="row">
            <p>Şifre</p>
            <CustomTextField
              disabled={variables.loading}
              autoComplete="off"
              width="65%"
              name="password"
              id="outlined-size-normal"
              onFocus={() => {}}
              setValues={formik.setValues}
              values={formik.values}
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
                disabled={variables.loading}
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
                disabled={variables.loading}
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
              loading={variables.loading}
              type="submit"
              sx={{ width: "100%", height: "70px", margin: "15px" }}
              variant="contained"
            >
              Kaydet
            </LoadingButton>

            <Button
              disabled={variables.loading}
              color="error"
              sx={{ height: "70px", width: "100%", margin: "15px" }}
              href="/terminals"
              variant="contained"
            >
              Kapat
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
