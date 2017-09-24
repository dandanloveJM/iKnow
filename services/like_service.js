const User = require('../models/mongo/user')
const Topic = require('../models/mongo/topic')
const like = require('../models/mongo/like')
const {ObjectId} = require('mongoose').Types

async function likeTopic(userId, attachedId){
    await User.incrPoints(ObjectId(userId), 10)

}
async function likeReply(userId, attachedId){

}
async function dislikeTopic(userId, attachedId){
    
}
async function dislikeReply(userId, attachedId){

}
module.exports = {
    likeReply,
    likeTopic,
    dislikeReply,
    dislikeTopic,
}