const express = require('express');
const router = express.Router();
const patientsRouter = require('./patientsRouter');
const userRouter = require('./userRouter');
const verifyUser = require('../../middleware/JWT');

router.use('/users', userRouter);
router.use('/patients', verifyUser, patientsRouter);

module.exports = router;