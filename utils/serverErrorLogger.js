const winstonDailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format, transports, error } = require('winston');
const { resolve } = require('path');

// use for production
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.align(),
    format.prettyPrint(),
    format.printf((info) => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`)
  ),
  transports: [
    new winstonDailyRotateFile({
      filename: resolve(__dirname, '../logs/error-%DATE%.log'),
      datePattern: 'DD-MM-YYYY',
      level: 'error',
    }),
  ],
});

// console.log error only development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = logger;
