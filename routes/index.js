import { Router } from "express";
import {
  createSnippet,
  deleteSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
} from "../controllers/snippet.controller.js";
import { getAllLanguage } from "../controllers/language.controller.js";

const router = Router();

router.get("/getall", getAllSnippets);
router.post("/add", createSnippet);
router.patch("/update/:id", updateSnippet);
router.put("/update/:id", updateSnippet);
router.delete("/delete/:id", deleteSnippet);
router.get("/languages", getAllLanguage);
router.get("/:id", getSnippetById);

export default router;
