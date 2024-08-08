const categoryModel = require("../models/category.model");
const postModel = require("../models/post.model");

async function getAllCategories(req, res) {
  try {
    const categories = await categoryModel.find();
    if (categories) {
      res.status(200).send(categories);
    } else {
      res.status(404).send("no category");
    }
  } catch (err) {
    res.status(404).send("Cannot display category details ");
  }
}

async function getPostsByCategory(req, res) {
  try {
    const { name } = req.params;
    const post = await postModel.find({ category: name });
    if (!post) {
      res.status(404).send(`post with category:${category} does not exist`);
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.send("error");
  }
}
async function createCategory(req, res) {
  try {
    console.log(req.body);
    const category = await categoryModel.create({
      name: req.body.name,
      photo: req.body.photo,
    });

    if (!category) {
      res.status("404").send("cannot create");
    } else {
      res.status(200).send(category);
    }
  } catch (err) {
    res.send("error");
  }
}

const categoryMethods = {
  createCategory,
  getAllCategories,
  getPostsByCategory,
};
module.exports = categoryMethods;
