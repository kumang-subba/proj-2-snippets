import { getTag, getTags, hasTag, setTag } from "../cache.js";
import TagModel from "../models/tag.model.js";

async function getTagIds(tags) {
  const tagsInCache = getTags(tags);
  if (tagsInCache) return tagsInCache;
  const dataTags = await TagModel.find({ name: { $in: tags } });
  const tagIds = [];
  for (const t of dataTags) {
    setTag(t.name, t._id);
    tagIds.push(t._id);
  }
  if (dataTags.length !== tags.length) return null;
  return tagIds;
}

async function getOrCreateTag(tag) {
  if (hasTag(tag)) return getTag(tag);
  const exists = await TagModel.findOne({ name: tag });
  if (exists) {
    setTag(exists.name, exists._id);
    return exists._id;
  }
  const newTag = await TagModel.create({ name: tag });
  setTag(newTag.name, newTag._id);
  return newTag._id;
}

async function getOrCreateTagIds(tags) {
  let tagIds = await getTagIds(tags);
  if (!tagIds) {
    tagIds = [];
    for (const tag of tags) {
      const tagId = await getOrCreateTag(tag);
      tagIds.push(tagId);
    }
  }
  return tagIds;
}

export { getTagIds, getOrCreateTagIds };
