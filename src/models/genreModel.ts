import mongoose, { Schema } from "mongoose";

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

export const Genre = mongoose.model("Genre", GenreSchema);
