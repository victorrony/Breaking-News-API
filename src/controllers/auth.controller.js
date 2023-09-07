import bcrypt from "bcrypt";
import { generateToken, loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(400).send({ message: "Invalid email" });
    }

    const PasswordIsValid = await bcrypt.compare(password, user.password);

    if (!PasswordIsValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = generateToken(user.id);

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export { login };
