const { response, request } = require('express')

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

const addUser = (req = request, res = response) => {
    const {
        name, age
    } = req.body

    res.status(201).json({
        message: 'post API - Controller',
        name,
        age
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
