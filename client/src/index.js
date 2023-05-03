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

//creating Browser Router to navigate the webpage according to entered link
const router = createBrowserRouter([
  {
    //the first page that the user will see as soon as the webpage opens, which asks the user to select a terminal
    path: "/terminals",
    element: <TerminalSelect></TerminalSelect>,
    errorElement: <Error></Error>,
  },
  {
    //the page that shows a login page according to the selected terminal, asks the user to log in with their account info
    path: "terminal/:depCode/:filterCode",
    element: <LogIN></LogIN>,
    errorElement: <Error></Error>,
  },
  {
    //virtual keyboard test page
    path: "/keyboard",
    element: <VirtualKeyboard></VirtualKeyboard>,
    errorElement: <Error></Error>,
  },
  {
    //the page that shows up after the login page in order to ask the user to log a defect on the car
    path: "terminal/defectentry/:depCode/:filterCode/:carID",
    element: <ErrorEntry></ErrorEntry>,
    errorElement: <Error></Error>,
  },
  {
    //the page lists the errors that have been logged before and the user can delete or modify these errors
    path: "terminal/defcorrect/:depCode/:filterCode",
    element: <ErrorList></ErrorList>,
    errorElement: <Error></Error>,
  },
  {
    //test page
    path: "/test",
    element: <Test></Test>,
    errorElement: <Error></Error>,
  },
  {
    //if the user attempts to navigate the webpage to a link that doesn't exist then an error page automatically shows up
    path: "*",
    element: <Error></Error>,
    errorElement: <Error></Error>,
  },
]);

const page = <RouterProvider errorElement={<Error></Error>} router={router} />;

ReactDOM.render(page, document.getElementById("root"));
