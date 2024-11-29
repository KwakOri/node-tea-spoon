"use strict";

// modules
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const morgan = require("morgan");
const accessLogStream = require("./src/config/log");

// routes
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(morgan("common", { stream: accessLogStream }));

app.use("/", home);

module.exports = app;
