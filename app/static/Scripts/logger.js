const winston = require('winston');
require('winston-mongodb');
const {  format, transports } = require('winston');
const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'warn'
        }),
        new winston.transports.File({
            level: 'error',
            // Create the log directory if it does not exist
            filename: 'logs/example.log'
        }),
        new transports.MongoDB({
            level: 'error',
            //mongo database connection link
            db : 'mongodb://srv1:27017/324103357MiriamLeah',
            options: {
                useUnifiedTopology: true
            },
            // A collection to save json formatted logs
            collection: 'server_logs',
            format: format.combine(
            format.timestamp(),
            // Convert logs to a json format
            format.json())
        })
       
    ]
   
};
format: winston.format.combine(
    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
)
const logger = winston.createLogger(logConfiguration);

// Log some messages
// logger.error("Hello, Winston logger, the first error!");
// logger.warn("Hello, Winston logger, the first warning!");
// logger.warn("Hello, Winston logger, the second warning!");
// logger.error("Hello, Winston logger, the second error!");
// logger.info("Hello, Winston logger, some info!");
// logger.debug("Hello, Winston logger, a debug!");
module.exports=logger;