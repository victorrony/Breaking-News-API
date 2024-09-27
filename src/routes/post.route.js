import { Router } from "express";
import postController from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validId } from "../middleware/global.middleware.js";

const postRouter = Router();

postRouter.get("/", postController.findAllPost);
postRouter.get("/top", postController.findTopPost);
postRouter.get("/search", postController.searchPostByTitle);

// postRouter.use(authMiddleware);
postRouter.post("/create", postController.createPost);

// postRouter.use(validId);
postRouter.get("/byUserId/", postController.findPostByUserId);
postRouter.get("/byIdPost/:id", postController.findPostById);
postRouter.patch("/update/:id", postController.updatePost);
postRouter.delete("/delete/:id", postController.deletePost);
postRouter.patch("/:id/like", postController.likePost);
postRouter.patch("/:id/comment", postController.commentPost);
postRouter.patch("/:id/:idComment/comment", postController.commentDeletePost);

export default postRouter;
