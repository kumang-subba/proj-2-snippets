import { model, Schema } from "mongoose";

export const SnippetSchema = new Schema({
  title: { type: String, required: true, trim: true },
  code: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  tagIds: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  langId: { type: Schema.Types.ObjectId, ref: "Language", required: true },
});

SnippetSchema.virtual("tags", {
  ref: "Tag",
  localField: "tagIds",
  foreignField: "_id",
});

SnippetSchema.virtual("lang", {
  ref: "Language",
  localField: "langId",
  foreignField: "_id",
  justOne: true,
});

SnippetSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.tagIds;
    delete ret.langId;
    return ret;
  },
});

const SnippetModel = model("Snippet", SnippetSchema);

export default SnippetModel;
