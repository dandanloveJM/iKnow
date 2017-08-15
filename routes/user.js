const express = require('express');
const router = express.Router();
const User = require('../models/mongo/user')

/* localhost:8082/user/ */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      let users = await User.getUsers()
      return {
        code: 0,
        users: users,
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
      let users = await User.createANewUser({
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
      })
      return {
        code: 0,
        users: users,
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })


  })
//localhost:8082/user/dandan
router.route('/:id')
  .get((req, res, next) => {
    (async () => {
      let user = await User.getUserById(req.params.id)
      return {
        code: 0,
        user: user,
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
      //如果更新时为部分更新，即只更新名字或者年龄时
      let update = {}
      if(req.body.name) update.name = req.body.name
      if(req.body.age) update.age = req.body.age
      if(req.body.phoneNumber) update.phoneNumber = req.body.phoneNumber
      if(req.body.password) update.password = req.body.password
      let user = await User.updateUserById(req.params.id, update)
      return {
        code: 0,
        user: user,
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
