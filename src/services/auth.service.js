import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userRepositories from "../repositories/user.repositories.js";

const loginService = async ({ email, password }) => {
  const user = await userRepositories.findByEmailUserRepository(email);

  if (!user) throw new Error("Wrong password or username");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(user.id);

  return token;
};

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: 86400 });
}

export default { loginService, generateToken };
