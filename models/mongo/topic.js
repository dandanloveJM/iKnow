const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReplySchema = new Schema({
    creator: Schema.Types.ObjectId,
    content: String,
    createTime: {type: Number, default: Date.now().valueOf()}
})

const TopicSchema = new Schema({
    creator: { type: String, required: true },
    content: { type: String },
    title: { type: String },
    replyList: [ReplySchema],
    tags: [{type: String}],
    courseTag: {type: String},
    createTime: {type: Number, default: Date.now().valueOf()}
})

const TopicModel = mongoose.model('topic', TopicSchema)

async function createANewTopic(params) {
    console.log(params.tags)
    const topic = new TopicModel({
        creator: params.creator,
        title: params.title,
        content: params.content,
        tags: params.tags,
        courseTag:params.courseTag
    },
        //{ $push: { tags: { content: params.tags } } },
    )
    return await topic.save()
        .catch(e => {
            throw new Error(`error ${params.creator}creating topic `)
        })



}


async function getTopics (params = { page: 0, pageSize: 30 }) {
    let flow = TopicModel.find({}).sort({_id:-1})
    flow.skip(params.page * params.pageSize)
    flow.limit(params.pageSize)
    return await flow
        .catch(e => {
            console.log(e)
            throw new Error('error getting topics from db')
        })
}


async function getTopicById (topicId) {

    return await TopicModel.find({ _id: topicId })
        .catch(e => {
            console.log(e)
            throw new Error(`error getting topic by ID ${topicId}`)
        })
}

async function updateTopicById(topicId, update) {
    return await TopicModel.findOneAndUpdate({ _id: userId }, update, { new: true })
        .catch(e => {
            console.log(e)
            throw new Error(`error updating topic by id ${userId}`)
        })

}

async function replyATopic(params) {
    return await TopicModel.findOneAndUpdate({ _id: params.topicId },
        { $push: { replyList: { creator: params.creator, content: params.content } } },
        { new: true })
        .catch(e => {

            throw new Error(`error reply topic ${params.topicId}`)
        })
}

async function tagATopic(params) {
    return await TopicModel.findOneAndUpdate({ _id: params.topicId },
        { $push: { tags: { content: params.content } } },
        { new: true })
        .catch(e => {

            throw new Error(`error tag topic ${params.topicId}`)
        })
}


module.exports = {
    TopicModel,
    createANewTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    replyATopic,
    tagATopic,
}