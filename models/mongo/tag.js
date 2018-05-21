const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Errors = require('../../errors')
const logger = require('../../utils/logger').logger
const { ObjectId } = Schema.Types

const TagSchema = Schema({
    course: { type: String },
    tags: { type: Array }

})

const TagModel = mongoose.model('tag', TagSchema)

async function getCourse(params) {
    return await TagModel.find({ 'tags': { $in: params } })
        .catch(e => {
            console.log(e)
            throw new Error("没有找到相应的课程哦")
        })

}

module.exports = {
    model: TagModel,
    getCourse
}