import {
  Backdrop,
  Button,
  Checkbox,
  FormControlLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { createRef, useEffect, useRef, useState } from "react";
import Countdown from "../Components/Countdown";
import DefectEntryImage from "../Components/DefectEntryImage";
import useGetData from "../Hooks/GetData";
import car1 from "../Resources/car-repair.jpg";
import "./ErrorEntry.css";
import Alarm from "../Resources/alarm.ogg";
import ReactCSSTransitionGroup from "react-transition-group";

export default function ErrorEntry() {
  const [timesUp, setTimesUp] = useState(false);
  const audioRef = useRef(null); //audio reference for playing the sound under a condition

  const screenData = useGetData("http://192.168.1.9:3001/screen", 1000); //getting image the data from the server
  const headerData = useGetData("http://192.168.1.9:3001/header", 1000); //getting the header data from the server

  const buttonStyleRight = {
    borderRadius: 2,
    minWidth: 250,
    minHeight: 70,
    borderColor: "black",
    color: "black",
    marginTop: 1,
    "&:hover": {
      borderColor: "black",
      boxShadow: "none",
      backgroundColor: "#bf9937",
    },
  };

  const buttonStyleBottom = {
    borderRadius: 2,
    width: 115,
    minHeight: 70,
    marginLeft: 1,
    borderColor: "black",
    color: "black",
    "&:hover": {
      borderColor: "black",
      boxShadow: "none",
      backgroundColor: "#bf9937",
    },
  };

  // if (audioRef.current != null) console.log(audioRef.current.paused);
  return (
    <div className={!timesUp ? "error-container" : "error-container-animated"}>
      <div className="error-box">
        <div className="row" style={{ width: "100%", margin: 0 }}>
          <div className="error-img-container">
            <header className="error-header">
              <h1 style={{ fontSize: "24px" }}>HATA GİRİŞ EKRANI</h1>
              <div
                className="row"
                style={{
                  marginRight: 0,
                  marginLeft: 0,
                  width: "auto",
                  height: "100%",
                  justifyContent: "right",
                }}
              >
                <div
                  className="column"
                  style={{
                    borderRight: "1px solid black",
                    borderLeft: "1px solid black",
                    borderLeftStyle: "dashed",
                    borderRightStyle: "dashed",
                  }}
                >
                  <h1>MONTAJ NO</h1>
                  <p>
                    {headerData.data ? (
                      headerData.data[0].assyNo
                    ) : (
                      <Skeleton variant="rectangular" width={70} height={20} />
                    )}
                  </p>
                </div>
                <div
                  className="column"
                  style={{
                    borderRight: "1px solid black",
                    borderRightStyle: "dashed",
                  }}
                >
                  <h1>BODY NO</h1>
                  <p>
                    {headerData.data ? (
                      headerData.data[0].bodyNo
                    ) : (
                      <Skeleton variant="rectangular" width={70} height={20} />
                    )}
                  </p>
                </div>
                {headerData.data ? (
                  <div
                    className="column"
                    style={{
                      marginLeft: "30px",
                      backgroundColor: headerData.data[0].bgColor,
                      // borderRight: "1px solid black",
                      // borderLeft: "1px solid black",
                    }}
                  >
                    <h1>RENK</h1>
                    <p>{headerData.data[0].extCode}</p>
                  </div>
                ) : (
                  <div
                    className="column"
                    style={{ borderRight: "1px solid black" }}
                  >
                    <h1>COLOR</h1>
                    <Skeleton variant="rectangular" width={70} height={20} />
                  </div>
                )}
              </div>
            </header>
            {screenData.data ? (
              <DefectEntryImage img={car1} data={screenData.data} />
            ) : (
              <Skeleton variant="rectangular" width={750} height={600} />
            )}
            <div
              className="row"
              style={{
                width: "100%",
                margin: 0,
                height: "70px",
                justifyContent: "left",
                marginTop: "5px",
              }}
            >
              <Button sx={buttonStyleBottom} variant="outlined">
                ÇIKIŞ
              </Button>
              <Button sx={buttonStyleBottom} variant="outlined">
                MODEL İLK RESMİ
              </Button>
              <Button sx={buttonStyleBottom} variant="outlined">
                &larr; GERİ
              </Button>
              <Button sx={buttonStyleBottom} variant="outlined">
                HATA LİSTESİ
              </Button>
              <Button sx={buttonStyleBottom} variant="outlined">
                TEMİZLE
              </Button>
              <Button sx={buttonStyleBottom} variant="outlined">
                BÜYÜK FONT
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
              position: "relative",
              marginBottom: 0,
            }}
          >
            <div
              className="column"
              style={{
                width: "100%",
                height: "9%",
                margin: 0,
                justifyContent: "center",
              }}
            >
              {headerData.data ? (
                <>
                  <h1
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {headerData.data[0].firstname} {headerData.data[0].lastname}
                  </h1>
                  <div
                    style={{
                      border: "1px solid black",
                      width: "50%",
                      borderRadius: "10px",
                    }}
                  >
                    {/* audio sound plays if the user does not enter an defect entry*/}
                    <audio ref={audioRef} loop>
                      <source src={Alarm}></source>
                    </audio>

                    <Countdown
                      time={10000}
                      size={20}
                      onTimesUp={(t) => {
                        if (t == 5000) {
                          // console.log("bitti");
                          setTimesUp(true);
                          audioRef.current.play();
                        }
                      }}
                    />
                  </div>
                </>
              ) : (
                <Skeleton variant="rectangular" width={300} height={40} />
              )}
            </div>
            <div
              className="column"
              style={{ height: "100%", justifyContent: "center" }}
            >
              <div
                className="row"
                style={{ width: "100%", justifyContent: "center", margin: 0 }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="HARIGAMI"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="RDD"
                />
              </div>
              <Button disabled={true} sx={buttonStyleRight} variant="outlined">
                HIZLI KAYDET
              </Button>
              <Button disabled={true} sx={buttonStyleRight} variant="outlined">
                KAYDET VE GEÇ
              </Button>
              <Button disabled={true} sx={buttonStyleRight} variant="outlined">
                HATA KAYIT
              </Button>
              <h1 style={{ marginTop: 4 }}>MONTAJ NO</h1>
              <TextField
                sx={{
                  borderRadius: 2,
                  minWidth: 250,
                }}
                value={
                  headerData.data != undefined ? headerData.data[0].assyNo : ""
                }
                disabled
              />
              <Button sx={buttonStyleRight} variant="outlined">
                ARA
              </Button>
              <Button sx={buttonStyleRight} variant="outlined">
                TERMINAL İLK RESMİ
              </Button>
              <Button sx={buttonStyleRight} variant="outlined">
                SIK GELEN HATA
              </Button>
              <Button sx={buttonStyleRight} variant="outlined">
                MANIFEST
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
