import Posts from "../models/Post.js";

const createNewsService = async (body) => Posts.create(body);

const findAllNewsService = async (offset, limit) =>
  Posts.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = async () => Posts.countDocuments();

const findTopNewsService = async () =>
  Posts.findOne().sort({ _id: -1 }).populate("user");

const findByIdNewsService = async (id) =>
  await Posts.findById(id).populate("user");

const findByNewsTitleService = async (title) =>
  Posts.find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");

const findByIdUserNewsService = async (Id) =>
  Posts.find({ user: Id }).sort({ _id: -1 }).populate("user");

const updateByIdNewsService = async (id) =>
  Posts.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const deleteByIdNewsService = async (id) =>
  Posts.findByIdAndDelete({ _id: id });

const likeNewsService = async (idNews, userId) =>
  Posts.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikeNewsService = async (idNews, userId) =>
  Posts.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

const addCommentNewsService = async (idNews, userId, comment) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return Posts.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};

const deleteCommentNewsService = async (idNews, idComment, userId) =>
  Posts.findOneAndUpdate(
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
