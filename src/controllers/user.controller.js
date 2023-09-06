const create = (req, res) => {
  const { name, email, password, avatar, background } = req.body;

  if (!name || !email || !password || !avatar || !background) {
    return res
      .status(400)
      .send({ message: "Submit all fields for registration" });
  }

  res.status(201).send({
    message: "User created successfully",
    user: {
      name,
      email,
      avatar,
      background,
    },
  });
};

module.exports = { create };
