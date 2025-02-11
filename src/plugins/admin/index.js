const AdminHandler = require("./handler")
const routesAdmin = require("./routes")

const adminPlugin = {
    name : 'admin',
    version : '1.0.0',
    register : async (server, {service}) => {
        const adminHandler = new AdminHandler(service)
        const adminRoute = routesAdmin(adminHandler)
        server.route(adminRoute)
    }
}

module.exports = adminPlugin