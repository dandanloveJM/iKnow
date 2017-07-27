const express = require('express');
const router = express.Router();

/* localhost:8082/user/ */
router.route('/')
  .get((req, res, next) => {
    res.send('trying to get user list')
  })
  .post((req, res) => {
    res.send('trying to create a user')

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
