import { getLang, hasLang, setLang } from "../cache.js";
import LanguageModel from "../models/language.model.js";
import { sendResponse } from "../utils/response.js";

async function getLanguageId(lang) {
  if (hasLang(lang)) return getLang(lang);
  const language = await LanguageModel.findOne({ name: lang });
  if (!language) return null;
  setLang(language.name, language._id);
  return language._id;
}

async function createLanguage(lang) {
  const language = await LanguageModel.create({ name: lang });
  setLang(language.name, language._id);
  return language;
}

async function getOrCreateLanguage(lang) {
  let langId = await getLanguageId(lang);
  if (!langId) {
    const language = createLanguage(lang);
    langId = language._id;
  }
  return langId;
}

async function getAllLanguage(_, res) {
  const languages = await LanguageModel.find({});
  return sendResponse(res, 200, null, languages);
}

export { getLanguageId, getOrCreateLanguage, getAllLanguage };
