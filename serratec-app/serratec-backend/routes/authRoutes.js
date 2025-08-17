const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro de usuário
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router;