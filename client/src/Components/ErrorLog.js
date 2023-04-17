import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import DefectSelect from "./DefectSelect";
import useGetData from "../Hooks/GetData";
import { useFormik } from "formik";

export default function ErrorLog(props) {
  const [dataFetched, setDataFetched] = useState(false);
  const errDetail = useGetData(
    "http://localhost:3001/errDetail",
    1000,
    (data) => {
      setDataFetched(true);
      // console.log(data.requiredFieldsByInspectionDTOList);
    }
  );

  const formik = useFormik({
    initialValues: {
      inspection: 22,
      sicilno: "",
      password: "",
      assembleno: "770",
      shift: "M",
      date: new Date(),
    },
    onSubmit: (values) => {},
  });

  return (
    <Dialog
      // sx={{ backdropFilter: "blur(0.2px)" }}
      onClose={() => props.openFunc(false)}
      open={props.open}
      fullWidth={true}
      maxWidth="xl"
    >
      <DialogContent sx={{ backgroundColor: "#ffc840" }}>
        <div className="column">
          <div
            className="row"
            style={{
              margin: 0,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h2>CVQS (TMMT)</h2>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="SIK GELEN HATA"
            />
          </div>
          <div className="row" style={{ width: "100%" }}>
            <div className="row">
              <h2>Hata Sorumlusu</h2>
              <DefectSelect
                name="inspection"
                sx={{ width: "500px" }}
                data={
                  dataFetched &&
                  errDetail.requiredFieldsByInspectionDTOList.map(
                    ({ userName, dataItemId }) => ({
                      termName: userName,
                      termId: dataItemId,
                    })
                  )
                }
                count={
                  dataFetched &&
                  errDetail.requiredFieldsByInspectionDTOList.length
                }
                value={formik.values.inspection}
                onChange={formik.handleChange}
                menuItemName="termName"
              />
            </div>
            <Button
              sx={{
                borderRadius: 2,
                width: "100%",
                minHeight: 70,
                borderColor: "black",
                color: "black",
                marginTop: 1,
                "&:hover": {
                  borderColor: "black",
                  boxShadow: "none",
                  backgroundColor: "#bf9937",
                },
              }}
              variant="outlined"
            >
              KAYDET
            </Button>
            <Button
              sx={{
                borderRadius: 2,
                width: "100%",
                minHeight: 70,
                borderColor: "black",
                color: "black",
                marginTop: 1,
                "&:hover": {
                  borderColor: "black",
                  boxShadow: "none",
                  backgroundColor: "#bf9937",
                },
              }}
              variant="outlined"
              onClick={() => props.openFunc(false)}
            >
              İPTAL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
