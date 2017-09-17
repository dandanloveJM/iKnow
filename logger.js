const winston = require('winston')
require('winston-daily-rotate-file')

const logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            name:'info-logger',
            datePattern: 'yyyy-MM-dd',
            filename:'./info-log.',
            level:'info',
        }),
        new winston.transports.DailyRotateFile({
            name:'error-logger',
            filename:'./error-log.',
            datePattern: 'yyyy-MM-dd',
            level:'error',
        }),
        
    ]
})

logger.info('hello')
logger.error('some error')
module.exports = logger