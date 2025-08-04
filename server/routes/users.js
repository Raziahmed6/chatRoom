const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ✅ GET /api/users/me — get own profile using token
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// ✅ PUT /api/users/update — update bio, gender, profilePic
router.put('/update', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { bio, gender, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio, gender, profileImage },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// ✅ GET /api/users/:userId — public profile (e.g. for post author info)
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router;
