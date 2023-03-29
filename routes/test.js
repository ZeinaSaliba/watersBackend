const express = require('express');
const router = express.Router();
const userController = require('../controllers/testController');

router.get('/skills/:id', userController.getskills);

module.exports = router;