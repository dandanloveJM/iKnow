const Msg = require('../models/mongo/msg')
const redis = require('./redis_service')//一次性的消息适合用redis存储
const Errors = require('../errors')
const logger = require('../utils/logger').logger

const UNREAD_MSGS_HSET = 'unread_msgs_hset'

//用户发送私信
async function sendAMsgByUser(from, to, content) {
    const msg = await Msg.createAMsg(from, to, content, Msg.MSG_TYPES.USER)
    await _incrUserUnreadCount(to, 1)
    return msg
}
//content是字符串类型
async function sendAMsgBySys(from, to, content) {
    const msg = await Msg.createAMsg(from, to, content, Msg.MSG_TYPES.SYS)
    await _incrUserUnreadCount(to, 1)
    return msg
}

async function _incrUserUnreadCount(userId, incr) {
    const result = await redis.hincrby(UNREAD_MSGS_HSET, userId, incr)
        .catch(e => {
            const errorMsg = 'error incr user unread count'
            logger.error(errorMsg, { err: e.stack || e })
            throw Errors.InternalError(errorMsg)
        })
    return result
}

async function _clearUserUnreadCount(userId) {
    const result = await redis.hdel(UNREAD_MSGS_HSET, userId)
        .catch(e => {
            const errorMsg = 'error incr user unread count'
            logger.error(errorMsg, { err: e.stack || e })
            throw Errors.InternalError(errorMsg)
        })
    return result
}

async function getUserUnreadCount(userId) {
    const result = await redis.hget(UNREAD_MSGS_HSET, userId)
        .then(r => {
            return Number(r) || 0
        })
        .catch(e => {
            const errorMsg = 'error incr user unread count'
            logger.error(errorMsg, { err: e.stack || e })
            throw Errors.InternalError(errorMsg)
        })
    return result
}
//当用户请求过消息后就清零未读消息数
async function getUserReceivedMsgs(query) {
    const msgs = await Msg.listUserReceivedMsgs(query)
    await _clearUserUnreadCount(query.userId)
    return msgs
}

module.exports = {
    sendAMsgByUser,
    sendAMsgBySys,
    getUserUnreadCount,
    getUserReceivedMsgs,
}