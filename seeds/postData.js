const { Post } = require("../models");

const postData = [
  {
    title: "First Blog Post",
    content: "This is the first blog post.",
    user_id: 1,
  },

  {
    title: "Second Blog Post",
    content: "This is the second blog post.",
    user_id: 2,
  },
  {
    title: "Third Blog Post",
    content: "This is the third blog post.",
    user_id: 3,
  },
  {
    title: "Fourth Blog Post",
    content: "This is the fourth blog post.",
    user_id: 4,
  },
  {
    title: "Fifth Blog Post",
    content: "This is the fifth blog post.",
    user_id: 5,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;