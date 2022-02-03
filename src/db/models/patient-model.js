const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({
    userLogin: { type: String, unique: false },
    name: String,
    doctor: String,
    date: Date,
    complaints: String,
});

module.exports = Patient = mongoose.model('Patient', PatientSchema);