const User = require('../models/user')
const Role = require('../models/role')

const {
    EXISTS_EMAIL,
    INVALID_ROLE,
} = require('./constants')

const checkEmail = async (email = '') => {
    const exists = await User.findOne({ email })

    if (exists) {
        throw new Error(EXISTS_EMAIL)
    }
}

const checkRole = async (role = '') => {
    const exists = await Role.findOne({ role })

    if (!exists) {
        throw new Error(INVALID_ROLE)
    }
}

module.exports = {
    checkEmail,
    checkRole
}