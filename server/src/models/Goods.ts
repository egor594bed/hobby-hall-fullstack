import { Schema, model, Types } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  article: { type: String, required: true, unique: true },
  imgSrc: { type: String },
  quantity: { type: Number, required: true },
  subCategoryId: { type: Types.ObjectId, required: true },
});

export default model("Goods", schema, "goods");
