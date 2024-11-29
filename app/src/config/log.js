const fs = require("fs");
const path = require("path");
const appRoot = require("app-root-path");

const accessLogStream = fs.createWriteStream(
  path.join(appRoot.path, "log", "access.log"),
  { flags: "a" }
);

module.exports = accessLogStream;
