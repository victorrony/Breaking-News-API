import {
  countNews,
  createNewsService,
  findAllNewsService,
  findTopNewsService,
  findByIdNewsService,
  findByNewsTitleService,
  findByIdUserNewsService,
  updateByIdNewsService,
  deleteByIdNewsService,
  deleteLikeNewsService,
  addCommentNewsService,
} from "../services/post.service.js";

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
    let { offset, limit } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit && !offset) {
      limit = 5;
      offset = 0;
    }
    const news = await findAllNewsService(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const prevUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(404).send({ message: "No news found" });
    }
    res.send({
      nextUrl,
      prevUrl,
      limit,
      offset,
      total,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.userName,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const findTopNews = async (req, res) => {
  try {
    const news = await findTopNewsService();

    if (!news) {
      return res.status(404).send({ message: "No news found" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.userName,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findByIdNewsService(id);

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await findByNewsTitleService(title);

    if (news.length === 0) {
      return res.status(404).send({ message: "No news found" });
    }

    return res.status(200).send({
      results: news.map((item) => ({
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.userName,
        userAvatar: news.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const findByUser = async (req, res) => {
  const id = req.userId;
  try {
    const posts = await findByIdUserNewsService(id);

    return res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const updateById = async (req, res) => {
  const { title, text, banner } = req.body;
  const { id } = req.params;
  const userId = req.userId;
  try {
    if (!title && !banner && !text) {
      return res
        .status(400)
        .send({ message: "Submit one fields for registration" });
    }
    const news = await findByIdNewsService(id);

    if (string(news.user._id) !== req.userId) {
      return res.status(401).send({ message: "You didn't update this News" });
    }

    await updateByIdNewsService(id, title, text, banner, userId);

    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await deleteByIdNewsService(id, userId);

    return res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const likeById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.userId;

  try {
    const newsLiked = await likeNewsService(id, userId);

    return res.status(201).send(newsLiked);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const addCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const comment = req.body;

    if (!comment) {
      return res.status(400).send({ message: "write a message to comment" });
    }

    await addCommentNewsService(id, userId, comment);

    res.status(200).send({ message: "comment successfully added" });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentService(
      idNews,
      idComment,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (commentFinder.userId !== userId) {
      return res.status(400).send({ message: "You can't delete this comment" });
    }

    res.send({
      message: "Comment successfully removed!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export default {
  create,
  findAll,
  findTopNews,
  findById,
  searchByTitle,
  findByUser,
  updateById,
  deleteById,
  likeById,
  addCommentById,
  deleteCommentById,
};
