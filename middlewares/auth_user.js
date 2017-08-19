const JWT = require('jsonwebtoken')
const JWT_SECRET = require('../cipher').JWT_SECRET


module.exports = function (options) {
    return function (req, res, next) {
        try {
            const auth = req.get('Authorization')
            if (!auth) {
                throw new Error('no auth!')
            }
            let authList = auth.split(' ')
            const token = authList[1]
            console.log(token)
            if (!auth || auth.length < 2) {
                res.statusCode = 401
                next(new Error('no auth'))
                return
            }


            const obj = JWT.verify(token, JWT_SECRET)
            console.log(obj)
            if (!obj || !obj._id || !obj.expire) throw new Error('no auth!')
            if (Date.now() - obj.expire > 0) throw new Error('Token expired')

            next()


        }
        catch (e) {
            res.statusCode = 401
            next(e)
        }




    }
}