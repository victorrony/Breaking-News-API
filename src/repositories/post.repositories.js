import Post from "../models/Post.js";

function createPost(title, banner, text, userId) {
  return Post.create({ title, banner, text, user: userId });
}

function findAllPosts(offset, limit) {
  return Post.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
}

function topPost() {
  return Post.findOne().sort({ _id: -1 }).populate("user");
}

function findPostById(id) {
  return Post.findById(id).populate("user");
}

function countPosts() {
  return Post.countDocuments();
}

function searchPost(title) {
  return Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findPostsByUserId(id) {
  return Post.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
}

function updatePost(id, title, banner, text) {
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      banner,
      text,
    },
    {
      rawResult: true,
    }
  );
}

function deletePost(id) {
  return Post.findOneAndDelete({ _id: id });
}

function likes(id, userId) {
  return Post.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function likesDelete(id, userId) {
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );
}

function comments(id, message, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function commentsDelete(id, userId, idComment) {
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}

export default {
  createPost,
  findAllPosts,
  topPost,
  findPostById,
  searchPost,
  findPostsByUserId,
  updatePost,
  deletePost,
  likes,
  likesDelete,
  comments,
  commentsDelete,
  countPosts,
};
