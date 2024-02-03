const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHeader');
const { 
    registerUser,
    loginuser,
    currentUsers 
} = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginuser);
router.get('/current', validateToken, currentUsers);

module.exports = router;