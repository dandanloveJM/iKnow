const express = require('express');
const router = express.Router();
const User = require('../models/mongo/user')
const JWT = require('jsonwebtoken')
const JWT_SECERT = require('../cipher').JWT_SECRET
const Errors = require('../errors')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/topicmanage', function (req, res, next) {
  res.render('topicmanage');
});

 /**
   * @api {POST} /login Login
   * @apiName Login
   * @apiGroup Index
   *
   * @apiParam {Stirng} email user's email
   * @apiParam {String} password user's password
   *
   * @@apiSuccess {Number} code 0 represents "successful repsonse"
   * @apiSuccess {Object} user   user info
   * @apiSuccess {String} token   token for user to authorization
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "code": "0",
   *       "data": {
   *          "user": {
   *              "_id": "5abe3f7969c9d9111be87ef6",
   *              "name": "dx",
   *              "email": "123@qq.com"
   *          },
   *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlM2Y3OTY5YzlkOTExMWJlODdlZjYiLCJpYXQiOjE1MjI0MjgwMzQ0NDUsImV4cGlyZSI6MTUyMjUxNDQzNDQ0NX0.C-F4CFj4Ef447q7jzcfs4qFTfg8ZhX0d4tfXl3PpWy0"
   *        }
   *       
   *     }
   *
   * @apiError ErrorLogin Error when login
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "Error when login"
   *     }
   */
router.post('/login', (req, res, next) => {
  (async () => {
   
    if(!req.body.password){
      throw new Errors.ValidationError('password', 'password can not be empty')
    }
    const user = await User.login(req.body.email, req.body.password)

    const token = JWT.sign({ _id: user.id, iat: Date.now(), expire: Date.now() + 24 * 60 * 60 * 1000 }, JWT_SECERT)

    return {
      code: 0,
      data: {
        user: user,
        token: token,
      }

    }
  })()
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
      next(e)
    })

})
module.exports = router;
