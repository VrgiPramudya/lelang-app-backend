const HistoryHandler = require("./handler")
const routesHistory = require("./routes")

const historyPlugin = {
    name : 'history',
    version : '1.0.0',
    register : async (server, {service}) => {
        const historyHandler = new HistoryHandler(service)
        const historyRoute = routesHistory(historyHandler)
        server.route(historyRoute)
    }
}

module.exports = historyPlugin