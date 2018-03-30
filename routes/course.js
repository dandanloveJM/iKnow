const express = require('express');
const router = express.Router();
const User = require('../models/mongo/user')
const auth = require('../middlewares/auth_user')
const multer = require('multer')
const path = require('path')
const bytes = require('bytes')
const HOST = process.env.NODE_ENV === 'production' ? 'http://some.host/' : 'http://localhost:8082'
const fs = require('fs')
const xlsx = require('node-xlsx')
const uploader = require('../services/qiniu').uploader
const upload = multer({
    //storage: multer.memoryStorage(),
    dest: path.join(__dirname, '../public/upload/course'),
    limits: {
        fileSize: bytes('2MB')
    },
    fileFilter: function (req, files, callback) {
        //只能上传xlsx格式的文件
        const filetype = files.mimetype.split('/')[1]
        const validType = 'xlsx'.indexOf(filetype) !== -1
        callback(null, validType)
    }
})

const stream = require('stream')
var bufferStream = new stream.PassThrough();

/* localhost:8082/course/ */
router.route('/')
    .post(auth({ loadUser: true }), upload.single('file'), (req, res, next) => {
        (async () => {
            var exceltojson;
            console.dir(req.file)
            if (!req.file) throw new Error('no file!')
            if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            }
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
                console.log('xxxxxxx')

            }
            try {
                // exceltojson({
                //     xlsx.parse(req.file.path),
                //     output: null, //since we don't need output.json
                //     lowerCaseHeaders:true
                // }, function(err,result){
                //     if(err) {
                //         return res.json({error_code:1,err_desc:err, data: null});
                //     } 
                //     res.json({error_code:0,err_desc:null, data: result});
                // });
                var courseJSON = await xlsx.parse(req.file.path)
                    .then(r => {

                    })
                    .catch(e => {

                    })
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
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