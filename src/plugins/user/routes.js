const Joi = require("@hapi/joi")

const routesUser = (handler) => [
    {
        method : 'POST',
        path : '/user',
        handler : handler.addUserHandler,
        // options: {
        //     auth: 'lelang_jwt',
        //     validate: {
        //         payload: Joi.object({
        //             nama_lengkap: Joi.string().required(),
        //             username: Joi.string().required(),
        //             password: Joi.string().min(8).required(),
        //             telp: Joi.string().required(),
        //         })
        //     }
        // }
    },
    {
        method: 'GET',
        path: '/user',
        handler: handler.getUserHandler,
        // options: {
        //     auth: 'lelang_jwt'
        // }
    },
    {
        method: 'GET',
        path: '/user/{username}',
        handler: handler.getUserByUsernameHandler,
        // options: {
        //     auth: 'lelang_jwt'
        // }
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        handler: handler.updateUserHandler,
        options: {
            auth: 'lelang_jwt',
            validate: {     
                payload: Joi.object({
                    nama_lengkap: Joi.string(),
                    username: Joi.string(),
                    password: Joi.string(),
                    telp: Joi.string()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: handler.deleteUserHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    
]   

module.exports = routesUser