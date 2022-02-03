const crypto = require('crypto');

const setPassword = (pass) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
    return [salt, hash];
};

const validPassword = (pass, salt, hash) => {
    const pswd = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
    return pswd === hash;
};

module.exports = { setPassword, validPassword };