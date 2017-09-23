const logger = require('../utils/logger').reqLogger


function logRequests(options) {
    return function (req, res, next) {
        const content = {
            method: req.method,
            originalUrl: req.originalUrl,
            body: req.body,
            query: req.query,
            ip: req.ip || req.ips,
            user: req.user || undefined,
            httpStatusCode: res.statusCode,
        }

        logger.info('request', content)
        next()
    }


}

module.exports = {
    logRequests,
}