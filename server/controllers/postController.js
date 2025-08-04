const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      userId: req.user,
      content: req.body.content,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'name bio profileImage') // 👈 includes profile info
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate('userId', 'name bio profileImage') // 👈 same here
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user posts' });
  }
};
