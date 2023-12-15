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

// Route to individual post page
router.get("/post/:id", withAuth, async (req, res) => {
    // Find post and comments by ID with associated username
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                {model: Comment, include: [{ model: User, attributes: ["username"] }],
            },
        ],
    });
    // Convert post data to JavaScript object
    const post = postData.get({ plain: true });
    // Render post template with post data and login status
    res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    // If error return error message with a 500 status
    res.status(500).json(err);
}
});

