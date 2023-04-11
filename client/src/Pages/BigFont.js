import { Button, Skeleton } from "@mui/material";
import "../Pages/ErrorEntry.css";
import useGetData from "../Hooks/GetData";

export default function BigFont() {
  const headerData = useGetData("http://localhost:3001/header", 1000, () => {});
  const vehicleData = useGetData(
    "http://localhost:3001/vehicle",
    1000,
    () => {}
  );

  return (
    <div
      className="error-container"
      style={{ width: "100%", height: "100vh", justifyContent: "start" }}
    >
      <h1>HATA GİRİŞ EKRANI</h1>
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
              // borderRight: "1px solid black",
              // borderLeft: "1px solid black",
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
          <>
            <h1
              style={{
                textTransform: "uppercase",
                marginRight: "80px",
              }}
            >
              {headerData.data[0].firstname} {headerData.data[0].lastname}
            </h1>
          </>
        ) : (
          <Skeleton variant="rectangular" width={300} height={40} />
        )}
      </header>
      <div className="row" style={{ width: "100%" }}>
        {vehicleData.data ? (
          <div className="column">
            <h1 style={{ fontSize: "180px" }}>
              {vehicleData.data[0].modelName} - {headerData.data[0].assyNo}
            </h1>
            <h1 style={{ fontSize: "180px" }}>{headerData.data[0].bodyNo}</h1>
          </div>
        ) : (
          <Skeleton variant="rectangular" width={600} height={300} />
        )}

        <Button variant="outlined">HATA GİRİŞİ</Button>
      </div>
    </div>
  );
}
