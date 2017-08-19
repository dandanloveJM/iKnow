const express = require('express');
const router = express.Router();
const Topic = require('../models/mongo/topic')
const User = require('../models/mongo/user')
const auth = require('../middlewares/auth_user')

/* localhost:8082/topic/ */
router.route('/')
    .get((req, res, next) => {
        (async () => {
            let topics = await Topic.getTopics()
            return {
                code: 0,
                topics: topics,
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e)
            })

    })
    .post(auth(), (req, res, next) => {
        (async () => {
            var id = req.body.userId
            const user = await User.getUserById(req.body.userId)
            console.log(user)
            let topic = await Topic.createANewTopic({
                creator: user,
                title: req.body.title,
                content: req.body.content
            })
            return {
                code: 0,
                topic: topic,
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e)
            })


    })
//localhost:8082/topic/10000
router.route('/:topicId')
    .get((req, res, next) => {
        (async () => {
            let topic = await Topic.getTopicById(req.params.topicId)
            return {
                code: 0,
                topic: topic,
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e)
            })
    })
    .patch(auth(),(req, res, next) => {
        (async () => {
            let topic = await Topic.updateTopicById(req.params.id, {
                name: req.body.name,
                age: req.body.age
            })
            return {
                code: 0,
                topic: topic,
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e)
            })
    })

router.route('/:topicId/reply')
    .post(auth(), (req, res, next) => {
        (async () => {
            const user = await User.getUserById(req.body.userId)  
            let topic = await Topic.replyATopic({
                topicId: req.params.topicId,
                creator: user,
                content: req.body.content
            })
            return {
                code: 0,
                topic: topic,
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e)
            })


    })
module.exports = router;
