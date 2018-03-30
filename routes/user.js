const express = require('express');
const router = express.Router();
const User = require('../models/mongo/user')
const auth = require('../middlewares/auth_user')
const multer = require('multer')
const path = require('path')
const bytes = require('bytes')
const HOST = process.env.NODE_ENV === 'production' ? 'http://some.host/' : 'http://localhost:8082'
const fs = require('fs')
const uploader = require('../services/qiniu').uploader
const upload = multer({
  //storage: multer.memoryStorage(),
  dest: path.join(__dirname, '../public/upload'),
  limits: {
    fileSize: bytes('2MB')
  },
  fileFilter: function(req, files, callback){
    //只能上传jgp,png,jpeg格式的文件
    const filetype = files.mimetype.split('/')[1]
    const validType = 'jpeg|jpg|png'.indexOf(filetype) !== -1
    callback(null, validType)
  }
})

const stream = require('stream')
var bufferStream = new stream.PassThrough();


/* localhost:8082/user/ */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      let users = await User.getUsers()
      return {
        code: 0,
        users: users,
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })

  })
  .post((req, res, next) => {
    (async () => {
      let users = await User.createANewUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      
      })
      return {
        code: 0,
        users: users,
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })


  })
//localhost:8082/user/dandan
router.route('/:id')
  .get((req, res, next) => {
    (async () => {
      let user = await User.getUserById(req.params.id)
      return {
        code: 0,
        user: user,
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })
  })//上传头像接口
  .post(auth(), upload.single('avatar'), (req, res, next) => {
    (async () => {
      console.dir(req.file)
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
        let user = await User.updateUserById(req.params.id, {
          avatar: 'http://ov6ie3kzo.bkt.clouddn.com/' + filename
        })
        return {
          code: 0,
          user: user
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
  .patch(auth(), (req, res, next) => {
    (async () => {
      //如果更新时为部分更新，即只更新名字或者年龄时
      let update = {}
      if (req.body.name) update.name = req.body.name
      if (req.body.age) update.age = req.body.age
      if (req.body.email) update.email = req.body.email
      if (req.body.password) update.password = req.body.password

      let user = await User.updateUserById(req.params.id, update)
          return {
            code: 0,
            user: user
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
