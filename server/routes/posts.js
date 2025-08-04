const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getUserPosts } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createPost);
router.get('/', getAllPosts); // ✅ will now return post with user name + bio + profilePic
router.get('/user/:userId', getUserPosts);

module.exports = router;
