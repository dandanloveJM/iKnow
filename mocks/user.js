const {ObjectId} = require('mongoose').Types

const User = {
    incrPointsCalled: false,
    calledWithPoints: undefined,
    'incrPoints': async function(userId, points){
        if(!userId instanceof ObjectId) throw new Error('userId should be an objectId')
        this.incrPointsCalled = true
        this.calledWithPoints = points
    }
}

module.exports = User