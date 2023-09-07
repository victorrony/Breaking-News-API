import {
  createNewsService,
  findAllNewsService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createNewsService({
      title,
      text,
      banner,
      user: { _id: "64f9c303d836d68eded78385" },
    });

    res.send({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const news = await findAllNewsService();

    if (news.length === 0) {
      return res.status(404).send({ message: "No news found" });
    }
    res.send(news);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export default { create, findAll };
