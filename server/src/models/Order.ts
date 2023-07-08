import { Schema, model } from "mongoose";

const schema = new Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  productsArr: { type: Array, required: true },
  clientComment: { type: String },
  comment: { type: String },
  deliveryId: { type: String, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, required: true },
});

export default model("Order", schema, "orders");
