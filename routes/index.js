var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signUp', (req, res, next) => {

  const user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    password:req.body.password,
  }

  Us

})

router.post('/login', (req, res, next) => {

})
module.exports = router;
