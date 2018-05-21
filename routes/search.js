const express = require('express');
const router = express.Router();
const Topic = require('../models/mongo/topic')
const User = require('../models/mongo/user')
const Course = require('../models/mongo/course')
const auth = require('../middlewares/auth_user')
const MsgService = require('../services/msg_service')
const LikeService = require('../services/like_service')


/* localhost:8082/search/ */
router.route('/')
/**
         * @api {GET} /search search topic
         * @apiName  search topic 
         * @apiGroup Topic
        *
         * 
         * @apiSuccess {Number} code 0 represents "successful repsonse"
         * @apiSuccess {Topics} topic
         *  @apiSuccess {Users} users related to the topic
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "code": "0",
         *       
         *         "topics": [{
         *            "__v": 0,
         *            "creator": "{ _id: 5abe3f7969c9d9111be87ef6,\n  name: 'dx',\n  email: '123@qq.com',\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }",
         *            "title": "this is a question ",
         *            " courseTag": "信息安全",
         *            "_id": "5ad994dbe1e1291b2dd2e108",
         *            "createTime": 1524208853430,
         *            "tags": [],
         *            "replyList": []
         *        }]
         *   users": [
         *  {
         *     "_id": "5abdf9c82294d31df055b4e9",
         *     "name": "dandan",
         *     "email": "834921748@qq.com",
         *     "points": 30
         *  }
         *  ]
         * 
         *        
         *     }
         *
         * @apiError ErrorCreateUser Error get topic
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "error": "UserNotFound"
         *     }
         */
    .get((req, res, next) => {
        (async () => {
            let word = req.query.word
            let topics = await Topic.findTopic(word)
            let users = await Course.findStuByFuzzyCourseName(word)
            let userinfos = []
         
            for(let i = 0; i < users.length; i++){
                let userinfo = await User.getUserById( users[i].userId)
                userinfos.push(userinfo)
            }
            return {
                code: 0,
                topics: topics,
                users: userinfos
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e)
            })

    })


module.exports = router