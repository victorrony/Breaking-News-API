import userService from "../services/user.service.js";

async function createUser(req, res) {
  const { name, userName, email, password, avatar, background } = req.body;

  try {
    const token = await userService.createUser({
      name,
      userName,
      email,
      password,
      avatar,
      background,
    });
    res.status(201).send(token);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function findAllUser(req, res) {
  try {
    const users = await userService.findAllUser();
    return res.send(users);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function findUserById(req, res) {
  try {
    const user = await userService.findUserById(
      req.params.id,
      req.userId
    );
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function updateUser(req, res) {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    const { id: userId } = req.params;
    const userIdLogged = req.userId;

    const response = await userService.updateUser(
      { name, username, email, password, avatar, background },
      userId,
      userIdLogged
    );

    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export default {
  createUser,
  findAllUser,
  findUserById,
  updateUser,
};
