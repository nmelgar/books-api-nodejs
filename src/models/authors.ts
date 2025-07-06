import mongoose, { Document, Model, Schema } from "mongoose";

export interface AuthorDocument extends Document {
  name: string;
  bio?: string;
  birthDate?: string;
}

const authorSchema = new Schema<AuthorDocument>({
  name: { type: String, required: true },
  bio: String,
  birthDate: String,
});

// Prevent model overwrite in dev watch mode
const Author: Model<AuthorDocument> = mongoose.models.Author || mongoose.model<AuthorDocument>("Author", authorSchema);

export default Author;
