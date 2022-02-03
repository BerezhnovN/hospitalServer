const User = require("../../db/models/user-model");
const { validPassword, setPassword } = require("../../utils/crypto");
const {ErrorBadRequest, ErrorNotFound} = require("../../errors");
const jwt = require('jsonwebtoken');

module.exports.signIn = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const trimLogin = login;
        const trimPass = password;

        if (!(trimLogin && trimPass)) {
            throw new ErrorBadRequest('All fields are required to sign in');
        }

        const oldUser = await User.findOne({ login: trimLogin });
        if (oldUser) {
            throw new ErrorBadRequest('User already exists. Try another or login');
        }

        const [salt, hash] = setPassword(trimPass);

        const user = await User.create({
            login: trimLogin,
            hash,
            salt,
        });

        const payload = { login: user.login };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
        res.cookie("jwt", accessToken, { secure: true });
        res.status(200).send({
            payload: payload
        });
    } catch (err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const trimLogin = login;
        const trimPass = password;

        // No login or pass
        if (!(trimLogin && trimPass)) {
            throw new ErrorBadRequest('All input is required');
        }

        // Invalid creds
        const user = await User.findOne({ login: trimLogin });
        if (!(user && validPassword(trimPass, user.salt, user.hash))) {
            throw new ErrorNotFound('Invalid credentials');
        }

        // All good
        const payload = { login: user.login };

        // Creating access token
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });

        //Sending response with cookie which contains access token
        res.cookie("jwt", accessToken, { secure: true });
        res.status(200).send({
            payload: payload
        });
    } catch (err) {
        next(err);
    }
}
