import { Router } from "express";
import postController from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/create", authMiddleware, postController.create);
router.get("/", postController.findAll);
router.get("/top", postController.findTopNews);
router.get("/search", postController.searchByTitle);
router.get("/byUserId", authMiddleware, postController.findByUser);

router.get("/byIdPost/:id", authMiddleware, postController.findById);
router.patch("/update/:id", authMiddleware, postController.updateById);
router.delete("/delete/:id", authMiddleware, postController.deleteById);
router.patch("/:id/like", authMiddleware, postController.likeById);
router.patch("/:id/comment", authMiddleware, postController.addCommentById);
router.patch(
  "/:id/:idComment/comment",
  authMiddleware,
  postController.deleteCommentById
);

export default router;
