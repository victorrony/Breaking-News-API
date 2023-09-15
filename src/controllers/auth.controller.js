import authService from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.loginService({ email, password });
    console.log(user);
    return res.send(user);
  } catch (e) {
    return res.status(401).send(e.message);
  }
};

export { login };
