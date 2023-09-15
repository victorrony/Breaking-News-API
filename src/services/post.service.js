// import Posts from "../models/Post.js";
import postRepositories from "../repositories/post.repositories.js";

const countPost = async () => Posts.countDocuments();

async function createPost({ title, banner, text }, userId) {
  if (!title || !banner || !text)
    throw new Error("Submit all fields for registration");

  const { id } = await postRepositories.createPostRepository(
    title,
    banner,
    text,
    userId
  );

  return {
    message: "Post created successfully!",
    post: { id, title, banner, text },
  };
}

async function findAllPost(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const posts = await postRepositories.findAllPostsRepository(offset, limit);

  const total = await postRepositories.countPosts();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  posts.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: posts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function findTopPost() {
  const post = await postRepositories.topPostRepository();

  if (!post) throw new Error("There is no registered post");

  return {
    post: {
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    },
  };
}

async function findPostById(id) {
  const post = await postRepositories.findPostByIdRepository(id);

  if (!post) throw new Error("Post not found");

  return {
    id: post._id,
    title: post.title,
    banner: post.banner,
    text: post.text,
    likes: post.likes,
    comments: post.comments,
    name: post.user.name,
    username: post.user.username,
    avatar: post.user.avatar,
  };
}

async function searchPostByTitle(title) {
  const foundPosts = await postRepositories.searchPostRepository(title);

  if (foundPosts.length === 0)
    throw new Error("There are no posts with this title");

  return {
    foundPosts: foundPosts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function findPostByUserId(id) {
  const posts = await postRepositories.findPostsByUserIdRepository(id);

  return {
    postsByUser: posts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function updatePost(id, title, banner, text, userId) {
  if (!title && !banner && !text)
    throw new Error("Submit at least one field to update the post");

  const post = await postRepositories.findPostByIdRepository(id);

  if (!post) throw new Error("Post not found");

  if (post.user._id != userId) throw new Error("You didn't create this post");

  await postRepositories.updatePostRepository(id, title, banner, text);
}

async function deletePost(id, userId) {
  const post = await postService.findPostById(id);

  if (!post) throw new Error("Post not found");

  if (post.user._id != userId) throw new Error("You didn't create this post");

  await postRepositories.deletePostRepository(id);
}

async function likePost(id, userId) {
  const postLiked = await postService.likespost(id, userId);

  if (postLiked.lastErrorObject.n === 0) {
    await postService.likesDeletePost(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function deleteLikePost(idPost, userId) {
  Posts.findOneAndUpdate({ _id: idPost }, { $pull: { likes: { userId } } })};

async function commentPost(postId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const post = await postRepositories.findPostByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await postRepositories.commentsRepository(postId, message, userId);
}

async function commentDeletePost(postId, userId, idComment) {
  const post = await postRepositories.findPostByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await postRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  countPost,
  createPost,
  findAllPost,  
  findTopPost,
  searchPostByTitle,
  findPostById,
  findPostByUserId,
  updatePost,
  deletePost,
  likePost,
  deleteLikePost,
  commentPost,
  commentDeletePost,
};
