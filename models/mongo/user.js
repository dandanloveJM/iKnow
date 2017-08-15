const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bluebird = require('bluebird')
const crypto = require('crypto')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
const SALT = require('../../cipher').PASSWORD_SALT


const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, max: 90, min: [1, 'nobody could be younger than 1 year old'] },
    password: { type: String, required: true },
    phoneNumber: { type: String }

})
//password在创建用户之后不返回显示出来，0表示不显示，phoneNUmber表示降序排列
//类似的功能还有在问题列表页时，问题的replylist也不用显示
//{password:0, phoneNumber:-1}不能混写～mongodb会报错～
const DEFAULT_PROJECTION = { password: 0}

const UserModel = mongoose.model('user', UserSchema)

async function createANewUser(params) {
    const user = new UserModel({ name: params.name, age: params.age })

    user.password = await pbkdf2Async(params.password, SALT, 512, 128, 'sha512')
        .then(r => r.toString())
        .catch(e => {
            console.log(e)
            throw new Error(`something goes wrong inside the server`)
        })

    let createdUser = await user.save()
        .then()
        .catch(e => {
            console.log(e)
            switch (e.code) {
                case 11000:
                    throw new Error('Someone has picked that name, choose another name!')
                    break
                default:
                    throw new Error(`error creating user ${JSON.stringify(params)}`)
                    break

            }

        })

    return {
        _id: createdUser._id,
        name: createdUser.name,
        age: createdUser.age,
        phoneNumber: createdUser.phoneNumber
    }

}
//1.出于安全性的考虑，一次只给一部分用户数据；2.给服务器减小压力
async function getUsers(params = { page: 0, pageSize: 10 }) {
    let flow = UserModel.find({})
    flow.select(DEFAULT_PROJECTION)
    flow.skip(params.page * params.pageSize)
    flow.limit(params.pageSize)
    return await flow
        .catch(e => {
            console.log(e)
            throw new Error('error getting users from db')
        })
}

async function getUserById(userId) {
    return await UserModel.findOne({ _id: userId })
        .select(DEFAULT_PROJECTION)
        .catch(e => {
            console.log(e)
            throw new Error(`error getting user by id ${userId}`)
        })
}

async function updateUserById(userId, update) {
    return await UserModel.findOneAndUpdate({ _id: userId }, update, { new: true })
        .catch(e => {
            console.log(e)
            throw new Error(`error updating user by id ${userId}`)
        })

}

module.exports = {
    model: UserModel,
    createANewUser,
    getUsers,
    getUserById,
    updateUserById
}