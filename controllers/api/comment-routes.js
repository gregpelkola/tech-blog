const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new comment
router.post("/", withAuth, async (req, res) => {
    try {
        // Create a new comment with provided data
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // Send a response with the comment
        res.status(200).json(newComment);
    } catch (err) {
        // If error return error with a 400 status
        res.status(400).json(err);
    }
});

module.exports = router;