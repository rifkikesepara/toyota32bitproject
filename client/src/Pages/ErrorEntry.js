import {
  Button,
  Checkbox,
  FormControlLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetData from "../Hooks/GetData";
import car1 from "../Resources/car-repair.jpg";
import "./ErrorEntry.css";

export default function ErrorEntry() {
  const screenData = useGetData("http://192.168.1.9:3001/screen", 1000);
  const headerData = useGetData("http://192.168.1.9:3001/header", 1000);

  console.log(headerData.data);

  return (
    <div className="error-container">
      <div className="error-box">
        <div className="row" style={{ width: "100%", margin: 0 }}>
          <div className="error-header">
            <header
              style={{
                width: "100%",
                height: "9%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 style={{ fontSize: "24px" }}>HATA GİRİŞ EKRANI</h1>
              <div className="row" style={{ width: "65%", height: "100%" }}>
                <div className="column" style={{ border: "2px solid red" }}>
                  <h1>MONTAJ NO</h1>
                  <p>
                    {headerData.data != undefined ? (
                      headerData.data[0].assyNo
                    ) : (
                      <Skeleton variant="rectangular" width={140} height={20} />
                    )}
                  </p>
                </div>
                <div className="column">
                  <h1>BODY NO</h1>
                  <p>313131</p>
                </div>
                <div className="column">
                  <h1>COLOR</h1>
                  <p>3U5</p>
                </div>
              </div>
            </header>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                }}
              >
                <h1>Test</h1>
              </div>
              <img src={car1} width="750px" height="750px" />
            </div>
          </div>
          <div
            className="column"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <h1 style={{ textAlign: "center" }}>YUSUF BAŞBUĞ</h1>
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
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
                HIZLI KAYDET
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  marginTop: 1,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
                KAYDET VE GEÇ
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  marginTop: 1,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
                HATA KAYIT
              </Button>
              <h1 style={{ marginTop: 4 }}>MONTAJ NO</h1>
              <TextField
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                }}
                value={
                  headerData.data != undefined ? headerData.data[0].assyNo : ""
                }
                disabled
              />
              <Button
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  marginTop: 1,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
                ARA
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  marginTop: 1,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
                TERMINAL İLK RESMİ
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  marginTop: 1,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
                SIK GELEN HATA
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  minWidth: 300,
                  minHeight: 70,
                  marginTop: 1,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                variant="outlined"
              >
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
          <Button
            sx={{
              borderRadius: 2,
              width: 115,
              minHeight: 70,
              marginLeft: 1,
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                boxShadow: "none",
              },
            }}
            variant="outlined"
          >
            ÇIKIŞ
          </Button>
          <Button
            sx={{
              borderRadius: 2,
              width: 115,
              minHeight: 70,
              marginLeft: 1,
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                boxShadow: "none",
              },
            }}
            variant="outlined"
          >
            MODEL İLK RESMİ
          </Button>
          <Button
            sx={{
              borderRadius: 2,
              width: 115,
              minHeight: 70,
              marginLeft: 1,
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                boxShadow: "none",
              },
            }}
            variant="outlined"
          >
            - GERİ
          </Button>
          <Button
            sx={{
              borderRadius: 2,
              width: 115,
              minHeight: 70,
              marginLeft: 1,
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                boxShadow: "none",
              },
            }}
            variant="outlined"
          >
            HATA LİSTESİ
          </Button>
          <Button
            sx={{
              borderRadius: 2,
              width: 115,
              minHeight: 70,
              marginLeft: 1,
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                boxShadow: "none",
              },
            }}
            variant="outlined"
          >
            TEMİZLE
          </Button>
          <Button
            sx={{
              borderRadius: 2,
              width: 115,
              minHeight: 70,
              marginLeft: 1,
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                boxShadow: "none",
              },
            }}
            variant="outlined"
          >
            BÜYÜK FONT
          </Button>
        </div>
      </div>
    </div>
  );
}
