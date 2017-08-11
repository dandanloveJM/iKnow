const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: number },
})

const UserModel = mongoose.model('user', UserSchema)

async function createANewUser(params) {
    const user = new UserModel({ name: params.name, age: params.age })
    await user.save()
        .then()
        .catch(e => {

        })
    return user
}
//1.出于安全性的考虑，一次只给一部分用户数据；2.给服务器减小压力
async function getUsers(params = { page: 0, pageSize: 10 }) {
    let flow = UserModel.find({})
    flow.skip(params.page * params.pageSize)
    flow.limit(params.pageSize)
    return await flow
    .catch(e=>{
        console.log(e)
        throw new Error('erroe getting users from db')
    })
}