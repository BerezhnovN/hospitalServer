const express = require('express');
const router = express.Router();

const {
    getAllPatients,
    createNewPatient,
    changePatientsInfo,
    deletePatient
} = require('../controllers/patients.controller');

router.get('/', getAllPatients);
router.post('/', createNewPatient);
router.patch('/:id', changePatientsInfo);
router.delete('/:id', deletePatient);

module.exports = router;