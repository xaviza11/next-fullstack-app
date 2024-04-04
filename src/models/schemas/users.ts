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
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  {
    timestamps: true,
  }
);

export default UsersSchema;
