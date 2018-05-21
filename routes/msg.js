const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth_user')
const MsgService = require('../services/msg_service')
const logger = require('../utils/logger').logger

router
  .route('/')
/**
 * @api {get} /msg  Get User Received Msg
 * @apiName GetUserMsg
 * @apiGroup Msg
 *
 
   * 
   * @apiHeader {String} Authorization bearer `token`
    
    * @apiHeaderExample {json} Header-Example:
    *    {
    *       "Authorization" : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlM2Y3OTY5YzlkOTExMWJlODdlZjYiLCJpYXQiOjE1MjU0MTU2MzIwNTQsImV4cGlyZSI6MTUyNTUwMjAzMjA1NH0.kafI-1f8ocvF-AjABkPvkknLq7l2tKKAm7plGViHDD4"
    *     }
    * 
   *
   * 
 * 
 *
 * @apiSuccess {Number} code  0-success
  * @apiSuccess {Array} msgs  user received msgs
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *        "msgs": [
  *        {
 *           "_id": "5aec014ec3c03a421183901f",
 *           "from": "5abe460346771c6bf8069a19",
 *           "to": "5abe460346771c6bf8069a19",
 *           "content": "5aec014ec3c03a421183901e;this is a question about how to find paper",
 *           "type": "sys",
 *           "__v": 0,
 *           "createTime": 1525415101600
 *         }
 *     ]
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

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

  /**
 * @api {POST} /msg  send msg to user
 * @apiName SendUserMsg
 * @apiGroup Msg
 *
 
   * 
   * @apiHeader {String} Authorization bearer `token`
   * @apiHeader {String} Content-Type application/x-www-form-urlencoded
    
    * @apiHeaderExample {json} Header-Example:
    *    {
    *       "Content-Type": "application/x-www-form-urlencoded"
    *       "Authorization" : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlM2Y3OTY5YzlkOTExMWJlODdlZjYiLCJpYXQiOjE1MjU0MTU2MzIwNTQsImV4cGlyZSI6MTUyNTUwMjAzMjA1NH0.kafI-1f8ocvF-AjABkPvkknLq7l2tKKAm7plGViHDD4"
    *     }
    * 
   *
   *  @apiParam {String} content
   * @apiParam {ObjectID} to
 * @apiParamExample 
 *     {
 *       "content": "hello"
 *       "to": '5aebfe50c3c03a4211839012'
 *     }
 * 
 *
 * @apiSuccess {Number} code  0-success
  * @apiSuccess {Array} msg  user send the  msg
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *        "msg":
  *        {
 *           "_id": "5aec014ec3c03a421183901f",
 *           "from": "5abe460346771c6bf8069a19",
 *           "to": "5abe460346771c6bf8069a19",
 *           "content": "5aec014ec3c03a421183901e;this is a question about how to find paper",
 *           "type": "user",
 *           "__v": 0,
 *           "createTime": 1525415101600
 *         }
 *     
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */


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