const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: { type: String, required: [true, 'Name is Required'] },
    email: { type: String, required: [true, 'Email is Required'], unique: true },
    role: { type: String, required: [true, 'Role is Required'] },
    password: { type: String, required: [true, 'Password is Required'] },
    img: { type: String },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
})

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject()

    return user
}

module.exports = model('User', UserSchema)
