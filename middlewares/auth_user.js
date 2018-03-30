const JWT = require('jsonwebtoken')
const JWT_SECRET = require('../cipher').JWT_SECRET
const User = require('../models/mongo/user')

module.exports = function (options) {
  return function (req, res, next) {
    (async () => {
      const auth = req.get('Authorization')
      if (!auth) throw new Error('No auth!')
      let authList = auth.split(' ')
      const token = authList[1]
      if (!auth || auth.length < 2) {
        next(new Error('No auth!'))
        return
      }

      const obj = JWT.verify(token, JWT_SECRET)
      if (!obj || !obj._id || !obj.expire) throw new Error('No auth!')
      if (Date.now() - obj.expire > 0) throw new Error('Token expired!')

      //ID改成了学号
      if (options.loadJWTUser) req.user = obj //把JWT解析出的对象直接挂到req.user
      if (options.loadUser) req.user = await User.getUserById(obj._id) //把user从数据库中查出来
      
    })()
      .then(r => {
        next()
      })
      .catch(e => {
        res.statusCode = 401
        next(e)
      })

  }
}