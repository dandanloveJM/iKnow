const User = {
    incrPointsCalled: false,
    calledWithPoints: undefined,
    'incrPoints': async function(userId, points){
        this.incrPointsCalled = true
        this.calledWithPoints = points
    }
}

module.exports = User