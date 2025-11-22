import { model, Schema } from "mongoose";

export const LanguageSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
});

LanguageSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const LanguageModel = model("Language", LanguageSchema);

export default LanguageModel;
