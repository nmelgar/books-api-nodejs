import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },

    // uncomment the types and refs as required once the Book collection is created
    books: [
      {
        // type: Schema.Types.ObjectId,
        // ref: "Book",
        type: String, // Keeping it as String for now, similar to your BookModel
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Author = mongoose.model("Author", AuthorSchema);
