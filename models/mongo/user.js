const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bluebird = require('bluebird')
const crypto = require('crypto')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
const SALT = require('../../cipher').PASSWORD_SALT
const Errors = require('../../errors')
const Logger = require('../../utils/logger').logger

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // age: { type: Number, max: 90, min: [1, 'nobody could be younger than 1 year old'] },
    password: { type: String, required: true },
    avatar: { type: String },
    points: { type: Number },
    course: { type: String },
    teacher: { type: String },
    points: Number,
})
//password在创建用户之后不返回显示出来，0表示不显示，phoneNUmber表示降序排列
//类似的功能还有在问题列表页时，问题的replylist也不用显示
//{password:0, phoneNumber:-1}不能混写～mongodb会报错～
const DEFAULT_PROJECTION = { password: 0, __v: 0 }

const UserModel = mongoose.model('user', UserSchema)

async function createANewUser(params) {
    const user = new UserModel({ name: params.name, email: params.email })

    user.password = await pbkdf2Async(params.password, SALT, 512, 128, 'sha512')
        .then(r => r.toString())
        .catch(e => {
            Logger.error('error pbkdf2 password', e)
            throw new Errors.InternalError(`something goes wrong inside the server`)
        })

    let createdUser = await user.save()
        .then()
        .catch(e => {
            Logger.error('error createing user', e)
            switch (e.code) {
                case 11000:
                    throw new Errors.DuplicateUsernameError(params.name)
                    break
                default:
                    throw new Errors.ValidationError('user', `error creating user ${JSON.stringify(params)}`)
                    break

            }

        })

    return {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
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
        .select(DEFAULT_PROJECTION)
        .catch(e => {
            console.log(e)
            throw new Error(`error updating user by id ${userId}`)
        })

}
//目前假设手机号是用户的唯一标识符
async function login(email, password) {
    //因为存在数据库里的password是加密过的，所以这里验证的时候需要将用户输入的密码加密之后，再与数据库里的对比
    const UserPassword = await pbkdf2Async(password, SALT, 512, 128, 'sha512')
        .then(r => r.toString())
        .catch(e => {
            console.log(e)
            throw new Errors.InternalError(`something goes wrong inside the server`)
        })

    const user = await UserModel.findOne({ email: email, password: UserPassword })
        .select(DEFAULT_PROJECTION)
        .catch(e => {
            console.log(`error logging in , email ${email}`, { err: e.stack || e });
            throw new Error(`something goes wrong inside the server`)
        })

    if (!user) throw Error('No such user')
    return user

}

async function incrPoints(userId, points) {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { points: points } }, { new: true, field: points })
    return user.points
}

module.exports = {
    model: UserModel,
    createANewUser,
    getUsers,
    getUserById,
    updateUserById,
    login,
    incrPoints
}