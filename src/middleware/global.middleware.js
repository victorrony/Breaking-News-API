import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalide id" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userService.findByIdUserService(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
