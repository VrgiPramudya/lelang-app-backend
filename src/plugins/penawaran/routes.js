    const Joi = require("joi")

    const routesPenawaran = (handler) => [
        {
            method : 'POST',
            path : '/{id_lelang}/penawaran',
            handler : handler.addPenawaranHandler,
            options: {
                auth: 'lelang_jwt',
                validate: {
                    params: Joi.object({
                        id_lelang: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nominal: Joi.number().required()
                    })
                }
                
            }
        },
        {
            method: 'GET',
            path: '/penawaran',
            handler: handler.getPenawaranHandler,
        },
        {
            method: 'GET',
            path: '/penawaran/{id_penawaran}',
            handler: handler.getPenawaranByIdHandler,
        },
        {
            method: 'PUT',
            path: '/{id_lelang}/penawaran/{id_penawaran}',
            handler: handler.updatePenawaranHandler,
            options: {
                auth: 'lelang_jwt',
                validate: {
                    params: Joi.object({
                        id_lelang: Joi.string(),
                        id_penawaran: Joi.string()
                    }),
                    payload: Joi.object({
                        nominal: Joi.number().required()
                    })
                }
            }
        },
        {
            method: 'DELETE',
            path: '/penawaran/{id_penawaran}',
            handler: handler.deletePenawaranHandler,
            options: {
                auth: 'lelang_jwt'
            }
        },
        
    ]   

    module.exports = routesPenawaran