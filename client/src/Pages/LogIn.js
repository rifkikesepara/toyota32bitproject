import React, { useState } from "react";
import "./Login.css";
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Skeleton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams, Navigate } from "react-router-dom";
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import { useFormik } from "formik";
import useGetData from "../Hooks/GetData";
import CustomSelect from "../Components/CustomSelect";
import useGetDataOnce from "../Hooks/GetDataOnce";
import API from "../Resources/api.json";
import CustomTextField from "../Components/CustomTextField";
import useAlert from "../Hooks/useAlert";
import { useTranslation } from "react-i18next";

export default function LogIN() {
  const { t } = useTranslation();
  const { setAlert } = useAlert();

  const [depName, setDepName] = useState("");
  const [count, setCount] = React.useState(0);
  const [variables, setVariables] = useState({
    key: 0,
    loading: false,
    navigate: false,
  });

  const terminalList = useGetData(API.link + "/login", 500); //fetching terminals data
  const shifts = useGetData(API.link + "/shifts", 500); //fetching shift data

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
      setVariables({ ...variables, loading: true });
      if (checkUser(values)) {
        setAlert(t("loginAlert"), "success", 3000, () => {
          setVariables({ ...variables, loading: true, navigate: true });
        });
      } else {
        setAlert(t("invalidUserAlert"), "error", 3000, () => {
          setVariables({ ...variables, loading: false });
        });
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

  return (
    <>
      {variables.navigate && (
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
              disabled={count == 1 || variables.loading ? true : false}
              sx={{ width: "65%", color: "black" }}
              data={terminalList.data}
              count={count}
              value={formik.values.terminal}
              onChange={formik.handleChange}
              name="terminal"
              menuItemName="termName"
            />
          </div>
          <div className="row">
            <p>{t("regNumber")}</p>
            <CustomTextField
              disabled={variables.loading}
              autoComplete="off"
              width="65%"
              name="sicilno"
              id="outlined-size-normal"
              setValues={formik.setValues}
              values={formik.values}
              iconPosition="rightInner"
            />
          </div>
          <div className="row">
            <p>{t("password")}</p>
            <CustomTextField
              disabled={variables.loading}
              autoComplete="off"
              width="65%"
              name="password"
              id="outlined-size-normal"
              setValues={formik.setValues}
              values={formik.values}
              iconPosition="rightInner"
            />
          </div>
          <div className="row">
            <p>{t("assemblyNo")}</p>
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
            <p>{t("date")}</p>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"tr"}
            >
              <MobileDatePicker
                orientation="landscape"
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

            <p>{t("shift")}</p>
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
              sx={{
                width: "100%",
                height: "70px",
                margin: "15px",
                fontSize: "20px",
              }}
              variant="contained"
            >
              {t("login")}
            </LoadingButton>

            <Button
              disabled={variables.loading}
              color="error"
              sx={{
                height: "70px",
                width: "100%",
                margin: "15px",
                fontSize: "20px",
              }}
              href="/terminals"
              variant="contained"
            >
              {t("close")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
