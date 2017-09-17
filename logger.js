const winston = require('winston')


const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name:'info-logger',
            filename:'./info-log',
            level:'info',
        }),
        new winston.transports.File({
            name:'error-logger',
            filename:'./error.log',
            level:'error',
        }),
        
    ]
})

logger.info('hello')
logger.error('some error')
module.exports = logger