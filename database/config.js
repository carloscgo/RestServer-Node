const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('DB connected')
    } catch (err) {
        console.log(err)

        throw new Error('Error connecting with DB')
    }
}

module.exports = {
    dbConnection
}