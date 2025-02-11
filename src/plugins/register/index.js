const RegisterHandler = require("./handler")
const routesRegister = require("./routes")

const registerPlugin = {
    name : 'register',
    version : '1.0.0',
    register : async (server, {service}) => {
        const registerHandler = new RegisterHandler(service)
        const registerRoute = routesRegister(registerHandler)
        server.route(registerRoute)
    }
}

module.exports = registerPlugin