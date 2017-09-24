const User = require('../models/mongo/user')
const Topic = require('../models/mongo/topic')
const like = require('../models/mongo/like')


async function likeTopic(userId, attachedId){
    await User.incrPoints(userId, 5)

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