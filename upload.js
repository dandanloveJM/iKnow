const qiniu = require('qiniu')
const accessKey = 'BwARrM8n5kvLfpEEVrPeZnRm28kiTPuNpg8XB_yr'
const secretKey = 'NE2J-Svk5px0j4TT7hz5NULM8BqURQ-O1LA7giOb'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const bucket = 'photo'
var options = {
    scope: bucket,
    callbackUrl: 'http://localhost:8082/qiniu/upload/callback',
    callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    callbackBodyType: 'application/json'

}

var putPolicy = new qiniu.rs.putPolicy(options)
var uploadToken = putPolicy.uploadToken(mac);