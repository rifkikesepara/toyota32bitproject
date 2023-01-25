const express = require("express");
const fs = require("fs");
const app = express();

var cors = require("cors");
app.use(cors());

var data = fs.readFileSync("terminalList.json");
var terminalList = JSON.parse(data);

app.get("/terminals", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("terminalList.json")));
});
app.get("/login", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("login.json")));
});
app.get("/shifts", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("shifts.json")));
});

module.exports = app;
