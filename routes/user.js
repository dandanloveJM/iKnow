const express = require('express');
const router = express.Router();
const User = require('../models/in_memo/user')

/* localhost:8082/user/ */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      let users = await User.getUsers()
      return {
        code:0,
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
        age: req.body.age
      })
      return {
        code:0,
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
    res.send('trying to get a user')

  })
  .patch((req, res) => {
    res.send('trying to modify a user')

  })
module.exports = router;
