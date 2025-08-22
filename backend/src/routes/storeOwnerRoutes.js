const express = require('express');
const router = express.Router();
const storeOwnerController = require('../controllers/storeOwnerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['store_owner']));

router.get('/dashboard', storeOwnerController.dashboard);

module.exports = router;