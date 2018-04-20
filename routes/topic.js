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
    /**
   * @api {post} /topic
   * @apiName  create a new topic
   * @apiGroup Topic
   *
   * @apiParam {String} title topic's title
   * @apiParam {Stirng} content topic's content
   * @apiParam {String} tags topic's tags
   * 
   * @apiSuccess {Number} code 0 represents "successful repsonse"
   * @apiSuccess {Object} topic
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "code": "0",
   *       
   *         "topic": {
   *     "__v": 0,
   *     "creator": "{ _id: 5abe3f7969c9d9111be87ef6,\n  name: 'dx',\n  email: '123@qq.com',\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }",
   *     "title": "this is a question ",
   *    "courseTag": "信息安全",
   *     "_id": "5ad994dbe1e1291b2dd2e108",
   *     "createTime": 1524208853430,
   *     "tags": [],
   *     "replyList": []
   * }
   * 
   *        
   *     }
   *
   * @apiError ErrorCreateUser Error creating user 
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
    .post(auth({ loadUser: true }), (req, res, next) => {
        (async () => {


            let topic = await Topic.createANewTopic({
                creator: req.user,
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                courseTag: req.body.courseTag
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
    /**
       * @api {GET} /topic/:topicId
       * @apiName  get topic by id
       * @apiGroup Topic
      
       * 
       * @apiSuccess {Number} code 0 represents "successful repsonse"
       * @apiSuccess {Object} topic
       *
       * @apiSuccessExample Success-Response:
       *     HTTP/1.1 200 OK
       *     {
       *       "code": "0",
       *       
       *         "topic": {
       *     "__v": 0,
       *     "creator": "{ _id: 5abe3f7969c9d9111be87ef6,\n  name: 'dx',\n  email: '123@qq.com',\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }",
       *     "title": "this is a question ",
       *    "courseTag": "信息安全",
       *     "_id": "5ad994dbe1e1291b2dd2e108",
       *     "createTime": 1524208853430,
       *     "tags": [],
       *     "replyList": []
       * }
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
            let topic = await Topic.getTopicById(req.params.topicId)
            console.log(req.params.topicId)
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
    .patch(auth(), (req, res, next) => {
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
   /**
       * @api {POST} /topic/:topicId/reply
       * @apiName  reply topic
       * @apiGroup Topic
      
       * 
       * @apiSuccess {Number} code 0 represents "successful repsonse"
       * @apiSuccess {Object} topic
       *
       * @apiSuccessExample Success-Response:
       *     HTTP/1.1 200 OK
       *     {
       *       "code": "0",
       *       
       *         "topic": {
       *     "__v": 0,
       *     "creator": "{ _id: 5abe3f7969c9d9111be87ef6,\n  name: 'dx',\n  email: '123@qq.com',\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }",
       *     "title": "this is a question ",
       *    "courseTag": "信息安全",
       *     "_id": "5ad994dbe1e1291b2dd2e108",
       *     "createTime": 1524208853430,
       *     "tags": [],
       *     "replyList": [
       * {
       *         "content": "this is a reply",
       *         "creator": "5abe3f7969c9d9111be87ef6",
       *         "_id": "5ad99dd091dfaf2001add181",
       *         "createTime": 1524211146040
       *     }
       *        ]
       * }
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
    .post(auth({ loadUser: true }), (req, res, next) => {
        (async () => {

            let topic = await Topic.replyATopic({
                topicId: req.params.topicId,
                creator: req.user,
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
