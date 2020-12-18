import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      createIndexes: { unique: true }
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    avatarImage: {
      type: String,
      default: ""
    },
    createdAt: {
      type: String,
      default: ""
    },
    updatedAt: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const User = model("users", UserSchema);

export default User;
