const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to homepage
router.get("/", async (req, res) => {
    try {
        //find posts with associated username
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["username"] }],
          });
          // Convert post data to JavaScript object
          const posts = postData.map((post) => post.get({ plain: true }));
          // Render homepage template with posts and login status
          res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
          });
        } catch (err) {
            // If error return error message with a 500 status
            res.status(500).json(err);
        }
    });

    