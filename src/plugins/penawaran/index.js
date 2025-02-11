const PenawaranHandler = require("./handler")
const routesPenawaran = require("./routes")

const penawaranPlugin = {
    name : 'penawaran',
    version : '1.0.0',
    register : async (server, {service}) => {
        const penawaranHandler = new PenawaranHandler(service)
        const penawaranRoute = routesPenawaran(penawaranHandler)
        server.route(penawaranRoute)
    }
}

module.exports = penawaranPlugin