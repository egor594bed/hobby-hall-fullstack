import {Schema, model} from 'mongoose'

const schema = new Schema ({
    name: {type: String, required: true},
    categoryId: {type: String, required: true}
})

export default model('subCategories', schema, 'subCategories')