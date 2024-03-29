import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  subCategories: { type: Array },
  imgSrc: { type: String, required: true },
});

export default model("Categories", schema);
