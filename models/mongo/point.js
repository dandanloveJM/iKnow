const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Errors = require('../../errors')
const logger = require('../../utils/logger')
const {ObjectId} = Schema.Types

const PointsOpSchema = Schema({
    userId:{type:ObjectId, required:true, index:true},
    points:{type:Number, required:true},
    timeStamp:{type:Number, default:Date.now().valueOf()},
    type:{type: String, enum:['like, dislike, reply']},
})

const POINTS_OP_TYPES = {
    LIKE:'like',
    DISLIKE: 'dislike',
    REPLY:'reply'
}

const PointsOpModel = mongoose.model('point', PointsOPSchema)

async function createPointsOp(userId, type, points){
    const op = await PointsOpModel.create({
        userId,
        type,
        points
    })
    .catch(e=>{
        logger.error('error createing points op', {err: e.stack||e})
        throw Errors.InternalError('error creating points op')
    })

    return op
}

module.exports = {
    model: PointsOpModel,
    createPointsOp: createPointsOp,

}