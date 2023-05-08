import * as React from "react";

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
import { Button } from "@mui/material";
import useAlert from "../Hooks/useAlert";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import CustomTextField from "./CustomTextField";

export default function VirtualTable(props) {
  const { t } = useTranslation();

  let scrollerTopRef = React.useRef(0);
  let sclrf = React.useRef(null);
  const { setAlert } = useAlert();
  const [loading, setLoading] = React.useState({
    buttonId: 0,
    delete: false,
    save: false,
  });
  const [openFilterWindow, setOpenFilterWindow] = React.useState({
    open: false,
  });

  function sort(column) {
    let sortingFactor;

    if (column.dataKey == "rgbCode") sortingFactor = "colorExtCode";
    else sortingFactor = column.dataKey;

    const data = props.data.sort((a, b) => {
      return a[sortingFactor]
        .toString()
        .localeCompare(b[sortingFactor].toString());
    });
    props.setFilteredErrorList(data);
    setLoading(!loading);
  }

  function deleteRow(row) {
    setLoading({ ...loading, delete: false });
    props.setFilteredErrorList(
      props.data.filter(({ cdate }) => {
        return cdate != row["cdate"];
      })
    );
  }

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
                <>
                  <SearchIcon
                    sx={{
                      position: "absolute",
                      zIndex: "50000",
                      bottom: 0,
                      left: 0,
                    }}
                    onClick={() =>
                      setOpenFilterWindow({
                        name: column.label,
                        open: !openFilterWindow.open,
                      })
                    }
                  />
                </>
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
              loading={loading.delete && loading.buttonId == row["buttonId"]}
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
                console.log(row["buttonId"]);
                setLoading({
                  ...loading,
                  delete: true,
                  buttonId: row["buttonId"],
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
                loading={loading.save && loading.buttonId == row["buttonId"]}
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
                    buttonId: row["buttonId"],
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
            data={props.data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        ) : !props.data ? (
          <></>
        ) : (
          <div className="column" style={{ backgroundColor: "#ffc840" }}>
            <h1>No data found</h1>
          </div>
        )}
      </Paper>
      {openFilterWindow.open && (
        <div
          style={{
            position: "relative",
          }}
        >
          <CustomTextField
            placeholder={openFilterWindow.name}
            kayboardLayout="numeric"
            keyboardWidth="25%"
            sx={{
              position: "absolute",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid black",
              bottom: 0,
              left: 0,
            }}
            width={100}
            name="filterWord"
            setValues={setLoading}
            values={loading}
            iconPosition="leftInner"
          />
          <div
            style={{
              position: "absolute",
              left: 200,
              bottom: 0,
              height: 58,
              backgroundColor: "red",
            }}
          >
            close
          </div>
        </div>
      )}
      <p
        style={{
          border: "1px solid black",
          width: "100%",
          textAlign: "right",
          backgroundColor: "#ffc840",
          height: "auto",
        }}
      >
        <LoadingButton
          loading={loading.refresh}
          sx={{
            color: "black",
            borderRadius: "100px",
            height: "20px",
            minWidth: "20px",
          }}
          onClick={() => {
            setLoading({ ...loading, refresh: true });
            props.isRefreshed(Math.random());
            setAlert(t("refreshAlert"), "success", 2000, () => {
              setLoading({ ...loading, refresh: false });
            });
            scrollerTopRef.current = sclrf.current.scrollTop;
          }}
        >
          <RefreshIcon sx={{ fontSize: "20px" }} />
        </LoadingButton>
        {t("totalRows")}: {props.data.length}
      </p>
    </div>
  );
}
