import {Schema, model} from 'mongoose'

 const schema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    link: {type: String, required: true}
})

export default model('ActivationLink', schema)