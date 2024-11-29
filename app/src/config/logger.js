const { createLogger, transports, format } = require("winston");
const { combine, timestamp, json, simple, colorize, printf, label } = format;

const printFormat = printf(({ label, timestamp, level, message }) => {
  return `${timestamp}: [${label}] : ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "back-end-tea-spoon",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    dirname: "logs",
    filename: "access.log",
    level: "http",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "http",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

module.exports = logger;
