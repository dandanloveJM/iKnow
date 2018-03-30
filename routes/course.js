const express = require('express');
const router = express.Router();
const Course = require('../models/mongo/course')
const auth = require('../middlewares/auth_user')
const multer = require('multer')
const path = require('path')
const bytes = require('bytes')
const fs = require('fs')
const xlsx = require('node-xlsx')
const {ObjectId} = require('mongoose').Types
const uploader = require('../services/qiniu').uploader
const upload = multer({
    //storage: multer.memoryStorage(),
    dest: path.join(__dirname, '../public/upload/course'),
    limits: {
        fileSize: bytes('2MB')
    },
    fileFilter: function (req, files, callback) {
        //只能上传xlsx格式的文件
        const filetype = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
        const validType = 'xlsx'
        callback(null, validType)
    }
})

const stream = require('stream')
var bufferStream = new stream.PassThrough();

/* localhost:8082/course/ */
router.route('/')
    .post(auth({ loadUser: true }), upload.single('file'), (req, res, next) => {
        (async () => {
           
         
            if (!req.file) throw new Error('no file!')
            
            let filename = 'courses/' + Date.now() + '.' + req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            //upload first,then turn into JSON,then save in db

            //make excel file into stream
            const stream = fs.createReadStream(req.file.path)
            let uploadExcel = await uploader(filename, stream)
                .then()
                .catch(err => {
                    throw new Error(`something wrong when upload ${filename}`)
                })
            if (uploadExcel.code === 200 || 304) {
                //upload successfully

                //const workSheetsFromFile = xlsx.parse('http://ov6ie3kzo.bkt.clouddn.com/' + filename)
                const workSheetsFromFile = xlsx.parse(req.file.path)
                var datas = workSheetsFromFile[0].data
                var rObj = {}
                datas.splice(0, 3)


                datas.map(function (currentValue, index, array) {
                    for (let i = 0; i < currentValue.length; i++) {

                        if (currentValue[i]) {
                            let newdata = currentValue[i].split('\n')
                            if (newdata) {
                                if (newdata[2]) {
                                    rObj[newdata[1]] = newdata[2].replace(/\([^\)]*\)/, '')
                                }

                            }


                        }

                    }


                })

                console.dir(rObj)
                for (let key in rObj) {
                    console.log(key)
                   let course =  await Course.addCourse({
                        userId: ObjectId(req.user._id),
                        course: key,
                        teacher: rObj[key]

                    })
                    
                }
                let courses = await Course.getCourseName(ObjectId(req.user._id))
                return {
                    code: 0,
                    userId: req.user._id,
                    courses: courses,
                  }


               




            }



        })()
            .then(data => {
                res.json(data)
            })
            .then(fs.unlink(req.file.path, (err)=>{//上传完成后删除服务器上的文件
              if (err) { throw new Error(err)}

            }))
            .catch(err => {
                next(err)
            })

    })

module.exports = router;