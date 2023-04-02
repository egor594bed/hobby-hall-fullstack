const {Schema, model} = require('mongoose')

const schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    isActivated: {type: Boolean, default: true},
    // activationLink: {type: String}
})

module.exports = model('User', schema)