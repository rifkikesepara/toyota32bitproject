import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import useGetData from "../Hooks/GetData";
import { useFormik } from "formik";
import API from "../Resources/api.json";
import CustomTextField from "./CustomTextField";
import useAlert from "../Hooks/useAlert";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from "axios";
import useGetDataOnce from "../Hooks/GetDataOnce";
import { useTranslation } from "react-i18next";

export default function ErrorLog(props) {
  const { t } = useTranslation();
  const { setAlert } = useAlert();

  const [dataFetched, setDataFetched] = useState(false);
  const errDetail = useGetDataOnce(API.link + "/errDetail", true, (data) => {
    setDataFetched(true);
  });

  const errReason = useGetDataOnce(API.link + "/errReason", true);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        props.isSaved(true);
        axios
          .post(API.link + "/errList", values)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        console.log(values);
        setAlert(t("saveDefectAlert"), "success", 3000, () => {});
      }, 1000);
    },
  });

  return (
    <Dialog
      // sx={{ backdropFilter: "blur(0.2px)" }}
      onClose={() => {
        props.openFunc(false);
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
                disabled={loading}
                control={<Checkbox defaultChecked />}
                label={t("commonDefect").toUpperCase()}
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
                <h2>{t("defectResponsible")}</h2>
                <CustomSelect
                  disabled={loading}
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
                disabled={loading}
                sx={{ marginLeft: "10px" }}
                control={<Checkbox defaultChecked />}
                label="HARIGAMI"
              />
              <CustomSelect
                disabled={loading}
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
                <h2>{t("defectClass")}</h2>
                <CustomSelect
                  disabled={loading}
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
              <LoadingButton
                sx={{
                  borderRadius: 2,
                  minHeight: 70,
                  width: "23%",
                  borderColor: "black",
                }}
                variant="contained"
                loading={loading}
                onClick={() => {}}
                type="submit"
              >
                {t("save")}
              </LoadingButton>
              <Button
                disabled={loading}
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
                {t("cancel")}
              </Button>
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2>Exit Department</h2>
              <CustomSelect
                disabled={loading}
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
              <h2>{t("explanation")}</h2>
              <CustomTextField
                disabled={loading}
                autoComplete="off"
                name="explain"
                width="80%"
                placeholder="Örnek Açıklama"
                setValues={formik.setValues}
                values={formik.values}
                keyboardWidth="100%"
                keyboardSX={{ bottom: -350 }}
                iconPosition="left"
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2 style={{ color: "red" }}>{t("doneWork")}*</h2>
              <CustomTextField
                disabled={loading}
                autoComplete="off"
                name="process"
                width="80%"
                placeholder="Örnek İşlem"
                setValues={formik.setValues}
                values={formik.values}
                keyboardWidth="100%"
                keyboardSX={{ bottom: -390 }}
                iconPosition="left"
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2 style={{ color: "red" }}>{t("otherResponsible")}*</h2>
              <CustomSelect
                disabled={loading}
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
