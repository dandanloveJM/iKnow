const express = require('express');
const router = express.Router();
const Topic = require('../models/mongo/topic')
const User = require('../models/mongo/user')
const Course = require('../models/mongo/course')
const auth = require('../middlewares/auth_user')
const MsgService = require('../services/msg_service')
const LikeService = require('../services/like_service')



    .get((req, res, next) => {
        (async () => {
            let word = req.query.word
            let topics = await Topic.findTopic(word)
            let users = await Course.findStuByFuzzyCourseName(word)
            let userinfos = []
         
            for(let i = 0; i < users.length; i++){
                let userinfo = await User.getUserById(users[i].userId)
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
