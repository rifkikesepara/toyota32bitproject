import { Button, Skeleton, TextField } from "@mui/material";
import "../Pages/ErrorEntry.css";
import useGetData from "../Hooks/GetData";
import Countdown from "../Components/Countdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import API from "../Resources/api.json";
import ErrorLog from "../Components/ErrorLog";
import Alarm from "../Resources/alarm.ogg";
import { useTranslation } from "react-i18next";

export default function BigFont(props) {
  const { t } = useTranslation(); //getting context for the localization of the page

  const headerData = useGetData(API.link + "/header", 1000);
  const vehicleData = useGetData(API.link + "/vehicle", 1000);
  const unapproved = useGetData(API.link + "/unapproved", 1000);

  return (
    <div
      //switching className when the time's up to animate the background and alert the user that user is runnning out of time
      className={
        !props.timesUp ? "error-container" : "error-container-animated"
      }
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <h1 style={{ textAlign: "center", padding: "20px" }}>
        {t("defectEntryHeader").toUpperCase()}
      </h1>
      <div
        style={{
          position: "absolute",
          height: "70px",
          width: "70px",
          left: 0,
          top: 0,
          cursor: "pointer",
        }}
        onClick={() => props.setBooleans({ ...props.booleans, bigFont: false })}
      >
        <ArrowBackIcon
          style={{
            fontSize: "70px",
          }}
        />
      </div>
      <header
        className="error-header"
        style={{
          width: "96%",
          border: "2px solid #ac8011",
          borderRadius: "7px",
        }}
      >
        <div
          className="row"
          style={{
            height: "100%",
            width: "auto",
            marginLeft: "0",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <div className="column">
            <h1>{t("assemblyNo").toUpperCase()}</h1>
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
              borderLeft: "1px solid black",
              borderLeftStyle: "dashed",
              borderRightStyle: "dashed",
            }}
          >
            <h1>{t("bodyNo").toUpperCase()}</h1>
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
        </div>
        {headerData.data ? (
          <div
            className="column"
            style={{
              backgroundColor: headerData.data[0].bgColor,
            }}
          >
            <h1>{t("color").toUpperCase()}</h1>
            <p>{headerData.data[0].extCode}</p>
          </div>
        ) : (
          <div className="column">
            <h1>{t("color").toUpperCase()}</h1>
            <Skeleton
              variant="rectangular"
              width={70}
              height={20}
              animation="wave"
            />
          </div>
        )}

        {headerData.data ? (
          <div className="column" style={{ margin: 0, marginRight: "80px" }}>
            <h1
              style={{
                textTransform: "uppercase",
              }}
            >
              {headerData.data[0].firstname} {headerData.data[0].lastname}
            </h1>
            <Countdown time={props.time.current} size={30} />
            {/* audio sound plays if the user does not enter an defect entry*/}
            <audio ref={props.audioRef} loop>
              <source src={Alarm}></source>
            </audio>
          </div>
        ) : (
          <Skeleton variant="rectangular" width={300} height={40} />
        )}
      </header>
      <div
        className="row"
        style={{ width: "100%", justifyContent: "space-around", margin: 0 }}
      >
        {vehicleData.data ? (
          <div className="column" style={{ width: "100%" }}>
            <h1 style={{ fontSize: "12vw" }}>
              {vehicleData.data[0].modelName} - {headerData.data[0].assyNo}
            </h1>
            <h1 style={{ fontSize: "12vw" }}>{headerData.data[0].bodyNo}</h1>
          </div>
        ) : (
          <Skeleton
            variant="rectangular"
            width={800}
            height={300}
            sx={{ marginTop: "20px" }}
          />
        )}
        <div
          className="column"
          style={{
            margin: 0,
            height: "auto",
            justifyContent: "center",
            border: "2px solid #ac8011",
            padding: "20px",
            marginRight: "50px",
            borderRadius: "7px",
          }}
        >
          <Button
            color="error"
            variant="contained"
            sx={{ width: 250, height: 65, marginBottom: "50px" }}
            onClick={() =>
              props.setBooleans({ ...props.booleans, bigFont: false })
            }
          >
            {t("defectEntry").toUpperCase()}
          </Button>
          {/* <ErrorLog
            open={props.booleans.errorLog}
            openFunc={(bool) =>
              props.setBooleans({ ...props.booleans, errorLog: bool })
            }
            isSaved={(bool) =>
              props.setBooleans({
                ...props.booleans,
                defectLogged: bool,
                errorLog: bool ? false : true,
              })
            }
          /> */}
          <h1>{t("assemblyNo").toUpperCase()}</h1>
          <TextField
            sx={{
              borderRadius: 2,
              minWidth: 250,
            }}
            value={
              headerData.data != undefined ? headerData.data[0].assyNo : ""
            }
          />
        </div>
      </div>

      <div
        className="column"
        style={{
          justifyContent: "start",
          alignItems: "flex-start",
          width: "96%",
          marginTop: "20px",
        }}
      >
        {unapproved.data ? (
          unapproved.data.map((dat) => {
            return (
              <h2 style={{ fontSize: "2.5vw" }}>
                {dat.partName} - {dat.defectName}
              </h2>
            );
          })
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              width={800}
              height={40}
              sx={{ margin: "5px" }}
            />
            <Skeleton
              variant="rectangular"
              width={800}
              height={40}
              sx={{ margin: "5px" }}
            />
            <Skeleton
              variant="rectangular"
              width={800}
              height={40}
              sx={{ margin: "5px" }}
            />
          </>
        )}
      </div>
    </div>
  );
}
