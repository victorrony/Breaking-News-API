import {
  createNewsService,
  findAllNewsService,
} from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createNewsService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
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
