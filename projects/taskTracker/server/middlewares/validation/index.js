import { body, validationResult } from 'express-validator';

//let { firstName, lastName, email, phone, password } = req.body

function signupValidation() {

    return [
        body('firstName','FirstName does not blank').notEmpty(),
        body('lastName','LastName does not blank').notEmpty(),
        body('email', 'email is invalid').isEmail(),
        body('phone','Phone number is invalid').notEmpty().isLength({min:13, max:13}),
        body('password','password is not strong').notEmpty().isStrongPassword()
    ]
}

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
    loginValidation,validationErrors,signupValidation
}