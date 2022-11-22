const { validationResult, check } = require('express-validator')
const User = require('../models/user')
const Role = require('../models/role')
const {
    EXISTS_EMAIL,
    REQUIRED_NAME,
    INVALID_EMAIL,
    INVALID_ROLE,
    INVALID_PASSWORD,
} = require('../utils/constants')

const validate = async (req, res, next) => {
    // console.log({ req }, req.method)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors
        })
    }

    const {
        email
    } = req.body

    // Check exists email
    const existsEmail = await User.findOne({ email })

    if (existsEmail) {
        return res.status(400).json({
            message: EXISTS_EMAIL
        })
    }

    next()
}

module.exports = [
    check('name', REQUIRED_NAME).not().isEmpty(),
    check('email', INVALID_EMAIL).isEmail(),
    check('role').custom(async (role = '') => {
        const exists = await Role.findOne({ role })

        if (!exists) {
            throw new Error(INVALID_ROLE)
        }
    }),
    check('password', INVALID_PASSWORD).isLength({ min: 6 }),
    (req, res, next) => validate(req, res, next)
]