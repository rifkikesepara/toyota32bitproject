import { Button, Icon, Skeleton, TextField } from "@mui/material";
import "../Pages/ErrorEntry.css";
import useGetData from "../Hooks/GetData";
import Countdown from "../Components/Countdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BigFont(props) {
  const headerData = useGetData("http://localhost:3001/header", 1000);
  const vehicleData = useGetData("http://localhost:3001/vehicle", 1000);
  const unapproved = useGetData("http://localhost:3001/unapproved", 1000);

  return (
    <div
      className="error-container"
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
        HATA GİRİŞ EKRANI
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
        onClick={() => props.bigFont({ ...props.bigFont, bigFont: false })}
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
              borderLeft: "1px solid black",
              borderLeftStyle: "dashed",
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
        </div>
        {headerData.data ? (
          <div
            className="column"
            style={{
              backgroundColor: headerData.data[0].bgColor,
            }}
          >
            <h1>RENK</h1>
            <p>{headerData.data[0].extCode}</p>
          </div>
        ) : (
          <div className="column">
            <h1>RENK</h1>
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
            <Countdown
              time={props.time.current}
              size={30}
              onTimesUp={() => {}}
            />
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
          <div className="column">
            <h1 style={{ fontSize: "180px" }}>
              {vehicleData.data[0].modelName} - {headerData.data[0].assyNo}
            </h1>
            <h1 style={{ fontSize: "180px" }}>{headerData.data[0].bodyNo}</h1>
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
          >
            HATA GİRİŞİ
          </Button>
          <h1>MONTAJ NO</h1>
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
      {1 && (
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
                <h2 style={{ fontSize: "45px" }}>
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
      )}
    </div>
  );
}
