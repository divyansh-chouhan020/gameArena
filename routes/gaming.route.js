const express = require("express");
const {
  createGame,
  listAllGame,
  approveGame,
  listOfPendingGamesAdmin,
  listOfGameForDevelopers,
  deleteGame,
  updateGame,
} = require("../controller/game.controller");
const { protectRoute, authorizeRoles } = require("../middleware/auth");
const gameRouter = express.Router();
//create game
gameRouter.use(protectRoute);
gameRouter.route("/").post(authorizeRoles(["developer"]), createGame);
gameRouter.route("/").get(listAllGame);
gameRouter.route("/approve/:id").patch(authorizeRoles(["admin"]), approveGame);
gameRouter
  .route("/pending")
  .get(authorizeRoles(["admin"]), listOfPendingGamesAdmin);
gameRouter
  .route("/developerlist")
  .get(authorizeRoles(["developer"]), listOfGameForDevelopers);
gameRouter.route("/:id").patch(authorizeRoles(["developer"]), updateGame);
gameRouter.route("/:id").delete(authorizeRoles(["developer"]), deleteGame);
// gameRouter.route("/").get(listAllGame);

module.exports = gameRouter;
