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
    dest: path.join(__dirname, '../public/upload/course'),
    limits: {
        fileSize: bytes('2MB')
    },
    fileFilter: function (req, files, callback) {
        //只能上传xlsx格式的文件

        const filetype = files.originalname.split('.')[files.originalname.split('.').length - 1]
        const validType = 'xlsx'
        callback(null, validType)
    }
})

const stream = require('stream')
var bufferStream = new stream.PassThrough();

/* localhost:8082/course/ */

router.route('/')

    /**
       * @api {POST} /course upload course
       * @apiName upload course
       * @apiGroup Course
       *
       * @apiParam {file} file user's course
       
       *  @apiHeader {String} Content-Type multipart/form-data
       * @apiHeader {String} Authorization bearer `token`
        * 
        * @apiHeaderExample {json} Header-Example:
        *    {
        *       "Content-Type": "multipart/form-data",
        *       "Authorization" : "bearer `token`"
        *     }
        * 
       * @apiSuccess {Number} code 0 represents "successful repsonse"
       * @apiSuccess {ObjectId} userId userId
       * @apiSuccess {Array} courses  include coursename and teacher
       *
       * @apiSuccessExample Success-Response:
       *     HTTP/1.1 200 OK
       *     {
       *        "code": 0,
       *        "userId": "5abe3f7969c9d9111be87ef6",
       *        "courses": [
       *            {
       *                "course": "多媒体技术及其应用",
       *                "teacher": "阮新新"
       *            },
       *            {
       *                "course": "信息安全",
       *                "teacher": "刘雅琦"
       *            },
       *            {
       *                 "course": "信息科学前沿",
       *                "teacher": "叶焕倬"
       *            },
       *            {
       *                "course": "网站与网页设计",
       *                "teacher": "李玲"
       *            },
       *            {
       *                 "course": "专业综合设计",
       *                "teacher": "屈振新"
       *             }
       *            ]
       *      }
       *        
       *     
       *
       * @apiError ErrorUploadAvatar Error uploading course
       *
       * @apiErrorExample Error-Response:
       *     HTTP/1.1 404 Not Found
       *     {
       *       "error": "something wrong when upload course"
       *     }
       */
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
                //const stream2 = fs.createReadStream('http://ov6ie3kzo.bkt.clouddn.com/' + filename)
                //const workSheetsFromFile = xlsx.parse(fs.readFileSync('http://ov6ie3kzo.bkt.clouddn.com/' + filename))
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

                //console.dir(rObj)
                for (let key in rObj) {

                    let course = await Course.addCourse({
                        userId: ObjectId(req.user._id),
                        course: key,
                        teacher: rObj[key]

                    })

                }
                let courses = await Course.getCourseByuserId(ObjectId(req.user._id))
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
            // .then(fs.unlink(req.file.path, (err)=>{//上传完成后删除服务器上的文件
            //   if (err) { throw new Error(err)}

            // }))
            .catch(err => {
                next(err)
            })

    })

    .get(auth({ loadUser: true }), (req, res, next)=>{
        (async () => {
            let courses = await Course.getCourseByuserId(req.user._id) 
            return {
              code: 0,
              courses: courses,
            }
          })()
            .then(r => {
              res.json(r)
            })
            .catch(e => {
              next(e)
            })
    })

module.exports = router;