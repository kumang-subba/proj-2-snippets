import SnippetModel from "../models/snippet.model.js";
import { sendCursorResponse, sendErrorResponse, sendResponse } from "../utils/response.js";
import { getLanguageId, getOrCreateLanguage } from "./language.controller.js";
import { getOrCreateTagIds, getTagIds } from "./tag.controler.js";

async function getAllSnippets(req, res) {
  try {
    let { lang, tags, limit, cursor } = req.query;
    limit = limit ? parseInt(limit) : 10;
    const query = {};
    if (cursor) query._id = { $gt: cursor };
    if (lang) {
      lang = lang.trim().toLowerCase();
      const langId = await getLanguageId(lang.toLowerCase().trim());
      if (!langId) return sendErrorResponse(res, 404, `No snippets with ${lang} exists`);
      query.langId = langId;
    }
    if (tags) {
      tags = tags.split(",");
      tags = tags.map((t) => t.trim().toLowerCase());
      const tagIds = await getTagIds(tags);
      if (!tagIds) return sendErrorResponse(res, 404, `No snippets with such tags exist`);
      query.tagIds = { $all: tagIds };
    }
    const allSnippets = await SnippetModel.find(query)
      .limit(limit + 1)
      .populate("lang")
      .populate("tags");
    const nextCursor = allSnippets.length > limit ? allSnippets[limit]._id : null;
    return sendCursorResponse(res, allSnippets, nextCursor);
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
}

async function getSnippetById(req, res) {
  try {
    const { id } = req.params;
    const snippet = await SnippetModel.findById(id).populate("lang").populate("tags");
    if (!snippet) return sendErrorResponse(res, 404, "Snippet does not exist");
    return sendResponse(res, 200, null, snippet);
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
}

async function createSnippet(req, res) {
  try {
    let { title, code, description, tags, lang } = req.body;
    let errors = [];
    if (!title || title.trim() === "") errors.push("Title is required");
    if (!code || code.trim() === "") errors.push("Code is required");
    if (!description || description.trim() === "") errors.push("Description is required");
    if (!tags || !Array.isArray(tags)) errors.push("Invalid tags");
    if (!lang || lang.trim() === "") errors.push("Lang is required");
    tags = tags.map((t) => t.trim().toLowerCase());
    lang = lang.trim().toLowerCase();
    const [tagIds, langId] = await Promise.all([getOrCreateTagIds(tags), getOrCreateLanguage(lang)]);
    const newSnippet = await SnippetModel.create({
      title,
      code,
      description,
      tagIds,
      langId,
    });
    if (!newSnippet) return sendErrorResponse(res, 500, "Could not create snippet");
    const createdSnippet = await SnippetModel.findById(newSnippet._id).populate("lang").populate("tags");
    return sendResponse(res, 201, "Successfully created snippet", createdSnippet);
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
}

async function updateSnippet(req, res) {
  try {
    const { id } = req.params;
    const exists = await SnippetModel.findById(id);
    if (!exists) return sendErrorResponse(res, 404, "Snippet does not exist");
    let { title, code, description, tags, lang } = req.body;
    if (!title && !code && !description && !lang && !tags) return sendErrorResponse(res, 400, "Need fields to update");
    const updates = {};
    const errors = [];
    if (title !== undefined) {
      if (title.trim() === "") errors.push("Title cannot be empty");
      else updates.title = title.trim();
    }
    if (code !== undefined) {
      if (code.trim() === "") errors.push("Code cannot be empty");
      else updates.code = code;
    }
    if (description !== undefined) {
      if (description.trim() === "") errors.push("Description cannot be empty");
      else updates.description = description.trim();
    }
    if (lang !== undefined) {
      if (lang.trim() === "") errors.push("Lang cannot be empty");
      else updates.langId = await getOrCreateLanguage(lang.trim().toLowerCase());
    }
    if (tags !== undefined) {
      if (!Array.isArray(tags)) errors.push("Tags must be an array");
      else {
        const normalizedTags = tags.map((t) => t.trim().toLowerCase());
        updates.tagIds = await getOrCreateTagIds(normalizedTags);
      }
    }
    if (errors.length > 0) {
      return sendErrorResponse(res, 400, errors.join(", "));
    }
    const updatedSnippet = await SnippetModel.findByIdAndUpdate(id, updates, { returnDocument: "after" })
      .populate("lang")
      .populate("tags");
    return sendResponse(res, 200, "Snippet updated successfully", updatedSnippet);
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
}

async function deleteSnippet(req, res) {
  try {
    const { id } = req.params;
    const deletedSnippet = await SnippetModel.findByIdAndDelete(id);
    if (!deletedSnippet) return sendErrorResponse(res, 404, "Snippet not found");
    return sendResponse(res, 200, "Snippet deleted successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
}

export { getAllSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet };
