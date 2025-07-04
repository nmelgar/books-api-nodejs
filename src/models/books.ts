import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      // uncomment the types and refs as required once the other collections are created
      type: String,
      //   required: true,
    },
    authorId: {
      //   type: Schema.Types.ObjectId,
      //   ref: "Author",
      type: String,
      //   required: true,
    },
    genreId: {
      //   type: Schema.Types.ObjectId,
      //   ref: "Genre",
      type: String,
      //   required: true,
    },
    publishedYear: {
      type: Number,
    },
    isbn: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    description: {
      type: String,
    },
    reviews: {
      // type: Schema.Types.ObjectId,
      type: String,
      // ref: "Review",
    },
  },
  {
    versionKey: false,
  }
);

export const Book = mongoose.model("Book", BookSchema);
