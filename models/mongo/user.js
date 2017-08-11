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
