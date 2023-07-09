import { Schema, model } from "mongoose";

const schema = new Schema({
  imgSrc: { type: String, require },
});

export default model("promoSliders", schema, "promoSliders");
