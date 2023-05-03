import {
  Button,
  Checkbox,
  FormControlLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Countdown from "../Components/Countdown";
import DefectEntryImage from "../Components/DefectEntryImage";
import useGetData from "../Hooks/GetData";
import car1 from "../Resources/car-repair.jpg";
import car2 from "../Resources/car2.jpg";
import "./ErrorEntry.css";
import Alarm from "../Resources/alarm.ogg";
import useGetDataOnce from "../Hooks/GetDataOnce";
import BigFont from "./BigFont";
import ErrorLog from "../Components/ErrorLog";
import { Navigate, useParams } from "react-router-dom";
import API from "../Resources/api.json";

export default function ErrorEntry() {
  let remainingTime = useRef(90000);
  let params = useParams();

  console.log(params.depCode);

  const [booleans, setBooleans] = useState({
    errorLog: false,
    timesUp: false, //boolean to play audio after the time's up
    bigFont: false, //boolean to switch bigfont mode
    showErrorList: false, //boolean to navigate Error List page
  });

  console.log(booleans);
  const [selectedDefect, setSelectedDefect] = useState();
  const audioRef = useRef(null); //audio reference for playing the sound under a condition

  const [picture, setPicture] = useState(71835);

  //image's sources and ids
  const [images] = useState([
    { id: 71835, img: car1, data: API.link + "/screen" },
    { id: 87897, img: car2, data: API.link + "/defectselect" },
  ]);

  //A function to adjust images with their id's
  function autoArrangewithID() {
    let pic;
    images.map((image) => {
      if (picture == image.id) pic = image.data;
    });
    return pic;
  }

  const [screenData, setScreenData] = useState([]);
  useGetData(autoArrangewithID(), 1000, setScreenData); //getting image data from the server
  const headerData = useGetDataOnce(API.link + "/header", 1000); //getting the header data from the server

  //button styling function to customize button on the error entry panel
  const buttonStyle = (width, height) => {
    return {
      borderRadius: 2,
      width: width,
      height: height,
      borderColor: "black",
      color: "black",
      // marginTop: 1,
      "&:hover": {
        borderColor: "black",
        boxShadow: "none",
        backgroundColor: "#bf9937",
      },
    };
  };

  // if (audioRef.current != null) console.log(audioRef.current.paused);
  if (booleans.bigFont)
    return <BigFont time={remainingTime} bigFont={setBooleans}></BigFont>;
  else {
    return (
      <div
        className={
          !booleans.timesUp ? "error-container" : "error-container-animated"
        }
      >
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
                        <Skeleton
                          variant="rectangular"
                          width={70}
                          height={20}
                          animation="wave"
                        />
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
                        <Skeleton
                          variant="rectangular"
                          width={70}
                          height={20}
                          animation="wave"
                        />
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
                      style={{
                        marginLeft: "30px",
                      }}
                    >
                      <h1>RENK</h1>
                      <Skeleton
                        variant="rectangular"
                        width={70}
                        height={20}
                        animation="wave"
                      />
                    </div>
                  )}
                </div>
              </header>
              {screenData.data ? (
                images.map((prev) => {
                  if (prev.id == picture) {
                    return (
                      <DefectEntryImage
                        img={prev.img}
                        data={screenData.data}
                        setPicture={setPicture}
                        setData={setScreenData}
                        setSelectedDefect={setSelectedDefect}
                      />
                    );
                  }
                })
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={750}
                  height={600}
                  animation="wave"
                />
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
                <Button
                  sx={{ ...buttonStyle(115, 70), marginLeft: 1 }}
                  variant="outlined"
                  href="/terminals"
                >
                  ÇIKIŞ
                </Button>
                <Button
                  sx={{ ...buttonStyle(115, 70), marginLeft: 1 }}
                  variant="outlined"
                >
                  MODEL İLK RESMİ
                </Button>
                <Button
                  sx={{ ...buttonStyle(115, 70), marginLeft: 1 }}
                  variant="outlined"
                  onClick={() => {
                    if (picture != 71835) {
                      setScreenData([]);
                      setPicture(screenData.data[0].motherPictureId);
                      setSelectedDefect();
                    }
                  }}
                >
                  &larr; GERİ
                </Button>
                <Button
                  sx={{ ...buttonStyle(115, 70), marginLeft: 1 }}
                  variant="outlined"
                  onClick={() =>
                    setBooleans({ ...booleans, showErrorList: true })
                  }
                  href={`/terminal/defcorrect/${params.depCode}/${params.filterCode}`}
                >
                  HATA LİSTESİ
                </Button>
                <Button
                  sx={{ ...buttonStyle(115, 70), marginLeft: 1 }}
                  variant="outlined"
                >
                  TEMİZLE
                </Button>
                <Button
                  sx={{ ...buttonStyle(115, 70), marginLeft: 1 }}
                  variant="outlined"
                  onClick={() => setBooleans({ ...booleans, bigFont: true })}
                >
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
                      {headerData.data[0].firstname}{" "}
                      {headerData.data[0].lastname}
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
                        time={remainingTime.current}
                        size={20}
                        onTimesUp={(t) => {
                          // console.log(t / 1000);
                          remainingTime.current = t / 1000;
                          if (t == 5000) {
                            // console.log("bitti");
                            setBooleans({ ...booleans, timesUp: true });
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
                <Button
                  disabled={selectedDefect ? false : true}
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                >
                  HIZLI KAYDET
                </Button>
                <Button
                  disabled={selectedDefect ? false : true}
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                >
                  KAYDET VE GEÇ
                </Button>
                <Button
                  disabled={selectedDefect ? false : true}
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                  onClick={() => {
                    setBooleans({ ...booleans, errorLog: true });
                  }}
                >
                  HATA KAYIT
                </Button>

                <ErrorLog open={booleans.errorLog} openFunc={setBooleans} />
                <h1 style={{ marginTop: 4 }}>MONTAJ NO</h1>
                <TextField
                  sx={{
                    borderRadius: 2,
                    minWidth: 250,
                  }}
                  value={
                    headerData.data != undefined
                      ? headerData.data[0].assyNo
                      : ""
                  }
                />
                <Button
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                >
                  ARA
                </Button>
                <Button
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                >
                  TERMINAL İLK RESMİ
                </Button>
                <Button
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                >
                  SIK GELEN HATA
                </Button>
                <Button
                  sx={{ ...buttonStyle(250, 70), marginTop: 1 }}
                  variant="outlined"
                >
                  MANIFEST
                </Button>
              </div>
            </div>
          </div>
          <h2 style={{ margin: 0 }}>{selectedDefect}</h2>
        </div>
      </div>
    );
  }
}
