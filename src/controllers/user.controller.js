import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name || !userName || !email || !password || !avatar || !background) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration" });
    }

    const user = await userService.createUserService(req.body);

    if (!user) {
      return res.status(401).send({
        message: "Error creating user1",
      });
    }
    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        userName,
        email,
        password,
        avatar,
        background,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error creating user2",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllUserService();

    if (users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({
      message: "Error finding users",
    });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: "Error finding user",
    });
  }
};

const update = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name && !email && !password && !avatar && !background) {
      return res
        .status(400)
        .send({ message: "Submit at least one fields for update" });
    }

    const { id, user } = req;

    await userService.updateUserService(
      id,
      name,
      userName,
      email,
      password,
      avatar,
      background
    );
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).send({
      message: "Error updating user",
    });
  }
};

export default { create, findAll, findById, update };
