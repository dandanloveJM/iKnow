const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth_user')
const MsgService = require('../services/msg_service')
const logger = require('../utils/logger').logger

router
  .route('/')
  //get user all received messages
  .get(auth({ loadJWTUser: true }), (req, res, next) => {
    (async () => {
      
      const userId = req.user._id
      const page = Number(req.query.page) || 0
      const pageSize = Number(req.query.pageSize) || 10

      const msgs = await MsgService.getUserReceivedMsgs({
        userId,
        page,
        pageSize,
      })
      

      return {
        code: 0,
        msgs,
      }
    })()
      .then(r => {
        res.data = r
        res.json(r)
        //response(req, res)
      })
      .catch(e => {
        res.next(e)
        //res.err = e
        //response(req, res)
      })
  })
  .post(auth({ loadJWTUser: true }), (req, res, next) => {
    (async () => {
      const userId = req.user._id  

      const { to, content } = req.body
      const msg = await MsgService.sendAMsgByUser(req.user._id, to, content)
      return {
        code: 0,
        msg: msg,
      }

    })()
      .then(r => {
        res.json(r)
        // res.data = r
        // console.dir(r)
        // response(req, res, next)
      })
      .catch(e => {
        res.err = e
        logger.error('error sending response', {err: e.stack || e})
        //response(req, res)
      })
  })

module.exports = router