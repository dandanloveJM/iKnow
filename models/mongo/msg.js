const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Errors = require('../../errors')
const logger = require('../../utils/logger').logger
const {ObjectId} = Schema.Types

const MSG_TYPES = {
  SYS: 'sys',
  USER: 'user'
}

const MsgSchema = Schema({
  from: {type: String, required: true, index: true},
  to: {type: String, required: true, index: true},
  content: {type: String, required: true},
  type: {type: String, enum: ['sys', 'user'], required: true},
  extra: {type: Schema.Types.Mixed},
  createTime: {type: Number, default: Date.now().valueOf()},
})

MsgSchema.index({from: 1, to: 1})

const MsgModel = mongoose.model('msg', MsgSchema)

async function createAMsg (from, to, content, type, extra) {
  const msg = await MsgModel.create({
    from,
    to,
    content,
    type,
    extra,
  })
    .catch(e => {
      const errorMsg = 'error creating a new msg'
      logger.error(errorMsg, {err: e.stack || e})
      throw new Errors.InternalError(errorMsg)
    })
  return msg
}

//展示用户收到的私信
async function listUserReceivedMsgs (query) {
  const flow = MsgModel.find({to: query.stuId}).sort({_id:-1})
  const page = Number(query.page) || 0
  const pageSize = Number(query.pageSize) || 10
  flow.limit(pageSize)
  flow.skip(pageSize * page)
  const msgs = await flow.then()
    .catch(e => {
      const errorMsg = 'error getting received msgs from db'
      logger.error(errorMsg, {err: e.stack || e})
      throw new Errors.InternalError(errorMsg)
    })
  return msgs
}

module.exports = {
  model: MsgModel,
  createAMsg,
  listUserReceivedMsgs,
  MSG_TYPES,
}