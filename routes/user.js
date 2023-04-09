const express = require('express')
const router = express.Router();
const { addNewUser, checkUserExist, login } = require('../services/UserService');

router.post('/registration', addNewUser);
router.post('/checkUserExist', checkUserExist);
router.post('/login', login);

module.exports = router;
