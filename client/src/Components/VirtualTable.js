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
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  NativeSelect,
  Select,
} from "@mui/material";
import useAlert from "../Hooks/useAlert";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import CustomTextField from "./CustomTextField";
import CloseIcon from "@mui/icons-material/Close";
import useGetDataOnce from "../Hooks/GetDataOnce";
import API from "../Resources/api.json";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function VirtualTable(props) {
  const { t } = useTranslation(); //getting context for the localization
  const { setAlert } = useAlert(); //getting context to execute alerts

  const [nrReasonData, setNrReasonData] = useState([]);
  useGetDataOnce(API.link + "/errList", true, (data) => {
    setNrReasonData(data.data[0].nrReasonList);
  });
  const [virtualTableData, setVirtualTableData] = useState(); //the main data that will be shown on the table
  const [virtualTableDataTemp, setVirtualTableDataTemp] = useState(); //the temp data that will be used when the filtering happens

  let scrollerTopRef = React.useRef(0); //the number ref that stores how far the user scrolled from the top so we can continue wherever we were
  let sclrf = React.useRef(null); //scroller object ref

  //the state that checks whether the buttons are loading or not
  const [loading, setLoading] = useState({
    delete: false,
    save: false,
  });

  //the state that stores variables for filtering window
  const [filterWindow, setFilterWindow] = useState({
    open: false,
    filtered: false,
    sorted: false,
    sortedColumn: "",
    showSearchIcon: false,
    sortDirection: 0,
  });

  const [deleteDialogWindow, setDeleteDialogWindow] = useState({
    open: false,
    row: null,
  });

  //the state that will store filtering words as an object
  const [filter, setFilter] = useState("");

  //the function that is used for styling the button with a different color
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

  //SORTING FUNCTION
  function sort(column) {
    setFilterWindow({
      ...filterWindow,
      sorted: true,
      sortedColumn: column.label,
      sortDirection: filterWindow.sortDirection + 1,
    });

    let sortingData;
    if (virtualTableData) sortingData = virtualTableData;
    else sortingData = props.data;

    let sortingFactor;
    if (column.dataKey == "rgbCode") sortingFactor = "colorExtCode";
    else sortingFactor = column.dataKey;

    let sortedData;

    if (filterWindow.sortDirection % 2 == 0) {
      //sorting the data in ascending order
      sortedData = sortingData.sort((a, b) => {
        return a[sortingFactor]
          .toString()
          .localeCompare(b[sortingFactor].toString());
      });
    } else {
      //sorting the data in descending order
      sortedData = sortingData.sort((a, b) => {
        return b[sortingFactor]
          .toString()
          .localeCompare(a[sortingFactor].toString());
      });
    }

    setVirtualTableData(sortedData);
    setLoading(!loading);
  }

  //DELETING FUCTION
  function deleteRow(row) {
    setLoading({ ...loading, delete: false });

    //getting the data except the row that the user wanted to delete
    function filterToDelete(data) {
      return data.filter(({ cdate, formattedDefectHour }) => {
        return (
          formattedDefectHour != row.formattedDefectHour && cdate != row.cdate
        );
      });
    }

    //if data is not filtered yet we'll be using raw data to delete otherwise we'll use the data that has been filtered by user
    if (virtualTableDataTemp) {
      const temprows = filterToDelete(virtualTableDataTemp);
      setVirtualTableDataTemp(temprows); //deleting from the data backup stored in virtual table component
      const rows = filterToDelete(virtualTableData);
      setVirtualTableData(rows); //deleting from the data that has been showing up on the table
    } else {
      const rows = filterToDelete(props.data);
      setVirtualTableDataTemp(rows); //deleting and setting data to the virtual table component from the raw data
      setVirtualTableData(rows); //deleting and setting data to the virtual table component from the raw data
    }
  }

  //FILTERING FUNCTION
  function filterData(value, filterName) {
    setFilterWindow({ ...filterWindow, filtered: true });
    if (props.isFiltered) props.isFiltered(true);

    let currentFilterName;
    //if the filtering outside of the component push the filtering word to the filter words state
    if (filterName) {
      currentFilterName = filterName;
      setFilter({ ...filter, [filterName]: value[filterName] });
    } else currentFilterName = filterWindow.name;

    //------------------Filtering Part----------------------------------
    let filteredRows;

    //if the virtual table data has not been set yet we are gonna use the raw data to filter and set the virtual table data
    if (!virtualTableDataTemp) {
      setVirtualTableDataTemp(props.data);
      filteredRows = props.data.filter((data) => {
        return data[currentFilterName]
          .toString()
          .toLowerCase()
          .includes(value[currentFilterName].toLowerCase());
      });
    } else {
      //if the filters are just one then we'll filter the data immediately if not we'll filter data according to filters one by one then we'll combine them together
      if (Object.keys(filter).length > 1) {
        //getting old filters except the filter that user is entering currently
        var exceptFilters = Object.keys(filter).filter(
          (element) => element != currentFilterName
        );

        //filtering the data with old filters one by one
        let exceptFilteredRows = exceptFilters.map((filterKeys) => {
          return virtualTableDataTemp.filter((data) => {
            return data[filterKeys]
              .toString()
              .toLowerCase()
              .includes(filter[filterKeys].toLowerCase());
          });
        });

        //filtering the data with the filter that user is currently typing
        filteredRows = virtualTableDataTemp.filter((data) => {
          return data[currentFilterName]
            .toString()
            .toLowerCase()
            .includes(value[currentFilterName].toLowerCase());
        });

        //if the old filters are bigger than one then firstly we'll combine the filtered data arrays with each other
        if (exceptFilteredRows.length > 1)
          exceptFilteredRows = exceptFilteredRows.map(
            (filteredArray, _index) => {
              if (_index != exceptFilteredRows.length - 1)
                return filteredArray.filter((element) =>
                  exceptFilteredRows[_index + 1].includes(element)
                );
            }
          );

        //combining the data array that filtered with old filter word(s) and the data array that filtered with the filter word that the user is currently typing
        filteredRows = filteredRows.filter((element) =>
          exceptFilteredRows[0].includes(element)
        );

        //after all the combines we reach the result array that multi-filtered by the filter words and setting the virtual table data to filtered data
        setVirtualTableData(filteredRows);
      }
      //if the filter word is just one then we are gonna filter the data immediately because there is not other data array to combine with
      else {
        filteredRows = virtualTableDataTemp.filter((data) => {
          return data[currentFilterName]
            .toString()
            .toLowerCase()
            .includes(value[currentFilterName].toLowerCase());
        });
        setVirtualTableData(filteredRows);
      }
    }

    //------------------------------------------------------------------
    return filteredRows;
  }

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

  //Table's header content
  function fixedHeaderContent() {
    return (
      <TableRow>
        {props.columns.map((column, _index) => (
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
                if (column.numeric) sort(column);
                scrollerTopRef.current = sclrf.current.scrollTop;
              }}
            >
              <h5 style={{ fontSize: "auto" }}>{column.label}</h5>
              {column.numeric &&
                filterWindow.sorted &&
                column.label == filterWindow.sortedColumn && (
                  <ArrowDownwardIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      transform:
                        filterWindow.sortDirection % 2 == 0
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                )}
            </Button>
            {column.numeric && (
              <SearchIcon
                className="searchIcon"
                sx={{
                  position: "absolute",
                  zIndex: "50000",
                  right: 0,
                }}
                onClick={() => {
                  if (!filterWindow.open)
                    setFilterWindow({
                      ...filterWindow,
                      open: true,
                      name: column.dataKey,
                    });
                  else if (
                    filterWindow.open &&
                    filterWindow.name != column.dataKey
                  ) {
                    setFilterWindow({
                      ...filterWindow,
                      name: column.dataKey,
                    });
                  } else if (
                    filterWindow.open &&
                    filterWindow.name == column.dataKey
                  )
                    setFilterWindow({ ...filterWindow, open: false });
                  if (!filter[column.dataKey])
                    setFilter({ ...filter, [column.dataKey]: "" });
                  scrollerTopRef.current = sclrf.current.scrollTop;
                }}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  //Table's row content
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
                          borderRadius: "10px",
                          backgroundColor: row["rgbCode"],
                          borderRadius: "5px",
                          color:
                            row["rgbCode"] == "#000000" ? "white" : "black",
                          fontSize: "20px",
                          paddingBlock: "4px",
                          marginInline: "3px",
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

  //the adjuster function that adjusts if the row's value is not just simply a number or string
  const contentAdjuster = (key, row, _index) => {
    switch (key.toString()) {
      case "nrReasonId":
        return (
          <div style={{ width: "100%" }}>
            <NativeSelect
              sx={{ backgroundColor: "white" }}
              key={0}
              disabled={loading.delete || loading.save || loading.refresh}
              style={{ width: "90%", height: "30px" }}
              name="example"
              value={row["nrReasonId"]}
            >
              <option value={0}></option>
              {nrReasonData.map((data, _index) => (
                <option key={_index} value={data.nrId}>
                  {data.nrReasonAbb}
                </option>
              ))}
            </NativeSelect>
          </div>
        );
      // case "rgbCode":
      //   return (
      //     <div
      //       style={{
      //         backgroundColor: row["rgbCode"],
      //         borderRadius: "5px",
      //         color: row["rgbCode"] == "#000000" ? "white" : "black",
      //         fontSize: "20px",
      //         paddingBlock: "4px",
      //         marginInline: "3px",
      //       }}
      //     >
      //       {row["colorExtCode"]}
      //     </div>
      //   );
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
                scrollerTopRef.current = sclrf.current.scrollTop;
                setDeleteDialogWindow({
                  ...deleteDialogWindow,
                  open: true,
                  row: row,
                  buttonId: _index,
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

  //effect hook that is used for filtering outside of this component
  useEffect(() => {
    if (props.filterWord) {
      var keys = Object.keys(props.filterWord);
      keys.map((key) => {
        if (props.filterWord[key] != "")
          filterData({ [key]: props.filterWord[key] }, key);
      });
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
            //setting the scroller ref to scroll down where user remain after re-render
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
      <Dialog
        // sx={{ backdropFilter: "blur(0.2px)" }}
        onClose={() => {
          //if user clicks outside of the div close the dialog window
          setDeleteDialogWindow({ ...deleteDialogWindow, open: false });
        }}
        sx={{ overflow: "hidden" }}
        open={deleteDialogWindow.open}
        maxWidth="xl"
        PaperProps={{ sx: { overflow: "visible" } }}
      >
        <DialogContent sx={{ backgroundColor: "#ffc840" }}>
          <h2>{t("areYouSureDelete")}</h2>
          <div
            className="row"
            style={{ width: "100%", margin: 0, justifyContent: "center" }}
          >
            <Button
              disabled={loading.delete}
              variant="contained"
              sx={{ width: 100, height: 50, marginRight: "2px" }}
              onClick={() => {
                setLoading({
                  ...loading,
                  delete: true,
                  buttonId: deleteDialogWindow.buttonId,
                });
                setAlert(t("deleteDefectAlert"), "success", 2000, () => {
                  deleteRow(deleteDialogWindow.row);
                });
                setDeleteDialogWindow({ ...deleteDialogWindow, open: false });
              }}
            >
              {t("yes")}
            </Button>
            <Button
              disabled={loading.delete}
              variant="contained"
              color="error"
              sx={{ width: 100, height: 50, marginLeft: "2px" }}
              onClick={() => {
                setDeleteDialogWindow({ ...deleteDialogWindow, open: false });
                setLoading({
                  ...loading,
                  delete: false,
                  buttonId: 0,
                });
              }}
            >
              {t("no")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div
        className="virtualTableTextFieldContainer"
        style={{
          marginTop: filterWindow.open ? 0 : -150,
        }}
      >
        <CustomTextField
          autoComplete="off"
          className="virtualTableTextField"
          onClose={() => {
            setFilterWindow({ ...filterWindow, open: false });
          }}
          onChange={(value) => {
            filterData(value);
          }}
          onBlur={() => setFilterWindow({ ...filterWindow, open: false })}
          placeholder={filterWindow.name}
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
          name={filterWindow.name}
          setValues={setFilter}
          values={filter}
          iconPosition="rightInner"
        />
        <CloseIcon
          onClick={() => setFilterWindow({ ...filterWindow, open: false })}
          sx={{ fontSize: "50px", cursor: "pointer" }}
        />
      </div>

      <p
        style={{
          position: "relative",
          border: "1px solid black",
          width: "100%",
          textAlign: "right",
          backgroundColor: "#ffc840",
          height: "auto",
        }}
      >
        {filterWindow.filtered && (
          <Button
            sx={{
              ...buttonStyle("rgba(0, 0, 0, 0.9)"),
              position: "absolute",
              bottom: 0,
              width: 200,
              left: -10,
              zIndex: 500,
              padding: 2,
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "0px",
              fontSize: "0.7vw",
            }}
            onClick={() => {
              //removing all the filters
              setFilterWindow({
                ...filterWindow,
                filtered: false,
                open: false,
              });
              props.isFiltered(false);
              setVirtualTableData(virtualTableDataTemp);
              setFilter("");
            }}
            variant="contained"
          >
            {t("clearFilters")}
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
            //refreshing to fetch the new data
            setFilterWindow({ ...filterWindow, filtered: false });
            setLoading({ ...loading, refresh: true });
            props.isRefreshed(Math.random());

            //popping an alert to inform the user that the data has been renewed
            setAlert(t("refreshAlert"), "success", 2000, () => {
              setLoading({ ...loading, refresh: false });
              setVirtualTableData(props.data);
              setVirtualTableDataTemp(props.data);
            });

            //setting the value of scrollTop to remain the scroller where the user scrolled after refresh the data
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
