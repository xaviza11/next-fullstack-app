import { Schema, model, models } from "mongoose";

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default UsersSchema;
