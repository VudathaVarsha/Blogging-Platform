const express = require("express");
const routes = express.Router();
const userMethods = require("../controllers/user.controller");

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

routes.get("/:id", userMethods.getUserProfile);
routes.put("/:id", userMethods.updateUserProfile);
routes.get("/name/:uname", userMethods.checkUsername);

module.exports = routes;
