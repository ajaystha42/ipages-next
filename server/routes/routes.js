const express = require("express");
const UserController = require("./../controllers/UserController");
const IPageController = require("./../controllers/IPageController");
const checkAuth = require("./../middleware/check-auth");
const Router = express.Router();

Router.post("/api/user/signup", UserController.signUp);
Router.post("/api/user/login", UserController.login);
Router.get("/api/ipages", IPageController.getAllIPages);
Router.get("/api/getIPageByRouteUrl", IPageController.getIpageByRoutedUrl);

module.exports = Router;
