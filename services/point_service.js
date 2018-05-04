const User = require('../models/mongo/user')
const PointsOp = require('../models/mongo/point')
const redis = require('./redis_service')
const logger = require('../utils/logger').logger
const Errors = require('../errors')
const USER_POINTS_SORT_SET_KEY = 'user_points_sort_set'

async function incrUserPoints (userId, incr, type) {
  await User.incrPoints(userId, incr)
  await PointsOp.createPointsOp(userId, type, incr)
  await redis.zincrby(USER_POINTS_SORT_SET_KEY, incr, userId)
    .catch(e => {
      const errorMsg = 'error incr user points to redis sorted set'
      logger.error(errorMsg, {err: e.stack || e})
      throw new Errors.InternalError(errorMsg)
    })
}



module.exports = {
  incrUserPoints,
  
}