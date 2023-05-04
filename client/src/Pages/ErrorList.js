import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import useGetDataOnce from "../Hooks/GetDataOnce";
import { Button, Skeleton, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
import API from "../Resources/api.json";
import CustomTextField from "../Components/CustomTextField";

export default function ErrorList() {
  const tableRef = useRef(null);
  const scrollerIndex = useRef(0);

  const columns = [
    {
      width: 45,
      label: "Bildiren",
      dataKey: "depCode",
      numeric: true,
    },
    {
      width: 45,
      label: "Body",
      dataKey: "bodyNo",
      numeric: true,
    },
    {
      width: 30,
      label: "Assy",
      dataKey: "asyNo",
      numeric: true,
    },
    {
      width: 100,
      label: "Vin No",
      dataKey: "vinNo",
      numeric: true,
    },
    {
      width: 50,
      label: "Renk",
      dataKey: "rgbCode",
      numeric: false,
    },
    {
      width: 30,
      label: "Mdl",
      dataKey: "modelCode",
      numeric: true,
    },
    {
      width: 50,
      label: "Sicil",
      dataKey: "localId",
      numeric: true,
    },
    {
      width: 150,
      label: "Parça",
      dataKey: "partName",
      numeric: true,
    },
    {
      width: 30,
      label: "Spot",
      dataKey: "spotId",
      numeric: true,
    },
    {
      width: 30,
      label: "Gun",
      dataKey: "spotgunId",
      numeric: true,
    },
    {
      width: 30,
      label: "Arc",
      dataKey: "arcnutboltCode",
      numeric: true,
    },
    {
      width: 40,
      label: "ArcGun",
      dataKey: "arcnutboltgunName",
      numeric: true,
    },
    {
      width: 100,
      label: "Hata",
      dataKey: "defectName",
      numeric: true,
    },
    {
      width: 80,
      label: "Rank",
      dataKey: "defrankCode",
      numeric: true,
    },
    {
      width: 80,
      label: "Saat",
      dataKey: "formattedDefectHour",
      numeric: true,
    },
    {
      width: 80,
      label: "Hata Türü",
      dataKey: "defectType",
      numeric: true,
    },
    {
      width: 80,
      label: "Hata Sor",
      dataKey: "defrespName",
      numeric: true,
    },
    {
      width: 80,
      label: "Alt Sorumlu",
      dataKey: "defrespCode",
      numeric: true,
    },
    {
      width: 80,
      label: "NR REASON",
      dataKey: "nrReasonId",
      numeric: false,
    },
    {
      width: 80,
      label: "KAYDET",
      dataKey: "save",
      numeric: false,
    },
    {
      width: 120,
      label: "İŞLEM",
      dataKey: "edit",
      numeric: false,
    },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ margin: 0, borderCollapse: "collapse", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={"center"}
            style={{
              width: column.width,
              paddingInline: 0,
              overflow: "hidden",
            }}
            sx={{
              backgroundColor: "#ffb700",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column, i) => {
          return (
            <TableCell
              key={column.dataKey}
              align={"center"}
              style={{
                padding: 0,
                overflow: "hidden",
                height: "80px",
                backgroundColor: _index % 2 == 0 ? "#ffc840" : "#d8aa36",
              }}
            >
              {column.numeric ? (
                <div
                  style={
                    column.dataKey == "rgbCode"
                      ? {
                          backgroundColor: row[column.dataKey],
                          borderRadius: "10px",
                          color:
                            row[column.dataKey] == "#000000"
                              ? "white"
                              : "black",
                        }
                      : {}
                  }
                >
                  {column.dataKey == "rgbCode"
                    ? row["colorExtCode"]
                    : row[column.dataKey]}
                </div>
              ) : (
                contentAdjuster(column.dataKey, row)
              )}
            </TableCell>
          );
        })}
      </React.Fragment>
    );
  }
  const contentAdjuster = (key, row) => {
    switch (key.toString()) {
      case "nrReasonId":
        return (
          <div style={{ width: "100%" }}>
            <select style={{ width: "90%", height: "30px" }} name="example">
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="-">Other</option>
            </select>
          </div>
        );
      case "rgbCode":
        return (
          <div
            style={{
              backgroundColor: row["rgbCode"],
              borderRadius: "5px",
              color: row["rgbCode"] == "#000000" ? "white" : "black",
              fontSize: "20px",
              paddingBlock: "4px",
              marginInline: "3px",
            }}
          >
            {row["colorExtCode"]}
          </div>
        );
      case "edit":
        return (
          <div
            className="row"
            style={{
              margin: 0,
              padding: 0,
              height: "100%",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Button
              sx={{
                ...buttonStyle("red"),
                minWidth: "50px",
                height: "90%",
                marginRight: "2px",
              }}
              variant="contained"
            >
              <EditIcon />
            </Button>
            <Button
              sx={{
                ...buttonStyle("red"),
                minWidth: "5px",
                height: "90%",
                marginLeft: "2px",
              }}
              variant="contained"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      case "save":
        return (
          <div style={{ width: "100%", height: "100%" }}>
            <div
              className="row"
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  ...buttonStyle("black"),
                  height: "90%",
                  fontSize: "10px",
                }}
                variant="contained"
              >
                <SaveIcon />
              </Button>
            </div>
          </div>
        );
    }
  };

  const [errorList, setErrorList] = useState([]);
  const [filteredErrorList, setFilteredErrorList] = useState([]);
  const [filterWord, setFilterWord] = useState({ filter: "" });
  const [bool, setbool] = useState({ refresh: false, dataFetched: false });

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

  const filterData = (filter, key) => {
    const filteredRows = errorList.filter((data) => {
      switch (key) {
        case "bodyNo":
          return data.bodyNo == filter;
        case "assyNo":
          return data.assyNo == filter;
      }
    });
    setFilteredErrorList(filteredRows);
    if (filter == "") setFilteredErrorList(errorList);
    return filteredRows;
  };

  let params = useParams();
  useGetDataOnce(API.link + "/errList", bool.refresh, (data) => {
    // const depcodeErrorList = data.data[0].defectList.filter((data) => {
    //   return data.depCode == params.depCode;
    // });
    const depcodeErrorList = data.data[0].defectList;
    setErrorList(depcodeErrorList);
    setFilteredErrorList(depcodeErrorList);
    setbool({ ...bool, dataFetched: true });
  });

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "80%" }}>
        <Paper
          style={{ height: "100%", width: "100%", backgroundColor: "#ffc840" }}
        >
          {filteredErrorList.length ? (
            <TableVirtuoso
              style={{ backgroundColor: "#ffc840" }}
              ref={tableRef}
              data={errorList && filteredErrorList}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          ) : !bool.dataFetched ? (
            <></>
          ) : (
            <div className="column" style={{ backgroundColor: "#ffc840" }}>
              <h1>No data found</h1>
            </div>
          )}
        </Paper>
        <p
          style={{
            border: "1px solid black",
            width: "100%",
            textAlign: "right",
            backgroundColor: "#ffc840",
            height: "auto",
          }}
        >
          Total Rows: {errorList.length}
        </p>
      </div>

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
            style={{
              width: "100%",
              margin: 0,
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ width: "100%" }}>MONTAJ NO</h2>
            <div
              className="row"
              style={{ margin: 0, width: "75%", justifyContent: "right" }}
            >
              <TextField
                sx={{
                  minWidth: 200,
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  ...buttonStyle("white"),
                  height: 60,
                  width: "100px",
                  marginInline: "5px",
                }}
              >
                ARA
              </Button>
            </div>
          </div>
          <div
            className="row"
            style={{
              width: "100%",
              margin: 0,
            }}
          >
            <h2 style={{ width: "100%" }}>BODY NO</h2>
            <div
              className="row"
              style={{ margin: 0, width: "75%", justifyContent: "right" }}
            >
              <CustomTextField
                sx={{
                  width: 200,
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
                width={200}
                onChange={(event) => {
                  if (filterWord.filter.length <= 1) filterData("", "bodyNo");
                }}
                name="filter"
                setValues={setFilterWord}
                values={filterWord}
                iconPosition="rightInner"
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
                  scrollerIndex.current = 0;
                  filterData(filterWord.filter, "bodyNo");
                }}
              >
                ARA
              </Button>
            </div>
          </div>
        </div>
        <div
          className="column"
          style={{ margin: 0, justifyContent: "center", width: "10%" }}
        >
          <Button
            className="name"
            variant="contained"
            onClick={() => {
              if (scrollerIndex.current - 5 >= 5) scrollerIndex.current -= 5;
              else scrollerIndex.current = 0;
              tableRef.current.scrollToIndex({
                index: scrollerIndex.current,
                behavior: "smooth",
              });
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
              if (scrollerIndex.current + 5 <= filteredErrorList.length - 5)
                scrollerIndex.current += 5;
              else scrollerIndex.current = filteredErrorList.length - 5;
              tableRef.current.scrollToIndex({
                index: scrollerIndex.current,
                behavior: "smooth",
              });
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
            width: "55%",
            marginLeft: "5px",
          }}
        >
          <Button
            sx={{
              ...buttonStyle("white"),
              width: "14.28%",
              height: "85%",
            }}
          >
            ARAÇ LİSTESİ
          </Button>
          <Button
            sx={{
              ...buttonStyle("white"),
              width: "14.28%",
              height: "85%",
            }}
          >
            MANUEL HATA
          </Button>
          <Button
            sx={{
              ...buttonStyle("white"),
              width: "14.28%",
              height: "85%",
            }}
          >
            ÇOKLU HATA
          </Button>
          <Button
            sx={{
              ...buttonStyle("white"),
              width: "14.28%",
              height: "85%",
            }}
          >
            HATA LİSTESİ
          </Button>
          <Button
            sx={{
              ...buttonStyle("white"),
              width: "14.28%",
              height: "85%",
            }}
          >
            HATA KOPYA
          </Button>
          <Button
            sx={{
              ...buttonStyle("white"),
              width: "14.28%",
              height: "85%",
            }}
            href="/terminals"
          >
            ÇIKIŞ
          </Button>
          <Button
            sx={{
              color: "black",
              borderRadius: "100px",
            }}
            onClick={async () => {
              setbool({ ...bool, refresh: !bool.refresh });

              setTimeout(() => {
                tableRef.current.scrollToIndex({
                  index: scrollerIndex.current,
                  behavior: "smooth",
                });
              }, 300);
            }}
          >
            <RefreshIcon sx={{ fontSize: "50px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
