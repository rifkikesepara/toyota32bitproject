import { useContext } from "react";
import AlertContext from "../Context/AlertContext";

const useAlert = () => useContext(AlertContext);

export default useAlert;
