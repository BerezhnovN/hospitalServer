const jwt = require('jsonwebtoken');
const { ErrorUnautorized, ErrorForbidden } = require('../errors');

verifyUser = (req, res, next) => {
    try {
        const acceptedToken = req.cookies.jwt;
        if (!acceptedToken) {
            throw new ErrorUnautorized('A token is required for authentication');
        }
        try {
            const token = jwt.verify(acceptedToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = token.login;

            const payload = { login: token.login };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            });

            res.cookie("jwt", accessToken, { secure: true });
            next();
        } catch (error) {
            throw new ErrorForbidden('Invalid token')
        }

    } catch (err) {
        next(err);
    }
}

module.exports = verifyUser;


