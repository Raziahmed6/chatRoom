const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, bio, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bio: bio || '',
      gender: gender || '',
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Registration Error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        gender: user.gender || '',
        profileImage: user.profileImage || 'http://localhost:5173/default-avatar.png'
      }
    });
  } catch (err) {
    console.error('❌ Login Error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
