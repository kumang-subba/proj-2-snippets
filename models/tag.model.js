import { model, Schema } from "mongoose";

export const TagSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
});

TagSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const TagModel = model("Tag", TagSchema);

export default TagModel;
