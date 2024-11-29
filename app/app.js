"use strict";

// modules
const express = require("express");
const path = require("path");
const app = express();

// routes
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", home);

module.exports = app;
