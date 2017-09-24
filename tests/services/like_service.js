require('../../models/mongo/user')
require('../../mocks/user')
require.cache['/home/mcavoy/myexpress/myapp/models/mongo/user.js'] =
    require.cache['/home/mcavoy/myexpress/myapp/mocks/user.js']

const User = require('../../mocks/user')
const LikeService = require('../../services/like_service')
const { expect } = require('chai')
const sinon = require('sinon')
const { ObjectId } = require('mongoose').Types

describe('likeService#likeTopic', async () => {
    let userId = new ObjectId()

    //首先看用户有没有点过赞
    //加分
    //测试开始前设为false
    beforeEach(async () => {
        User.incrPointsCalled = false
    })
    //测试结束后重新设为初始状态
    afterEach(async () => {
        User.incrPointsCalled = false
    })

    it('should called User.incrPoints with an valid objectId', async () => {
        await LikeService.likeTopic(userId, 'attachedId')
    })
    //当userid不合法时就抛出一个错误
    it('should throw an error when invalid userId passed', async () => {
        await LikeService.likeTopic('', 'attachedId')
        .catch(e=>{
            expect(e).not.to.be.undefined
        })
    })

    it('should called User.incrPoints when topic is liked', async () => {
        await LikeService.likeTopic(userId, 'attachedId')
        expect(User.incrPointsCalled).to.be.true
    })
    it('should called User.incrPoints with 10 points', async () => {
        await LikeService.likeTopic(userId, 'attachedId')
        expect(User.calledWithPoints).to.equal(10)
    })


})