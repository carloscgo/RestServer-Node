const { check } = require('express-validator')
const {
    REQUIRED_NAME,
    INVALID_EMAIL,
    INVALID_ROLE,
    INVALID_PASSWORD,
} = require('../utils/constants')
const Role = require('../models/role')

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
]