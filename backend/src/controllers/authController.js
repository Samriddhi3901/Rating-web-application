const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, address, password, role } = req.body; // Add role
  try {
    const user = await User.create({ name, email, address, password, role: role || 'user' });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.errors });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!(await user.validPassword(oldPassword))) {
      return res.status(401).json({ message: 'Old password incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(400).json({ message: 'Error updating password', error: err.errors });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logout successful (client should remove token)' });
};