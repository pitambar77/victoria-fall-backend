// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../../models/AuthModel/User.js';

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, email: user.email, role: user.role, username: user.username },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES || '1d' }
//   );
// };

// export const register = async (req, res) => {
//   try {
//     const { username, email, password, phone, role } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'Please provide username, email and password.' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already registered.' });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     // If you want to restrict who can create superadmin, add checks here.
//     const user = new User({
//       username,
//       email,
//       password: hashed,
//       phone,
//       role: role || 'superadmin', // default to superadmin for this flow
//     });

//     await user.save();

//     const token = generateToken(user);

//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       user: { id: user._id, username: user.username, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Please provide email and password.' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

//     // optionally restrict login to superadmin only
//     // if (user.role !== 'superadmin') return res.status(403).json({ message: 'Not authorized' });

//     const token = generateToken(user);

//     res.json({
//       message: 'Login success',
//       token,
//       user: { id: user._id, username: user.username, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// admin vender added

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

