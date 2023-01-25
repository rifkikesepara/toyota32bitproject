import React, { useEffect } from "react";
import axios from "axios";
import "./Login.css";
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import { color, width } from "@mui/system";

export default function LogIN() {
  const [terminalList, setTerminalList] = React.useState([]);
  const [terminals, setTerminals] = React.useState([]);
  const [id, setID] = React.useState("82842");
  const [count, setCount] = React.useState(0);
  const [shifts, setShifts] = React.useState([]);
  const [shift, setShift] = React.useState("M");
  const [date, setDate] = React.useState(new Date());
  const [bool, setBool] = React.useState(false);

  const handleChange = (event) => {
    setID(event.target.value);
  };

  let params = useParams();

  const object = <div>merhaba</div>;

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
      <section id="login-box">
        <div className="row">
          <p>Terminal Listesi</p>

          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <Select
              classes={"menu"}
              sx={{ m: 1, minWidth: 200 }}
              id="select"
              value={id}
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleChange}
              onOpen={() => setBool(true)}
              onClose={() => setBool(false)}
            >
              {terminalList.data &&
                terminalList.data.data.slice(0, count).map((prevdata) => {
                  return (
                    <MenuItem value={prevdata.termId}>
                      {prevdata.termName}
                    </MenuItem>
                  );
                })}
            </Select>
            {bool && (
              <Button className="menu" variant="contained">
                sağ
              </Button>
            )}
          </FormControl>
        </div>
        <div className="row">
          <p>Sicil No</p>
          <TextField
            sx={{ minWidth: 200 }}
            id="filled-basic"
            variant="filled"
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <p>Şifre</p>
          <TextField
            sx={{ minWidth: 200 }}
            id="filled-basic"
            variant="filled"
            placeholder="***********"
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <p>Montaj NO</p>
          <TextField
            sx={{ minWidth: 200 }}
            id="filled-basic"
            variant="filled"
            placeholder="123"
            inputProps={{ maxLength: 3, typeof: "numeric" }}
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
        </div>
        <div
          id="shift"
          style={{
            backgroundColor:
              shift == "M"
                ? "#12a6eb"
                : shift == "B"
                ? "#ffffff"
                : shift == "K" && "#ff0000",
          }}
        >
          <p>Tarih</p>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"tr"}>
            <DatePicker
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
                console.log(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <p>Vardiya</p>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shift}
              inputProps={{ "aria-label": "Without label" }}
              onChange={(event) => setShift(event.target.value)}
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
            sx={{ width: "100%", marginRight: "40px", height: "70px" }}
            variant="contained"
          >
            Giriş Yap
          </Button>
          <Button
            sx={{
              height: "70px",
              backgroundColor: "red",
              width: "100%",
              marginLeft: "40px",
              ":hover": { backgroundColor: "#6e0000" },
            }}
            href="/terminals"
            variant="contained"
          >
            Kapat
          </Button>
        </div>
      </section>
    </div>
  );
}
