const Joi = require("@hapi/joi")

const routesHistory = (handler) => [
    {
        method : 'POST',
        path : '/history',
        handler : handler.addHistoryHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    {
        method: 'GET',
        path: '/history',
        handler: handler.getHistoryHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/history/{id}',
        handler: handler.updateHistoryHandler,
        options: {
            auth: 'lelang_jwt',
        }
    },
    {
        method: 'DELETE',
        path: '/history/{id}',
        handler: handler.deleteHistoryHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    
]   

module.exports = routesHistory