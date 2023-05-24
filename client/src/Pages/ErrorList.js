import * as React from "react";
import { useState, useRef } from "react";
import useGetDataOnce from "../Hooks/GetDataOnce";
import { Button } from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
import API from "../Resources/api.json";
import CustomTextField from "../Components/CustomTextField";
import VirtualTable from "../Components/VirtualTable";
import { useTranslation } from "react-i18next";
import "./ErrorList.css";

export default function ErrorList() {
  const { t } = useTranslation(); //getting context for the localization on the page

  const [defectList, setDefectList] = useState([]);
  const [filterWord, setFilterWord] = useState({ bodyNo: "", assyNo: "" }); //filter words to filter table data outside of the component
  const [refresh, setRefresh] = useState(false); //refresh state to fetch data again when it's changed

  let params = useParams(); //getting params from the link to filter the data according to department
  useGetDataOnce(API.link + "/errList", refresh, (data) => {
    // const depcodeErrorList = data.data[0].defectList.filter((data) => {
    //   return data.depCode == params.depCode;
    // });

    const depcodeErrorList = data.data[0].defectList;
    setTimeout(() => {
      setDefectList(depcodeErrorList);
    }, 1000); //fetching data after waiting 1 second
  });

  let scrolledTop = useRef(0); //the reference number to store how much the table's scroll scrolled from the top
  let scrollerRef = useRef(); //the reference to the table's scroll object

  //the function to scroll up or down according to offset value
  const scroll = (off) => {
    let offset = scrollerRef.current.scrollTop;
    if (off < 0) offset += 500;
    if (off > 0) offset -= 500;

    scrollerRef.current.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  //table columns to be shown up on the table
  const columns = [
    {
      width: "4.2%",
      label: t("notifier").toUpperCase(),
      dataKey: "depCode",
      numeric: true,
    },
    {
      width: "3.0%",
      label: "Body",
      dataKey: "bodyNo",
      numeric: true,
    },
    {
      width: "2.0%",
      label: "Assy",
      dataKey: "asyNo",
      numeric: true,
    },
    {
      width: "4.7%",
      label: "Vin No",
      dataKey: "vinNo",
      numeric: true,
    },
    {
      width: "4.2%",
      label: t("color").toUpperCase(),
      dataKey: "rgbCode",
      numeric: false,
    },
    {
      width: "3.2%",
      label: "Mdl",
      dataKey: "modelCode",
      numeric: true,
    },
    {
      width: "4.5%",
      label: t("regestery").toUpperCase(),
      dataKey: "localId",
      numeric: true,
    },
    {
      width: "10.4%",
      label: t("part").toUpperCase(),
      dataKey: "partName",
      numeric: true,
    },
    {
      width: "3.0%",
      label: "Spot",
      dataKey: "spotId",
      numeric: true,
    },
    {
      width: "3.5%",
      label: "Gun",
      dataKey: "spotgunId",
      numeric: true,
    },
    {
      width: "3%",
      label: "Arc",
      dataKey: "arcnutboltCode",
      numeric: true,
    },
    {
      width: "2.7%",
      label: "ArcGun",
      dataKey: "arcnutboltgunName",
      numeric: true,
    },
    {
      width: "9.1%",
      label: t("defect").toUpperCase(),
      dataKey: "defectName",
      numeric: true,
    },
    {
      width: "2.5%",
      label: "Rank",
      dataKey: "defrankCode",
      numeric: true,
    },
    {
      width: "4.7%",
      label: t("time").toUpperCase(),
      dataKey: "formattedDefectHour",
      numeric: true,
    },
    {
      width: "4.7%",
      label: t("defectType").toUpperCase(),
      dataKey: "defectType",
      numeric: true,
    },
    {
      width: "4.7%",
      label: t("defectResponsibleShort").toUpperCase(),
      dataKey: "defrespName",
      numeric: true,
    },
    {
      width: "4.7%",
      label: t("otherResponsible").toUpperCase(),
      dataKey: "defrespCode",
      numeric: true,
    },
    {
      width: "4.7%",
      label: "NR REASON",
      dataKey: "nrReasonId",
      numeric: false,
    },
    {
      width: "5.4%",
      label: t("save").toUpperCase(),
      dataKey: "save",
      numeric: false,
    },
    {
      width: "8.8%",
      label: t("operation").toUpperCase(),
      dataKey: "edit",
      numeric: false,
    },
  ];

  //the function to style the buttons
  const buttonStyle = (color) => {
    return {
      backgroundColor: color,
      color: color == "white" ? "black" : "white",
      boxShadow: "none",
      border: "1px solid black",
      "&:hover": {
        borderColor: "black",
        boxShadow: "none",
        backgroundColor: color,
      },
    };
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <VirtualTable
          style={{ backgroundColor: "#ffc840" }}
          setScrollerRef={(ref) => {
            scrollerRef = ref;
          }}
          data={defectList}
          columns={columns}
          height="80%"
          scrolledTop={scrolledTop}
          isRefreshed={setRefresh}
          isFiltered={(bool) => {
            if (!bool) setFilterWord({ bodyNo: "", assyNo: "" });
          }}
          filterWord={filterWord}
        />
        <div
          className="row"
          style={{
            margin: 0,
            width: "100%",
            height: "18%",
            position: "absolute",
            bottom: 0,
            justifyContent: "space-around",
          }}
        >
          <div
            className="column"
            style={{ justifyContent: "space-evenly", width: "auto" }}
          >
            <div
              className="row"
              style={{ margin: 0, width: "100%", justifyContent: "center" }}
            >
              <CustomTextField
                placeholder={t("assemblyNo").toUpperCase()}
                kayboardLayout="numeric"
                keyboardWidth="25%"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
                keyboardSX={{ bottom: 0 }}
                width={200}
                name="filterNo"
                setValues={setFilterWord}
                values={filterWord}
                iconPosition="right"
              />
              <Button
                variant="contained"
                sx={{
                  ...buttonStyle("white"),
                  height: 60,
                  width: "100px",
                  marginInline: "5px",
                }}
                onClick={() => setFilterWord(filterWord)}
              >
                {t("search").toUpperCase()}
              </Button>
            </div>

            <div
              className="row"
              style={{ margin: 0, width: "100%", justifyContent: "center" }}
            >
              <CustomTextField
                keyboardSX={{ bottom: 0 }}
                kayboardLayout="numeric"
                keyboardWidth="25%"
                placeholder={t("bodyNo").toUpperCase()}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
                width={200}
                name="bodyNo"
                setValues={setFilterWord}
                values={filterWord}
                iconPosition="right"
              />
              <Button
                variant="contained"
                sx={{
                  ...buttonStyle("white"),
                  height: 60,
                  width: "100px",
                  marginInline: "5px",
                }}
                onClick={() => {
                  setFilterWord(filterWord);
                }}
              >
                {t("search").toUpperCase()}
              </Button>
            </div>
          </div>
          <div
            className="column"
            style={{ margin: 0, justifyContent: "center", width: "10%" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                scroll(+5);
              }}
              sx={{
                ...buttonStyle("red"),
                width: "100%",
                height: "45%",
                marginBottom: "1px",
                border: "none",
                borderRadius: 0,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}
            >
              <ArrowIcon style={{ transform: "rotate(-90deg)" }} />
            </Button>
            <Button
              onClick={() => {
                scroll(-5);
              }}
              sx={{
                ...buttonStyle("red"),
                width: "100%",
                height: "45%",
                marginBottom: "1px",
                borderRadius: 0,
                border: "none",
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
              }}
            >
              <ArrowIcon style={{ transform: "rotate(90deg)" }} />
            </Button>
          </div>
          <div
            className="row"
            style={{
              height: "100%",
              margin: 0,
              width: "60%",
              marginLeft: "5px",
            }}
          >
            <Button
              sx={{
                ...buttonStyle("white"),
                width: "16.6%",
                height: "85%",
              }}
            >
              {t("vehicleList").toUpperCase()}
            </Button>
            <Button
              sx={{
                ...buttonStyle("white"),
                width: "16.6%",
                height: "85%",
              }}
            >
              {t("manuelDefect").toUpperCase()}
            </Button>
            <Button
              sx={{
                ...buttonStyle("white"),
                width: "16.6%",
                height: "85%",
              }}
            >
              {t("multipleDefect").toUpperCase()}
            </Button>
            <Button
              sx={{
                ...buttonStyle("white"),
                width: "16.6%",
                height: "85%",
              }}
            >
              {t("defectList").toUpperCase()}
            </Button>
            <Button
              sx={{
                ...buttonStyle("white"),
                width: "16.6%",
                height: "85%",
              }}
            >
              {t("defectCopy").toUpperCase()}
            </Button>
            <Button
              sx={{
                ...buttonStyle("white"),
                width: "16.6%",
                height: "85%",
              }}
              href="/terminals"
            >
              {t("quit").toUpperCase()}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
