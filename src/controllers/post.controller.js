import postService from "../services/Post.service.js";

async function createPost(req, res) {
  const { title, banner, text } = req.body;
  const userId = req.userId;

  try {
    const post = await postService.createPostService(
      { title, banner, text },
      userId
    );
    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

const findAllPost = async (req, res) => {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const posts = await postService.findAllPostService(
      limit,
      offset,
      currentUrl
    );
    return res.send(posts);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findTopPost = async (req, res) => {
  try {
    const post = await postService.topNewsService();
    return res.send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.findPostByIdService(id);
    return res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const searchPostByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const foundPosts = await postService.searchPostService(title);

    return res.send(foundPosts);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findPostByUserId = async (req, res) => {
  const id = req.userId;
  try {
    const posts = await postService.findPostsByUserIdService(id);
    return res.send(posts);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const updatePost = async (req, res) => {
  const { title, banner, text } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.updatePostService(id, title, banner, text, userId);

    return res.send({ message: "Post successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.deletePostService(id, userId);
    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).send(e.message);
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await postService.likePostService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const commentPost = async (req, res) => {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await postService.commentPostService(postId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const commentDeletePost = async (req, res) => {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await postService.commentDeletePostService(postId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export default {
  createPost,
  findAllPost,
  findTopPost,
  findPostById,
  searchPostByTitle,
  findPostByUserId,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  commentDeletePost,
};
