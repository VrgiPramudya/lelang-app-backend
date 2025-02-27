const Joi = require("@hapi/joi")

const routesLelang = (handler) => [
    {
        method : 'POST',
        path : '/lelang',
        handler : handler.addLelangHandler,
        options: {
            auth: 'lelang_jwt',
            validate: {
                payload: Joi.object({
                    id_barang: Joi.number().required(),
                    tgl_lelang: Joi.date().required(),
                    status: Joi.optional()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/lelang',
        handler: handler.getLelangHandler,
        // options: {
        //     auth: 'lelang_jwt'
        // }
    },
    {
        method: 'GET',
        path: '/lelang/{id}',
        handler: handler.getLelangByIdHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/lelang/{id}',
        handler: handler.updateLelangHandler,
        options: {
            auth: 'lelang_jwt',
            validate: {    
                payload: Joi.object({
                    id_barang: Joi.number(),
                    tgl_lelang: Joi.date(),
                    status: Joi.required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/lelang/{id}',
        handler: handler.deleteLelangHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    
]   

module.exports = routesLelang