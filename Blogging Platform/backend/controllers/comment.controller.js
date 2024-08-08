const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");
const userModel = require("../models/users.model");

async function getCommentsForPost(req, res) {
  try {
    const { postId } = req.params;
    const comments = await commentModel.find({ postId: postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function deleteComment(req, res) {
  try {
    const id = req.params.id;
    const postId = req.params.postId;
    const comment = await commentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json(`Comment with id: ${id} does not exist`);
    } else {
      const post = await postModel.findById(postId);
      if (post) {
        post.comments = post.comments.filter(
          (commentId) => commentId.toString() !== id
        );
        await post.save();
      }
      return res.status(200).json(`Comment with id: ${id} is deleted`);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addComment(req, res) {
  try {
    const { postId } = req.params;

    const comment = await commentModel.create({
      postId: postId,
      userId: req.id,
      userName: req.body.userName,
      content: req.body.content,
      createdAt: req.body.createdAt,
    });

    if (comment) {
      res.send(comment);
      const post = await postModel.findById(postId);
      post.comments.push(comment);
      await post.save().then((response) => {
        console.log(comment);
      });
    } else {
      res.send("error");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
}

module.exports = { addComment, getCommentsForPost, deleteComment };
