const routes = require('./routes')
const AuthHandler = require('./handler')

const authPlugin = {
    name: 'auth',
    version: '1.0.0',
    register: async (server, {adminServices, userServices}) => {
        const authHandler = new AuthHandler(adminServices, userServices)
        const authRoutes = routes(authHandler)
        server.route(authRoutes)
    }
}

module.exports = authPlugin