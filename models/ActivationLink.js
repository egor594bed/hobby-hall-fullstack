const {Schema, model} = require('mongoose')

const schema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    link: {type: String, required: true}
})

module.exports = model('ActivationLink', schema)