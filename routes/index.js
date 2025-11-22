import { Router } from "express";
import {
  createSnippet,
  deleteSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
} from "../controllers/snippet.controller.js";

const router = Router();

router.get("/getall", getAllSnippets);
router.get("/:id", getSnippetById);
router.post("/add", createSnippet);
router.patch("/update/:id", updateSnippet);
router.put("/update/:id", updateSnippet);
router.delete("/delete/:id", deleteSnippet);

export default router;
