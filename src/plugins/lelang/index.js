const LelangHandler = require("./handler");
const routesLelang = require("./routes");

const lelangPlugin = {
    name : 'lelang',
    version : '1.0.0',
    register : async (server, {lelangService, barangService}) => {
        const lelangHandler = new LelangHandler(lelangService, barangService);
        const lelangRoute = routesLelang(lelangHandler);
        server.route(lelangRoute);
    }
};

module.exports = lelangPlugin;