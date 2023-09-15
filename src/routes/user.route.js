import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validId } from "../middleware/global.middleware.js";

const userRouter = Router();

userRouter.post("/create", userController.createUser);

// userRouter.use(authMiddleware);
userRouter.get("/", userController.findAllUser);

userRouter.use(validId);
userRouter.get("/findById/:id", userController.findUserById);
userRouter.patch("/update/:id", userController.updateUser);

export default userRouter;
