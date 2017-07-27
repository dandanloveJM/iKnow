const express = require('express');
const router = express.Router();
const Topic = require('../models/in_memo/topic')
const User = require('../models/in_memo/user')

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
    .post((req, res, next) => {
        (async () => {
            var id = req.body.userId
            const user = await User.getUserById(req.body.userId)
           
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
//localhost:8082/topic/dandan
router.route('/:id')
    .get((req, res, next) => {
        (async () => {
            let topic = await Topic.getTopicById(Number(req.params.id))
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
    .patch((req, res, next) => {
        (async () => {
            let topic = await Topic.updateTopicById(Number(req.params.id), {
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
module.exports = router;
