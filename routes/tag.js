const express = require('express');
const router = express.Router();
const Tag = require('../models/mongo/tag')
const TagService = require('../services/jieba_service')


/* localhost:8082/tag/ */
router.route('/')
.post((req, res, next)=>{
    (async () => {
        let result = await TagService.getTags(req.body.title)
        console.dir(result)
        return {
          code: 0,
          course: result.course,
          tags: result.tags
        
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