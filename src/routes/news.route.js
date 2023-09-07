import { Router } from "express";
import newsController from "../controllers/news.controller.js";
const router = Router();

router.post("/", newsController.create);
router.get("/", newsController.findAll);

export default router;