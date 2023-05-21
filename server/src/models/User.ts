import {Schema, model} from 'mongoose'

const schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    isActivated: {type: Boolean, default: true},
    // activationLink: {type: String}
})

export default model('User', schema)