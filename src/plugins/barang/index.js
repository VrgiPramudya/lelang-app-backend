const BarangHandler = require("./handler")
const routesBarang = require("./routes")

const barangPlugin = {
    name : 'barang',
    version : '1.0.0',
    register : async (server, {service}) => {
        const barangHandler = new BarangHandler(service)
        const barangRoute = routesBarang(barangHandler)
        server.route(barangRoute)
    }
}

module.exports = barangPlugin 