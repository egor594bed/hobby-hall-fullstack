import {Schema, model} from 'mongoose'
import SubCategories from './SubCategories'

const schema = new Schema ({
    name: {type: String, required: true},
    subCategories: {type: Array}
})

export default model('Categories', schema)