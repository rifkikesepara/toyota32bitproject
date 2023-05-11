import * as React from "react";
import { useState, useEffect } from "react";
import { TableVirtuoso } from "react-virtuoso";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, CircularProgress } from "@mui/material";
import useAlert from "../Hooks/useAlert";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import CustomTextField from "./CustomTextField";
import CloseIcon from "@mui/icons-material/Close";

export default function VirtualTable(props) {
  const { t } = useTranslation();
  const [virtualTableData, setVirtualTableData] = useState();
  const [virtualTableDataTemp, setVirtualTableDataTemp] = useState();

  let scrollerTopRef = React.useRef(0);
  let sclrf = React.useRef(null);
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState({
    buttonId: 0,
    delete: false,
    save: false,
  });
  const [openFilterWindow, setOpenFilterWindow] = useState({
    open: false,
    filtered: false,
  });

  const [filter, setFilter] = useState("");

  function sort(column) {
    let sortingFactor;

    if (column.dataKey == "rgbCode") sortingFactor = "colorExtCode";
    else sortingFactor = column.dataKey;

    const data = virtualTableData.sort((a, b) => {
      return a[sortingFactor]
        .toString()
        .localeCompare(b[sortingFactor].toString());
    });
    setVirtualTableData(data);
    setLoading(!loading);
  }

  function deleteRow(row) {
    function filterToDelete(data) {
      return data.filter(({ cdate, formattedDefectHour }) => {
        return (
          formattedDefectHour != row.formattedDefectHour && cdate != row.cdate
        );
      });
    }

    setLoading({ ...loading, delete: false });
    if (virtualTableDataTemp) {
      const temprows = filterToDelete(virtualTableDataTemp);
      setVirtualTableDataTemp(temprows);
      const rows = filterToDelete(virtualTableData);
      setVirtualTableData(rows);
    } else {
      const rows = filterToDelete(props.data);
      setVirtualTableDataTemp(rows);
      setVirtualTableData(rows);
    }
  }

  const filterData = (value, filterName) => {
    // if (props.onFilters) props.onFilters(filter);

    let filterf;
    if (filterName) {
      filterf = filterName;
      setFilter({ ...filter, [filterName]: value[filterName] });
    } else filterf = openFilterWindow.name;

    setOpenFilterWindow({ ...openFilterWindow, filtered: true });
    props.isFiltered(true);
    // console.log(filter);
    let filteredRows;
    if (!virtualTableDataTemp) {
      setVirtualTableDataTemp(props.data);
      filteredRows = props.data.filter((data) => {
        return data[filterf]
          .toString()
          .toLowerCase()
          .includes(value[filterf].toLowerCase());
      });
    } else {
      console.log("burda");
      filteredRows = virtualTableDataTemp.filter((data) => {
        return data[filterf]
          .toString()
          .toLowerCase()
          .includes(value[filterf].toLowerCase());
      });
    }
    if (value == "") setVirtualTableData(virtualTableDataTemp);
    else setVirtualTableData(filteredRows);
    return filteredRows;
  };

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

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => {
      sclrf = ref;
      return <TableContainer component={Paper} {...props} ref={ref} />;
    }),
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
        {props.columns.map((column, _index) => (
          <>
            <TableCell
              key={column.dataKey}
              variant="head"
              align={"center"}
              style={{
                width: column.width,
                padding: 0,
                overflowX: "hidden",
                overflowY: "visible",
                cursor: "pointer",
                position: "relative",
              }}
              sx={{
                backgroundColor: "#ffb700",
              }}
            >
              <Button
                tabIndex={_index}
                sx={{
                  height: 60,
                  minWidth: "100%",
                  padding: 0,
                  color: "black",
                  fontSize: "0.8vw",
                  zIndex: "0",
                }}
                onClick={(e) => {
                  sort(column);
                }}
              >
                {column.label}
              </Button>
              {column.numeric && (
                <SearchIcon
                  sx={{
                    position: "absolute",
                    zIndex: "50000",
                    bottom: 0,
                    left: 0,
                  }}
                  onClick={() => {
                    setOpenFilterWindow({
                      ...openFilterWindow,
                      name: column.dataKey,
                      open: !openFilterWindow.open,
                    });
                    if (!filter[column.dataKey])
                      setFilter({ ...filter, [column.dataKey]: "" });
                    console.log(filter);
                    scrollerTopRef.current = sclrf.current.scrollTop;
                  }}
                />
              )}
            </TableCell>
          </>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {props.columns.map((column) => {
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
                contentAdjuster(column.dataKey, row, _index)
              )}
            </TableCell>
          );
        })}
      </React.Fragment>
    );
  }

  const contentAdjuster = (key, row, _index) => {
    switch (key.toString()) {
      case "nrReasonId":
        return (
          <div style={{ width: "100%" }}>
            <select
              disabled={loading.delete || loading.save || loading.refresh}
              style={{ width: "90%", height: "30px" }}
              name="example"
            >
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
              disabled={loading.delete || loading.save || loading.refresh}
              sx={{
                ...buttonStyle("red"),
                padding: 0,
                height: "90%",
                minWidth: "4.1vw",
              }}
              variant="contained"
            >
              <EditIcon />
            </Button>

            <LoadingButton
              loading={loading.delete && loading.buttonId == _index}
              disabled={loading.delete || loading.save || loading.refresh}
              sx={{
                ...buttonStyle("red"),
                minWidth: "5px",
                height: "90%",
                minWidth: "4.1vw",
                padding: 0,
              }}
              variant="contained"
              onClick={() => {
                setLoading({
                  ...loading,
                  delete: true,
                  buttonId: _index,
                });
                scrollerTopRef.current = sclrf.current.scrollTop;
                setAlert(t("deleteDefectAlert"), "success", 2000, () => {
                  deleteRow(row);
                });
              }}
            >
              <DeleteIcon />
            </LoadingButton>
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
              <LoadingButton
                loading={loading.save && loading.buttonId == _index}
                disabled={loading.save || loading.delete || loading.refresh}
                sx={{
                  ...buttonStyle("black"),
                  padding: 0,
                  height: "90%",
                  minWidth: "4.5vw",
                  fontSize: "10px",
                }}
                variant="contained"
                onClick={() => {
                  setLoading({
                    ...loading,
                    save: true,
                    buttonId: _index,
                  });
                  scrollerTopRef.current = sclrf.current.scrollTop;

                  setAlert(t("saveAlert"), "success", 3000, () => {
                    setLoading({ ...loading, save: false });
                  });
                }}
              >
                <SaveIcon />
              </LoadingButton>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (props.filterWord.bodyNo) {
      filterData({ bodyNo: props.filterWord.bodyNo }, "bodyNo");
    }
    if (props.filterWord.assyNo) {
      filterData({ bodyNo: props.filterWord.bodyNo }, "assyNo");
    }
  }, [props.filterWord]);

  return (
    <div style={{ height: props.height }}>
      <Paper
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#ffc840",
        }}
      >
        {props.data.length ? (
          <TableVirtuoso
            scrollerRef={(ref) => {
              props.setScrollerRef(sclrf);
              if (scrollerTopRef.current)
                sclrf.current.scrollTop = scrollerTopRef.current;
            }}
            style={props.style}
            data={virtualTableData ? virtualTableData : props.data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "black" }} size={"10rem"} />
          </div>
        )}
      </Paper>

      <div
        className="virtualTableTextFieldContainer"
        style={{
          marginTop: openFilterWindow.open ? 0 : -150,
        }}
      >
        <CustomTextField
          className="virtualTableTextField"
          onClose={() => {
            setOpenFilterWindow({ ...openFilterWindow, open: false });
          }}
          onChange={(value) => {
            filterData(value);
            props.onFilters(filter);
          }}
          onBlur={() =>
            setOpenFilterWindow({ ...openFilterWindow, open: false })
          }
          placeholder={openFilterWindow.name}
          kayboardLayout="normal"
          keyboardWidth="100%"
          keyboardSX={{
            bottom: "-85vh",
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            border: "1px solid black",
          }}
          width={100}
          name={openFilterWindow.name}
          setValues={setFilter}
          values={filter}
          iconPosition="rightInner"
        />
      </div>

      <p
        style={{
          border: "1px solid black",
          width: "100%",
          textAlign: "right",
          backgroundColor: "#ffc840",
          height: "auto",
        }}
      >
        {openFilterWindow.filtered && (
          <Button
            sx={{
              padding: "1px",
              color: "black",
              borderRadius: "100px",
              height: "20px",
              minWidth: "10px",
            }}
            onClick={() => {
              setOpenFilterWindow({ ...openFilterWindow, filtered: false });
              props.isFiltered(false);
              setVirtualTableData(virtualTableDataTemp);
              setFilter("");
            }}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </Button>
        )}
        <LoadingButton
          loading={loading.refresh}
          sx={{
            color: "black",
            borderRadius: "100px",
            height: "20px",
            minWidth: "20px",
          }}
          onClick={() => {
            setOpenFilterWindow({ ...openFilterWindow, filtered: false });
            setLoading({ ...loading, refresh: true });
            props.isRefreshed(Math.random());
            setAlert(t("refreshAlert"), "success", 2000, () => {
              setLoading({ ...loading, refresh: false });
              setVirtualTableData(props.data);
            });
            scrollerTopRef.current = sclrf.current.scrollTop;
          }}
        >
          <RefreshIcon sx={{ fontSize: "20px" }} />
        </LoadingButton>
        {t("totalRows")}:{" "}
        {virtualTableData ? virtualTableData.length : props.data.length}
      </p>
    </div>
  );
}
