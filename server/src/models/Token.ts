import {Model, Schema, model} from 'mongoose'

const schema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true}
})

export default model('Token', schema)