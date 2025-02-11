const LelangHandler = require("./handler")
const routesLelang = require("./routes")

const lelangPlugin = {
    name : 'lelang',
    version : '1.0.0',
    register : async (server, {service}) => {
        const lelangHandler = new LelangHandler(service)
        const lelangRoute = routesLelang(lelangHandler)
        server.route(lelangRoute)
    }
}

module.exports = lelangPlugin