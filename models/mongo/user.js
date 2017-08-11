const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, max: 90, min: [1, 'nobody could be younger than 1 year old'] },
})

const UserModel = mongoose.model('user', UserSchema)

async function createANewUser(params) {
    const user = new UserModel({ name: params.name, age: params.age })
    return await user.save()
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

}
//1.出于安全性的考虑，一次只给一部分用户数据；2.给服务器减小压力
async function getUsers(params = { page: 0, pageSize: 10 }) {
    let flow = UserModel.find({})
    flow.skip(params.page * params.pageSize)
    flow.limit(params.pageSize)
    return await flow
        .catch(e => {
            console.log(e)
            throw new Error('error getting users from db')
        })
}

async function getUserById(userId) {
    return await UserModel.find({ _id: userId })
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