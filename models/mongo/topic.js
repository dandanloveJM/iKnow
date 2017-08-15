const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReplySchema = new Schema({
    creator: Schema.Types.ObjectId,
    content: String
})
const TopicSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String },
    title: { type: String },
    replyList: [ReplySchema]
})

const TopicModel = mongoose.model('topic', TopicSchema)

async function createANewTopic(params) {
    const topic = new TopicModel({
        author: params.author,
        title: params.title,
        content: params.content,
    })
    return await topic.save()
        .catch(e => {
            throw new Error(`error creating topic ${author}`)
        })
}


async function getTopics(params = { page: 0, pageSize: 10 }) {
    let flow = TopicModel.find({})
    flow.skip(params.page * params.pageSize)
    flow.limit(params.pageSize)
    return await flow
        .catch(e => {
            console.log(e)
            throw new Error('error getting topics from db')
        })
}

async function getTopicById(topicId) {
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
            console.log(e)
            throw new Error(`error reply topic ${params.topicId}`)
        })
}

