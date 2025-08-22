const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Signup (normal users only)
router.post('/signup', authController.signup);

// Login (all users)
router.post('/login', authController.login);

// Update password (authenticated users)
router.put('/password', authMiddleware, authController.updatePassword);

// Logout (client-side, but endpoint for completeness)
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;