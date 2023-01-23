const express = require("express");
const fs = require("fs");
const app = express();

var cors = require("cors");
app.use(cors());

var data = fs.readFileSync("terminalList.json");
var myObject = JSON.parse(data);

app.get("/terminals", (req, res) => {
  res.json(myObject);
});
// app.use((req, res, next) => {
//   res.json(myObject);
// });

module.exports = app;
