import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const User = mongoose.model("User", UsersSchema);
