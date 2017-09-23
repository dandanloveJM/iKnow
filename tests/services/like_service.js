const LikeService = require('../../services/like_service')
const {expect} = require('chai')
const User = require('../../models/mongo/user')
const sinon = require('sinon')

describe('likeService#likeTopic', async ()=>{
    //首先看用户有没有点过赞
    //加分
    let User 
    beforeEach(async ()=>{
        User = {
            incrPointsCalled: false,
            'incrPoints': (userId, points)=>{
                this.incrPointsCalled = true
            }
        }
    })

    afterEach(async ()=>{
        User = null
    })
    it('should add 10 points to user when topic is liked', async ()=>{
        await LikeService.likeTopic('userid', 'attachedid')
        expect(User.incrPointsCalled).to.be.true
    })
})