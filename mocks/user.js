const User = {
    incrPointsCalled: false,
    
    'incrPoints': async function(userId, points){
        this.incrPointsCalled = true
    }
}

module.exports = User