const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// Set routes
// Route for user inputs
router.use("/users", userRoutes);
// Route for posts
router.use("/posts", postRoutes);
// Route for comments
router.use("/comments", commentRoutes);

module.exports = router;