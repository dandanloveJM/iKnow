const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types
const User = require('./user')

const ReplySchema = new Schema({
    creator: Schema.Types.ObjectId,
    creatorName: String,
    content: String,
    createTime: { type: Number, default: Date.now().valueOf() },
    likes: {type: Number, default: 0}
})

const TopicSchema = new Schema({
    creator: { type: String, required: true },
    content: { type: String },
    title: { type: String },
    replyList: [ReplySchema],
    tags: [{ type: String }],
    courseTag: { type: String },
    createTime: { type: Number, default: Date.now().valueOf()},
    likes: {type: Number, default: 0},
    
})

const TopicModel = mongoose.model('topic', TopicSchema)

async function createANewTopic(params) {
  
    const topic = new TopicModel({
        creator: params.creator,
        title: params.title,
        content: params.content,
        tags: params.tags,
        courseTag: params.courseTag
    },
        //{ $push: { tags: { content: params.tags } } },
    )
    return await topic.save()
        .catch(e => {
            throw new Error(`error ${params.creator}creating topic `)
        })



}


async function getTopics(params = { page: 0, pageSize: 10 }) {
    let flow = TopicModel.find({},{title:1, courseTag:1, replyList:{"$slice":1}}).sort({ _id: -1})
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
    let user = await User.getUserById(params.creator)
    let topic =  await TopicModel.findOneAndUpdate({ _id: params.topicId },
        { $push: { replyList: { creator: params.creator, creatorName: user.name, content: params.content } } },
        { new: true })
        .catch(e => {

            throw new Error(`error reply topic ${params.topicId}`)
        })

        return topic
}

async function tagATopic(params) {
    return await TopicModel.findOneAndUpdate({ _id: params.topicId },
        { $push: { tags: { content: params.content } } },
        { new: true })
        .catch(e => {

            throw new Error(`error tag topic ${params.topicId}`)
        })
}

async function likeATopic(topicId) {
    console.log(topicId)
    const topic = await TopicModel.findByIdAndUpdate({_id: topicId}, {$inc:{likes:1}}, {new: true, fields: {likes:1}})
    return topic.likes
}

async function dislikeATopic(topicId) {
    console.log(topicId)
    const topic = await TopicModel.findByIdAndUpdate({_id: topicId}, {$inc:{likes:-1}}, {new: true, fields: {likes:1}})
    return topic.likes
}

async function likeAReply (replyId){
    const topic = await TopicModel.findOne({"replyList._id": replyId}, {"replyList._id":1,"replyList.likes":1})
    const reply = topic.replyList.find(e=>e._id.toString() === replyId.toString())
    reply.likes ++
    await topic.save()
    return reply.likes
}

async function dislikeAReply (replyId){
    const topic = await TopicModel.findOne({"replyList._id": replyId}, {"replyList._id":1,"replyList.likes":1})
    const reply = topic.replyList.find(e=>e._id.toString() === replyId.toString())
    reply.likes --
    await topic.save()
    return reply.likes
}

async function getTopicCreator(topicId){
    const topic = await TopicModel.findOne({"_id": topicId}, {"creator": 1})
   
    let creator = topic.creator.split('\n') // 因为数据库里的creator是字符串类型的所以要这样做
    return creator[0].substring(7, creator[0].length-1)
    // let creator = topic.creator
    // let creatorId = topic.creator['_id']
    // return creatorId

}

async function getReplyCreator(replyId){
    const topic = await TopicModel.findOne({"replyList._id": replyId}, {"replyList._id":1, "replyList.creator": 1})
    const reply = topic.replyList.find(e=>e._id.toString() === replyId.toString())
    let a = reply.creator
    return reply.creator

}

async function findTopic(word){
    let regex = new RegExp(escapeRegex(word), 'gi')
    let topics = await TopicModel.find({'courseTag': regex})
    return topics
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
    TopicModel,
    createANewTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    replyATopic,
    tagATopic,
    likeATopic,
    likeAReply,
    dislikeAReply,
    dislikeATopic,
    getTopicCreator,
    getReplyCreator,
    findTopic
}