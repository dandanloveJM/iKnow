const express = require('express');
const router = express.Router();
const User = require('../models/mongo/user')
const JWT = require('jsonwebtoken')
const JWT_SECERT = require('../cipher').JWT_SECRET
const Errors = require('../errors')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', (req, res, next) => {
  (async () => {
   
    if(!req.body.password){
      throw new Errors.ValidationError('password', 'password can not be empty')
    }
    const user = await User.login(req.body.phoneNumber, req.body.password)

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
