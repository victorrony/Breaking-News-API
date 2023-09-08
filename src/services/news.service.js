import News from "../models/New.js";

const createNewsService = async (body) => News.create(body);

const findAllNewsService = async (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = async () => News.countDocuments();

const findTopNewsService = async () =>
  News.findOne().sort({ _id: -1 }).populate("user");

const findByIdNewsService = async (id) => News.findById(id).populate("user");

const findByNewsTitleService = async (title) =>
  News.find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");

const findByIdUserNewsService = async (Id) =>
  News.find({ user: Id }).sort({ _id: -1 }).populate("user");

const updateByIdNewsService = async (id) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const deleteByIdNewsService = async (id) => News.findByIdAndDelete({ _id: id });

const likeNewsService = async (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikeNewsService = async (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

const addCommentNewsService = async (idNews, userId, comment) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};

const deleteCommentNewsService = async (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } }
  );

export {
  createNewsService,
  findAllNewsService,
  countNews,
  findTopNewsService,
  findByIdNewsService,
  findByNewsTitleService,
  findByIdUserNewsService,
  updateByIdNewsService,
  deleteByIdNewsService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentNewsService,
  deleteCommentNewsService,
};
