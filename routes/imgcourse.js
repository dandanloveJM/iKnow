const express = require('express');
const router = express.Router();
const Course = require('../models/mongo/course')
const auth = require('../middlewares/auth_user')
const multer = require('multer')
const path = require('path')
const bytes = require('bytes')
const fs = require('fs')
const xlsx = require('node-xlsx')
const { ObjectId } = require('mongoose').Types
const uploader = require('../services/qiniu').uploader
const upload = multer({
    //storage: multer.memoryStorage(),
    dest: path.join(__dirname, '../public/upload'),
    limits: {
        fileSize: bytes('2MB')
    },
    fileFilter: function (req, files, callback) {
        //只能上传jgp,png,jpeg格式的文件
        const filetype = files.mimetype.split('/')[1]
        const validType = 'jpeg|jpg|png'.indexOf(filetype) !== -1
        callback(null, validType)
    }
})

const stream = require('stream')
var bufferStream = new stream.PassThrough();
const OCR = require('../services/ocr_service')

/* localhost:8082/course/ */

router.route('/')
    .post(auth({ loadJWTUser: true }), upload.single('avatar'), (req, res, next) => {
        (async () => {
            //console.dir(req.file)
            if (!req.file) throw new Error('no file!')
            let mimeType = req.file.mimetype.split('/')[1]
            let filename = 'image/avatar/' + Date.now() + '.' + mimeType
            //将图片转为可读流
            const stream = fs.createReadStream(req.file.path)
            //bufferStream.end(req.file.buffer)
            let uploadAvatar = await uploader(filename, stream)
                .then()
                .catch(err => {
                    throw new Error(`something wrong when upload ${filename}`)
                })
            if (uploadAvatar.code === 200 || 304) {
                let imgsrc = 'http://ov6ie3kzo.bkt.clouddn.com/' + filename
                let result = await OCR.ocr(imgsrc)

                for (let i = 0; i < result.length; i++) {
                     await Course.addCourse({
                        userId: ObjectId(req.user._id),
                        course: result[i].course,

                    })
                }
                return {
                    code: 0,
                    result: result
                }

            }


        })()
            .then(data => {
                res.json(data)
            })
            // .then(fs.unlink(req.file.path, (err)=>{//上传完成后删除服务器上的文件
            //    if (err) { throw new Error(err)}

            // }))
            .catch(err => {
                next(err)
            })
    })

module.exports = router;