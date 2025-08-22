const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.post('/users', adminController.addUser);
router.post('/stores', adminController.addStore);
router.get('/dashboard', adminController.dashboard);
router.get('/stores', adminController.listStores);
router.get('/users', adminController.listUsers);
router.get('/users/:id', adminController.viewUserDetails);

module.exports = router;