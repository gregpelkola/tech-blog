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
}});

// Route to render dashboard page with all posts by currently logged in username
router.get("/dashboard", withAuth, async (req, res) => {
try {
        // Find all posts by currently logged in username
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ["username"] }],
        });
        // Convert post data to JavaScript object
        const posts = postData.map((post) => post.get({ plain: true }));
        // Render dashboard with post data and login status
        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // If error return error message with a 500 status
        res.status(500).json(err);
    }
});

// Route to login
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

// Route to signup
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signup");
});

// Render new post page
router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
        res.render("newpost");
        return;
    }
    res.redirect("/login");
});

// Route to edit post page
router.get("/editpost/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                {model: Comment,include: [{ model: User, attributes: ["username"] }],
            },
        ],
    });

    // Convert data to JavaScript object
    const post = postData.get({ plain: true });
    // Render edit post page
    res.render("editpost", {
        ...post,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    // If error return error message with a 500 status
    res.status(500).json(err);
}
});

module.exports = router;
