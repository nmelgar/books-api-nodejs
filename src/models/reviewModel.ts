import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    bookId: {
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: "Book",
      // required: true,
    },
    // reviewerName: {
    //   type: String,
    //   required: true,
    // },
    // rating: {
    //   type: Number,
    //   required: true,
    //   min: 1,
    //   max: 5,
    // },
    comment: {
      type: String,
    },
  },
  {
    // timestamps: true,
    versionKey: false,
  }
);

export const Review = mongoose.model("Review", ReviewSchema);
