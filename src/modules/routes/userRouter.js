const express = require('express');
const router = express.Router();

const { signIn, login } = require("./../controllers/user.controller");

//user routes
router.post('/registration', signIn);
router.post('/login', login);

module.exports = router;