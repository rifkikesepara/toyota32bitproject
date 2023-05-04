import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import DefectSelect from "./DefectSelect";
import useGetData from "../Hooks/GetData";
import { useFormik } from "formik";
import API from "../Resources/api.json";
import CustomTextField from "./CustomTextField";
import axios from "axios";

export default function ErrorLog(props) {
  const [dataFetched, setDataFetched] = useState(false);
  const errDetail = useGetData(API.link + "/errDetail", 1000, (data) => {
    setDataFetched(true);
  });

  const errReason = useGetData(API.link + "/errReason", 1000);

  const formik = useFormik({
    initialValues: {
      defectClass: 1234,
      defectResponsibles: 1213,
      defectReason: 104671,
      exitDepartment: 24481,
      subResponsible: 1179,
      explain: "",
      process: "",
    },
    onSubmit: (values) => {
      axios
        .post(API.link + "/errList/change", { name: "efe" })
        .catch((err) => console.log(err));
      console.log(values);
    },
  });

  return (
    <Dialog
      // sx={{ backdropFilter: "blur(0.2px)" }}
      onClose={() => {
        props.openFunc({ ...props, errorLog: false });
      }}
      sx={{ overflow: "hidden" }}
      open={props.open}
      fullWidth={true}
      maxWidth="xl"
      PaperProps={{ sx: { overflow: "visible" } }}
    >
      <DialogContent sx={{ backgroundColor: "#ffc840" }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="column">
            <div
              className="row"
              style={{
                margin: 0,
                justifyContent: "space-between",
                width: "100%",
                marginBlock: "5px",
              }}
            >
              <h2>CVQS (TMMT)</h2>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="SIK GELEN HATA"
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <div
                className="row"
                style={{
                  width: "50%",
                  justifyContent: "space-between",
                  margin: 0,
                  marginBlock: "5px",
                }}
              >
                <h2>Hata Sorumlusu</h2>
                <DefectSelect
                  name="defectResponsibles"
                  sx={{ minWidth: "75%" }}
                  data={
                    dataFetched &&
                    errDetail.requiredFieldsByInspectionDTOList[5].errDetailComboBoxValueDTOList.map(
                      ({ dataValue, dataCode }) => ({
                        termName: dataValue,
                        termId: dataCode,
                      })
                    )
                  }
                  count={
                    dataFetched &&
                    errDetail.requiredFieldsByInspectionDTOList[5]
                      .errDetailComboBoxValueDTOList.length
                  }
                  value={formik.values.defectResponsibles}
                  onChange={formik.handleChange}
                />
              </div>
              <FormControlLabel
                sx={{ marginLeft: "10px" }}
                control={<Checkbox defaultChecked />}
                label="HARIGAMI"
              />
              <DefectSelect
                name="defectReason"
                sx={{ minWidth: "30%" }}
                data={
                  dataFetched &&
                  errReason.map(({ nrReasonDetail, nrId }) => ({
                    termName: nrReasonDetail,
                    termId: nrId,
                  }))
                }
                count={dataFetched && errReason.length}
                value={formik.values.defectReason}
                onChange={formik.handleChange}
              />
              <h2>RDD</h2>
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <div
                className="row"
                style={{
                  width: "50%",
                  justifyContent: "space-between",
                  margin: 0,
                }}
              >
                <h2>Hata Sınıfı</h2>
                <DefectSelect
                  name="defectClass"
                  sx={{ minWidth: "80%" }}
                  data={
                    dataFetched &&
                    errDetail.requiredFieldsByInspectionDTOList[4].errDetailComboBoxValueDTOList.map(
                      ({ dataValue, dataCode }) => ({
                        termName: dataValue,
                        termId: dataCode,
                      })
                    )
                  }
                  count={
                    dataFetched &&
                    errDetail.requiredFieldsByInspectionDTOList[4]
                      .errDetailComboBoxValueDTOList.length
                  }
                  value={formik.values.defectClass}
                  onChange={formik.handleChange}
                />
              </div>
              <Button
                sx={{
                  borderRadius: 2,
                  minHeight: 70,
                  width: "23%",
                  borderColor: "black",
                }}
                variant="contained"
                type="submit"
                onClick={() => {
                  props.isSaved(true);
                }}
              >
                KAYDET
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  minHeight: 70,
                  width: "23%",
                  borderColor: "black",
                  boxShadow: "none",
                }}
                variant="contained"
                color="error"
                onClick={() => props.openFunc(false)}
              >
                İPTAL
              </Button>
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2>Exit Department</h2>
              <DefectSelect
                name="exitDepartment"
                sx={{ minWidth: "80%" }}
                data={
                  dataFetched &&
                  errDetail.requiredFieldsByInspectionDTOList[0].errDetailComboBoxValueDTOList.map(
                    ({ dataValue, dataCode }) => ({
                      termName: dataValue,
                      termId: dataCode,
                    })
                  )
                }
                count={
                  dataFetched &&
                  errDetail.requiredFieldsByInspectionDTOList[4]
                    .errDetailComboBoxValueDTOList.length
                }
                value={formik.values.exitDepartment}
                onChange={formik.handleChange}
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2>Açıklama</h2>
              <CustomTextField
                autoComplete="off"
                name="explain"
                width="80%"
                placeholder="Örnek Açıklama"
                setValues={formik.setValues}
                values={formik.values}
                keyboardSX={{ bottom: -350 }}
                iconPosition="left"
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2 style={{ color: "red" }}>Yapılan İşlem*</h2>
              <CustomTextField
                autoComplete="off"
                name="process"
                width="80%"
                placeholder="Örnek İşlem"
                setValues={formik.setValues}
                values={formik.values}
                keyboardSX={{ bottom: -350 }}
                iconPosition="left"
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2 style={{ color: "red" }}>Alt Sorumlu*</h2>
              <DefectSelect
                name="subResponsible"
                sx={{ minWidth: "80%" }}
                data={
                  dataFetched &&
                  errDetail.subResponsiblesByDefrespId[1].subResponsibles.map(
                    ({ dataValue, dataCode }) => ({
                      termName: dataValue,
                      termId: dataCode,
                    })
                  )
                }
                count={
                  dataFetched &&
                  errDetail.subResponsiblesByDefrespId[1].subResponsibles.length
                }
                value={formik.values.subResponsible}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
