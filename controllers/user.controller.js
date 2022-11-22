const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {
    SUCCESS_RECORDED,
} = require('../utils/constants')

const getUser = (req = request, res = response) => {
    const { page = '1', limit = '10', name } = req.query

    res.json({
        message: 'get API - Controller',
        page,
        limit,
        name
    })
}

const updateUser = (req = request, res = response) => {
    const { id } = req.params

    res.status(400).json({
        message: 'put API - Controller',
        id
    })
}

const addUser = async (req = request, res = response) => {
    const {
        name, email, role, password
    } = req.body

    const user = new User({
        name, email, role, password
    })

    // Encrypt password
    const salt = bcrypt.genSaltSync(10)

    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.status(201).json({
        message: SUCCESS_RECORDED,
        user,
    })
}

const deleteUser = (req = request, res = response) => {
    res.json({
        message: 'delete API - Controller'
    })
}

module.exports = {
    getUser,
    updateUser,
    addUser,
    deleteUser
}
