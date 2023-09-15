import postService from "../services/Post.service.js";

async function createPost(req, res) {
  const { title, banner, text } = req.body;
  const userId = req.userId;

  try {
    const post = await postService.createPost(
      { title, banner, text },
      userId
    );
    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllPost(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const posts = await postService.findAllPost(
      limit,
      offset,
      currentUrl
    );
    return res.send(posts);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

async function findTopPost(req, res) {
  try {
    const post = await postService.findTopPost();
    return res.send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

async function findPostById(req, res) {
  const { id } = req.params;

  try {
    const post = await postService.findPostById(id);
    return res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

async function searchPostByTitle(req, res) {
  const { title } = req.query;

  try {
    const foundPosts = await postService.searchPostByTitle(title);

    return res.send(foundPosts);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

async function findPostByUserId(req, res) {
  const id = req.userId;

  try {
    const posts = await postService.findPostByUserId(id);
    return res.send(posts);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

async function updatePost(req, res) {
  const { title, banner, text } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.updatePost(id, title, banner, text, userId);

    return res.send({ message: "Post successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

async function deletePost(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.deletePost(id, userId);
    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).send(e.message);
  }
};

async function likePost(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await postService.likePost(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

async function commentPost(req, res) {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await postService.commentPost(postId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

async function commentDeletePost(req, res) {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await postService.commentDeletePost(postId, userId, idComment);

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
