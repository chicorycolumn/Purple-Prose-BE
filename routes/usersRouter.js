const usersRouter = require("express").Router();
const { authorizeUser } = require("../controllers/authorizeUser.controller");

const {
  getUserByUsername,
  getUsers,
  postNewUser,
  patchUserDetails
} = require("../controllers/users.controller");
const { handle405s } = require("../errors/errors");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch(authorizeUser, patchUserDetails)
  .all(handle405s);

usersRouter
  .route("/")
  .get(getUsers)
  .post(postNewUser)
  .all(handle405s);

module.exports = usersRouter;
