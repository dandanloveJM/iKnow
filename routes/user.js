const express = require('express');
const router = express.Router();
const User = require('../models/mongo/user')
const auth = require('../middlewares/auth_user')
const multer = require('multer')
const path = require('path')
const upload = multer({dest: path.join(__dirname, '../public/upload')})
const HOST = process.env.NODE_ENV === 'production' ? 'http://some.host/': 'http://localhost:8082'

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
  .patch(auth(), upload.single('avatar'), (req, res, next) => {
    (async () => {
      //如果更新时为部分更新，即只更新名字或者年龄时
      let update = {}
      if(req.body.name) update.name = req.body.name
      if(req.body.age) update.age = req.body.age
      if(req.body.phoneNumber) update.phoneNumber = req.body.phoneNumber
      if(req.body.password) update.password = req.body.password
      update.avatar = `/upload/${req.file.filename}`
      
      let user = await User.updateUserById(req.params.id, update)
      user.avatar = `${HOST}${update.avatar}`
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
