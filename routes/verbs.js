import express from "express";
import { parseVerbs, getVerbs } from "../controllers/verbsController.js";

const router = express.Router();

router.get("/parse", parseVerbs);
router.get("/fetch", getVerbs);

export default router;
