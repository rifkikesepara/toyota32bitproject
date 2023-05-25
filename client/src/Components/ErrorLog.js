import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import { useFormik } from "formik";
import API from "../Resources/api.json";
import CustomTextField from "./CustomTextField";
import useAlert from "../Hooks/useAlert";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from "axios";
import useGetDataOnce from "../Hooks/GetDataOnce";
import { useTranslation } from "react-i18next";
import VirtualKeyboard from "./VirtualKeyboard";

export default function ErrorLog(props) {
  const { t } = useTranslation(); //getting context for the localization on the page
  const { setAlert } = useAlert(); //getting context to pop the alert up whenever we need

  const [dataFetched, setDataFetched] = useState(false); //boolean to detect whether data is fetched or not
  const [loading, setLoading] = useState(false);

  const keyboard = useRef();
  const [inputName, setInputName] = useState();

  const errDetail = useGetDataOnce(API.link + "/errDetail", true, (data) => {
    setDataFetched(true);
  });
  const errReason = useGetDataOnce(API.link + "/errReason", true);

  const formik = useFormik({
    initialValues: {
      defectClass: 1234,
      defectResponsibles: 1213,
      defectReason: 104671,
      exitDepartment: 24481,
      subResponsible: 1179,
      explain: "",
      process: "",
      defectX: 0,
      defectY: 0,
      defectName: "",
      partName: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        props.isSaved(true);
        setAlert(t("saveDefectAlert"), "success", 3000, () => {});

        axios
          .post(API.link + "/errList", values)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        console.log(values);
      }, 1000);
    },
  });

  return (
    <Dialog
      // sx={{ backdropFilter: "blur(0.2px)" }}
      onClose={() => {
        //if user clicks outside of the div close the dialog window
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
                marginBlock: "2px",
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
              style={{ width: "100%", margin: 0, marginBlock: "2px" }}
            >
              <div
                className="row"
                style={{
                  width: "50%",
                  justifyContent: "space-between",
                  margin: 0,
                  marginBlock: "2px",
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
              style={{ width: "100%", margin: 0, marginBlock: "2px" }}
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
                type="submit"
                onClick={() => {
                  let storedData = JSON.parse(
                    localStorage.getItem("defectLog")
                  );
                  //getting the defect position from local storage that has been stored before to log
                  formik.setValues({
                    ...formik.values,
                    defectX: storedData.posX,
                    defectY: storedData.posY,
                    defectName: storedData.defect,
                    partName: storedData.label,
                  });
                }}
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
              style={{ width: "100%", margin: 0, marginBlock: "2px" }}
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
              style={{ width: "100%", margin: 0, marginBlock: "2px" }}
            >
              <h2>{t("explanation")}</h2>
              <TextField
                disabled={loading}
                autoComplete="off"
                name="explain"
                sx={{ width: "80%" }}
                placeholder="Örnek Açıklama"
                value={formik.values.explain}
                onChange={(event) => {
                  keyboard.current.setInput(event.target.value);
                  formik.handleChange(event);
                }}
                onFocus={(event) => setInputName(event.target.name)}
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "2px" }}
            >
              <h2 style={{ color: "red" }}>{t("doneWork")}*</h2>
              <TextField
                disabled={loading}
                autoComplete="off"
                name="process"
                sx={{ width: "80%" }}
                placeholder="Örnek İşlem"
                value={formik.values.process}
                onChange={(event) => {
                  keyboard.current.setInput(event.target.value);
                  formik.handleChange(event);
                }}
                onFocus={(event) => setInputName(event.target.name)}
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "2px" }}
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
          <VirtualKeyboard
            disabled={loading}
            keyboard={keyboard}
            inputName={inputName}
            width="100%"
            helperText="false"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              boxShadow: "none",
            }}
            values={formik.values}
            setValues={formik.setValues}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
