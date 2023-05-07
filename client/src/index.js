import React from "react";
import ReactDOM from "react-dom";
import TerminalSelect from "./Pages/TerminalSelect";
import Error from "./Pages/Error";
import LogIN from "./Pages/LogIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VirtualKeyboard from "./Components/VirtualKeyboard";
import ErrorEntry from "./Pages/ErrorEntry";
import Test from "./Pages/Test";
import ErrorList from "./Pages/ErrorList";
import { AlertProvider } from "./Context/AlertContext";
import AlertPopup from "./Components/AlertPopUp";
import "../src/config";
import Footer from "./Components/Footer";

//creating Browser Router to navigate the webpage according to entered link
const router = createBrowserRouter([
  {
    //the first page that the user will see as soon as the webpage opens, which asks the user to select a terminal
    path: "/terminals",
    element: (
      <>
        <TerminalSelect />
      </>
    ),
    errorElement: <Error />,
  },
  {
    //the page that shows a login page according to the selected terminal, asks the user to log in with their account info
    path: "terminal/:depCode/:filterCode",
    element: (
      <>
        <AlertPopup />
        <LogIN />
      </>
    ),
    errorElement: <Error />,
  },
  {
    //virtual keyboard test page
    path: "/keyboard",
    element: <VirtualKeyboard></VirtualKeyboard>,
    errorElement: <Error />,
  },
  {
    //the page that shows up after the login page in order to ask the user to log a defect on the car
    path: "terminal/defectentry/:depCode/:filterCode/:carID",
    element: (
      <>
        <AlertPopup />
        <ErrorEntry />
      </>
    ),
    errorElement: <Error />,
  },
  {
    //the page lists the errors that have been logged before and the user can delete or modify these errors
    path: "terminal/defcorrect/:depCode/:filterCode",
    element: (
      <>
        <AlertPopup />
        <ErrorList />
      </>
    ),
    errorElement: <Error />,
  },
  {
    //test page
    path: "/test",
    element: <Test></Test>,
    errorElement: <Error />,
  },
  {
    //if the user attempts to navigate the webpage to a link that doesn't exist then an error page automatically shows up
    path: "*",
    element: <Error />,
    errorElement: <Error />,
  },
]);

const page = (
  <Footer>
    <AlertProvider>
      <RouterProvider errorElement={<Error />} router={router} />
    </AlertProvider>
  </Footer>
);

ReactDOM.render(page, document.getElementById("root"));
