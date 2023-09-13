import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validId } from "../middleware/global.middleware.js";

const userRouter = Router();

userRouter.post("/create", userController.createUserController);

userRouter.use(authMiddleware);
userRouter.get("/", userController.findAllUserController);

userRouter.use(validId);
userRouter.get("/findById/:id", validId, userController.findUserByIdController);
userRouter.patch("/update/:id", validId, userController.updateUserController);

export default userRouter;
