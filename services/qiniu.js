const qiniu = require('qiniu')
const accessKey = 'BwARrM8n5kvLfpEEVrPeZnRm28kiTPuNpg8XB_yr'
const secretKey = 'NE2J-Svk5px0j4TT7hz5NULM8BqURQ-O1LA7giOb'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const bucket = 'photo'
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const options = { scope: bucket,
returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}' }
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken =  putPolicy.uploadToken(mac);

const uploader = (key, readableStream) => {
    return new Promise((resolve, reject) => {
        formUploader.putStream(uploadToken, key, readableStream, putExtra, function (respErr,
            respBody, respInfo) {
            if (respErr) {
                throw new Error(respErr)
            }
            if (respInfo.statusCode == 200 || 304) {
                resolve({
                    code:respInfo.statusCode ,
                    data:respBody,
                });
            } else {
                reject({
                    code: respInfo.statusCode,
                    data: respBody
                })
                
            }
        });

       
    })
}

module.exports = {
    bucket,
    uploader
}