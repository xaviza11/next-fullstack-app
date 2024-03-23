import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
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
    fullname: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;
