
// require('../../mocks/user')
// require.cache['/home/mcavoy/myexpress/myapp/models/mongo/user.js'] =
//     require.cache['/home/mcavoy/myexpress/myapp/mocks/user.js']

let User = require('../../models/mongo/user')
const LikeService = require('../../services/like_service')
const { expect } = require('chai')
const sinon = require('sinon')
const { ObjectId } = require('mongoose').Types

describe('likeService#likeTopic', async () => {
    let userId = new ObjectId()
    let mockUser
    //测试开始前
    beforeEach(async () => {
        mockUser = sinon.mock(User)    //用sinon.mock模拟user对象
    })
    //测试结束后重新设为初始状态
    afterEach(async () => {
        mockUser.restore()
    })

    it('should called User.incrPoints with an valid objectId', async () => {
        let expect = mockUser.expects('incrPoints').withArgs(ObjectId(userId), 10)
        await LikeService.likeTopic(userId, 'attachedId')
        expect.verify()
        
    })
    //当userid不合法时就抛出一个错误
    it('should throw an error when invalid userId passed', async () => {
        await LikeService.likeTopic('', 'attachedId')
        .catch(e=>{
            expect(e).not.to.be.undefined
        })
    })

    it('should called User.incrPoints when topic is liked', async () => {
        let expect = mockUser.expects('incrPoints').once()
        await LikeService.likeTopic(userId, 'attachedId')
        expect.verify()
    })
    //测试是否点赞后用户加10分
    it('should called User.incrPoints with 10 points', async () => {
        let expect = mockUser.expects('incrPoints').withArgs(ObjectId(userId), 10)
        await LikeService.likeTopic(userId, 'attachedId')
        expect.verify()
    })


})