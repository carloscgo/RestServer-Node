const express = require('express')
const cors = require('cors')

const routes = require('../routes')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.PORT = process.env.PORT

        // Middlewares
        this.middlewares()

        // DB Connection
        this.dbConnect()

        // App routes
        routes(this.app)
    }

    async dbConnect() {
        await dbConnection()
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Listening on port ${this.PORT}`)
        })
    }

    middlewares() {
        // CORS
        this.app.use(cors())
        // Reading & Parser JSON
        this.app.use(express.json())
        // Public Directory
        this.app.use(express.static('public'))
    }
}

module.exports = Server