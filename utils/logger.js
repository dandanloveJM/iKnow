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




