const Redis = require('ioredis')
const redis = new Redis({
    port:6379,
    host:'localhost'
})

redis.set('foo','bar')


module.exports = redis
