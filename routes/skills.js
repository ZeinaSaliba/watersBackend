const express = require('express');
const router = express.Router();
const userController = require('../controllers/skillsController');

router.get('/all', userController.getAll);

module.exports = router;