
const Patient = require("../../db/models/patient-model");

module.exports.getAllPatients = async (req, res, next) => {
    try {
        const login  = req.user;
        const patients = await Patient.find( {userLogin: login} );
        res.send(patients);
    } catch (err) {
        next(err)
    }
}

module.exports.createNewPatient = async (req, res, next) => {
    try {
        const login = req.user;
        const { name, doctor, date, complaints } = req.body;
        //Create patient and save it to DB
        const patient = await Patient.create({
            userLogin: login,
            name: name,
            doctor: doctor,
            date: date,
            complaints: complaints
        });

        //Send saved patient
        res.status(200).send(patient);
    } catch (error) {
        next(error)
    }
}

module.exports.changePatientsInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const login = req.user;
        const { name, doctor, date, complaints } = req.body;
        const patient = await Patient.updateOne({ _id: id }, {
            _id: id,
            name,
            doctor,
            date,
            complaints,
        });
        res.status(200).send({ ...patient });
    } catch (error) {
        next(error)
    }
}

module.exports.deletePatient = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error('ID property is required');
        }

        const patient = await Patient.findOneAndDelete({ _id: id });
        if (!patient) {
            throw new Error('Reception not found');
        }

        //Return deleted task
        res.status(200).send({ ...patient });
    } catch (err) {
        next(err);
    }
}

