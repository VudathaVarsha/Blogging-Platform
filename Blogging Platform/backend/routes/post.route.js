const express = require("express");
const routes = express.Router();
const commentRoutes = require("./comment.route");
const authroutes = require("../middleware/auth");
const methods = require("../controllers/posts.controller");

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));
const verifyToken = authroutes.verifyToken;

routes.post("/", verifyToken, methods.createPost);
routes.get("/", methods.allPosts);
routes.get("/:id", methods.getPostById);
routes.put("/:id", methods.updatePost);
routes.get("/post/:userId", methods.getPostByUserId);
routes.delete("/:id", methods.deletePost);
routes.use("/comments", commentRoutes);
routes.post("/like/:id", methods.increaseLikes);
routes.post("/unlike/:id", methods.decreaseLikes);
module.exports = routes;
