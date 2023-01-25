import React from "react";
import ReactDOM from "react-dom";
import TerminalSelect from "./Pages/TerminalSelect";
import Error from "./Pages/Error";
import LogIN from "./Pages/LogIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/terminals",
    element: <TerminalSelect></TerminalSelect>,
    errorElement: <Error></Error>,
  },
  {
    path: "terminal/:depCode/:filterCode",
    element: <LogIN></LogIN>,
    errorElement: <Error></Error>,
  },
  {
    path: "*",
    element: <Error></Error>,
    errorElement: <Error></Error>,
  },
]);

const page = <RouterProvider errorElement={<Error></Error>} router={router} />;

ReactDOM.render(page, document.getElementById("root"));
