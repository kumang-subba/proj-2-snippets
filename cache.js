import LanguageModel from "./models/language.model.js";
import TagModel from "./models/tag.model.js";

const cache = {
  languages: new Map(),
  tags: new Map(),
};

function hasLang(lang) {
  return cache.languages.has(lang);
}

function getLang(lang) {
  return cache.languages.get(lang);
}

function setLang(lang, id) {
  return cache.languages.set(lang, id);
}

function hasTag(tag) {
  return cache.tags.has(tag);
}

function getTag(tag) {
  return cache.tags.get(tag);
}

function setTag(tag, id) {
  return cache.tags.set(tag, id);
}

function getTags(tags) {
  let tagIds = [];
  for (let i = 0; i < tags.length; i++) {
    if (!cache.tags.has(tags[i])) return null;
    else tagIds.push(cache.tags.get(tags[i]));
  }
  return tagIds;
}

async function initCache() {
  const [languages, tags] = await Promise.all([LanguageModel.find({}), TagModel.find({})]);
  for (const lang of languages) {
    setLang(lang.name, lang._id);
  }
  for (const tag of tags) {
    setTag(tag.name, tag._id);
  }
}

export { hasLang, getLang, setLang, hasTag, getTag, setTag, getTags, initCache };
