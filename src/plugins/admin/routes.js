const Joi = require("joi")

const routesAdmin = (handler) => [
    {
        method : 'POST',
        path : '/admin',
        handler : handler.addAdminHandler,
        options: {
            auth: 'lelang_jwt',
            validate: {
                payload: Joi.object({
                    username: Joi.string().max(20).required(),
                    password: Joi.string().min(8).required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/admin',
        handler: handler.getAdminHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    {
        method: 'GET',
        path: '/admin/{username}',
        handler: handler.getAdminByUsernameHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/admin/{id}',
        handler: handler.updateAdminHandler,
        options: {
            auth: 'lelang_jwt',
            validate: {
                payload: Joi.object({
                    username: Joi.string().max(20).required(),
                    password: Joi.string().min(8)
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/admin/{id}',
        handler: handler.deleteAdminHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    
]   

module.exports = routesAdmin