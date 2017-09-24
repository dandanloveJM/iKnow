require('../../models/mongo/user')
require('../../mocks/user')
require.cache['/home/mcavoy/myexpress/myapp/models/mongo/user.js'] = 
require.cache['/home/mcavoy/myexpress/myapp/mocks/user.js']

const User = require('../../models/mongo/user')

const LikeService = require('../../services/like_service')
const { expect } = require('chai')

const sinon = require('sinon')

describe('likeService#likeTopic', async () => {
    //首先看用户有没有点过赞
    //加分
    //测试开始前设为false
    beforeEach(async()=>{
        User.incrPointsCalled = false
    })
    //测试结束后重新设为初始状态
    afterEach(async ()=>{
        User.incrPointsCalled = false
    })
    it('should called incrPoints when topic is liked', async () => {
        await LikeService.likeTopic('userid', 'attachedid')
        expect(User.incrPointsCalled).to.be.true
    })
})