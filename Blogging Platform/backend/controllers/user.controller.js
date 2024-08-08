const userModel = require("../models/users.model");

async function getUserProfile(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).send("user details does not exist");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(404).send("error");
  }
}

async function updateUserProfile(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(id, {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      bio: req.body.bio,
      avatar: req.body.avatar,
    });
    res.send(user);
  } catch (err) {
    res.status(404).send("error");
  }
}

async function checkUsername(req, res) {
  const { uname } = req.params;
  try {
    const existingUser = await userModel.find({ username: uname });

    if (existingUser) {
      return res.status(200).json({ na: true });
    } else {
      return res.status(200).json({ na: false });
    }
  } catch (err) {
    return res.status(404).json({ error: "Internal server error" });
  }
}

userMethods = { getUserProfile, updateUserProfile, checkUsername };
module.exports = userMethods;
