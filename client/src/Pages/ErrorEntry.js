import {
  Button,
  Checkbox,
  FormControlLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Countdown from "../Components/Countdown";
import DefectEntryImage from "../Components/DefectEntryImage";
import useGetData from "../Hooks/GetData";
import car1 from "../Resources/car-repair.jpg";
import "./ErrorEntry.css";

export default function ErrorEntry() {
  const screenData = useGetData("http://192.168.1.9:3001/screen", 1000);
  const headerData = useGetData("http://192.168.1.9:3001/header", 1000);

  console.log(headerData.data);

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

  return (
    <div className="error-container">
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
                  style={{ borderRight: "1px solid black" }}
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
                      backgroundColor: headerData.data[0].bgColor,
                      borderRight: "1px solid black",
                    }}
                  >
                    <h1>COLOR</h1>
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
            <DefectEntryImage img={car1} />
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
                    <Countdown time={180} size={20} />
                  </div>
                </>
              ) : (
                <Skeleton variant="rectangular" width={300} height={40} />
              )}
            </div>
            <div
              className="column"
              style={{ height: "750px", justifyContent: "center" }}
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
                color="primary"
                className="button"
                sx={buttonStyleRight}
                variant="outlined"
              >
                HIZLI KAYDET
              </Button>
              <Button sx={buttonStyleRight} variant="outlined">
                KAYDET VE GEÇ
              </Button>
              <Button sx={buttonStyleRight} variant="outlined">
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
        <div
          className="row"
          style={{
            width: "100%",
            margin: 0,
            height: "100%",
            justifyContent: "left",
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
    </div>
  );
}
