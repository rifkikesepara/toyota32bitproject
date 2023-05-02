import {
  Accordion,
  AccordionSummary,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import DefectSelect from "./DefectSelect";
import useGetData from "../Hooks/GetData";
import { useFormik } from "formik";
import VirtualKeyboard from "./VirtualKeyboard";
import KeyboardAltTwoToneIcon from "@mui/icons-material/KeyboardAltTwoTone";

export default function ErrorLog(props) {
  //-------------------Virtual Keyboard Stuff------------------------------------
  const keyboard = useRef();
  const [inputName, setInputName] = useState("default");
  const [inputs, setInputs] = useState({});

  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };

  const onChangeInput = (event) => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });

    formik.setValues({ ...formik.values, [inputName]: inputVal });

    keyboard.current.setInput(inputVal);
  };
  //---------------------------------------------------------------------------

  const [dataFetched, setDataFetched] = useState(false);
  const errDetail = useGetData(
    "http://localhost:3001/errDetail",
    1000,
    (data) => {
      setDataFetched(true);
    }
  );

  const errReason = useGetData("http://localhost:3001/errReason", 1000);

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
      console.log(values);
    },
  });

  return (
    <Dialog
      // sx={{ backdropFilter: "blur(0.2px)" }}
      onClose={() => {
        props.openFunc({ ...props, errorLog: false });
      }}
      open={props.open}
      fullWidth={true}
      maxWidth="xl"
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
              <TextField
                name="explain"
                sx={{ width: "80%" }}
                onChange={onChangeInput}
                placeholder="Örnek Açıklama"
                onFocus={() => setInputName("explain")}
                value={getInputValue("explain")}
              />
            </div>
            <div
              className="row"
              style={{ width: "100%", margin: 0, marginBlock: "5px" }}
            >
              <h2 style={{ color: "red" }}>Yapılan İşlem*</h2>
              <TextField
                name="process"
                sx={{ width: "80%" }}
                onChange={onChangeInput}
                onFocus={() => setInputName("process")}
                value={getInputValue("process")}
                placeholder="Örnek İşlem"
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
            <Accordion
              elevation={0}
              sx={{
                "&:before": {
                  display: "none",
                },
                backgroundColor: "#ffc840",
                width: "100%",
                borderRadius: "7px",
              }}
              disableGutters
              square={true}
            >
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#ffc840",
                    padding: 0,
                    margin: 0,
                    width: "100%",
                  },
                }}
              >
                <KeyboardAltTwoToneIcon
                  sx={{ fontSize: "50px", cursor: "pointer" }}
                />
              </AccordionSummary>
              <VirtualKeyboard
                keyboard={keyboard}
                setInputs={setInputs}
                inputName={inputName}
                setValues={formik.setValues}
                values={formik.values}
              />
            </Accordion>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
