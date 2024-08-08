const express = require("express");
const mongoose = require("mongoose");
const userProfileRoutes = require("./routes/user.route");
const categoryRoutes = require("./routes/category.route");
const commentRoutes = require("./routes/comment.route");
const postRoutes = require("./routes/post.route");
const userauthRoutes = require("./routes/auth.route");

const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.port;
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://varsha:varsha24@cluster0.dpewpke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((response) => console.log("connected to database"));

app.use("/api/users", userProfileRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", userauthRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/comments", commentRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
