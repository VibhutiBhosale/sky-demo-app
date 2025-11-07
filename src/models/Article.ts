// src/models/Article.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IArticle extends Document {
  title: string;
  excerpt?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent model overwrite on HMR / dev reload
const Article: Model<IArticle> =
  (mongoose.models.Article as Model<IArticle>) || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
