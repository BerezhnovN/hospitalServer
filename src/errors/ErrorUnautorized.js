const {httpStatusCodes} = require('../consts');
const BaseError = require('./BaseError');

class ErrorUnautorized extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.UNAUTORIZED,
        isOperational = true,
        description = 'Unautorized!', 
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ErrorUnautorized;