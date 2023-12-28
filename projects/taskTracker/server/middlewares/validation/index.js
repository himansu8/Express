import { body, validationResult } from 'express-validator';

function loginValidation() {

    return [
        body('email', 'email is invalid').isEmail(),
        body('password','password is missing').notEmpty(),

    ]
}

function validationErrors(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.send({ errors: result.array() });
}
export {
    loginValidation,validationErrors
}