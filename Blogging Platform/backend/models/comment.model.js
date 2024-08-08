const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
});

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
