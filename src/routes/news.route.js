import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/",authMiddleware,  newsController.create);
router.get("/", newsController.findAll);
router.get("/top", newsController.findTopNews);
router.get("/search", newsController.searchByTitle);
router.get("/byUser", authMiddleware, newsController.findByUser);

router.get("/:id",authMiddleware, newsController.findById);
router.patch("/:id",authMiddleware, newsController.updateById);
router.delete("/:id",authMiddleware, newsController.deleteById);
router.patch("/like/:id",authMiddleware, newsController.likeById);
router.patch("/comment/:id",authMiddleware, newsController.addCommentById);
router.patch("/comment/:idNews/:idComment",authMiddleware, newsController.deleteCommentById);

export default router;