const { validationResult, check } = require('express-validator')
const {
    REQUIRED_NAME,
    INVALID_PASSWORD,
} = require('../utils/constants')
const {
    checkEmail,
    checkRole
} = require('../utils/db_validators')

const validate = async (req, res, next) => {
    // console.log({ req }, req.method)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors
        })
    }

    next()
}

module.exports = [
    check('name', REQUIRED_NAME).not().isEmpty(),
    check('email').isEmail().custom(checkEmail),
    check('role').custom(checkRole),
    check('password', INVALID_PASSWORD).isLength({ min: 6 }),
    (req, res, next) => validate(req, res, next)
]