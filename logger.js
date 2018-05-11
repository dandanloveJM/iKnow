const winston = require('winston')
require('winston-daily-rotate-file')

const logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            name:'info-logger',
            datePattern: 'yyyy-MM-dd',
            filename:'./logs/info-log.',
            level:'info',
        }),
        new winston.transports.DailyRotateFile({
            name:'error-logger',
            filename:'./logs/error-log.',
            datePattern: 'yyyy-MM-dd',
            level:'error',
        }),
        
    ]
})
<<<<<<< HEAD:utils/logger.js

const reqLogger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            name:'info-logger',
            datePattern: 'yyyy-MM-dd',
            filename:'./logs/request-log.',
            level:'info',
        }),
    ]
})

//如果是在调试模式，命令行也输出相应的日志内容
if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    logger.add(winston.transports.Console)
    reqLogger.add(winston.transports.Console)
}


module.exports = {
    logger,
    reqLogger,
}
=======

logger.info('hello')
logger.error('some error')
module.exports = logger
>>>>>>> parent of b332854... 删掉express自带的打日志模块:logger.js
