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
app.get("/header", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("header.json")));
});
app.get("/screen", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("screen.json")));
});
app.get("/defectselect", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("defectSelectData.json")));
});
app.get("/unapproved", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("unapproved.json")));
});
app.get("/vehicle", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("vehicle.json")));
});
app.get("/errDetail", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("errDetail.json")));
});
module.exports = app;
