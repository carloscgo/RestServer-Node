const paths = require('./paths')

const routes = (app) => {
    app.use(paths.user, require('./user.route'))
}

module.exports = routes