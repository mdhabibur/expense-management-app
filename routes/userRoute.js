const express = require('express');

const {loginController,registerController} =require('../controllers/userController');


const router = express.Router();

//register user
router.post('/register', registerController);

//login user
router.post('/login', loginController);

module.exports = router