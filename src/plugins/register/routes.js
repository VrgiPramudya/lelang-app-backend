const Joi = require("@hapi/joi")

const routesRegister = (handler) => [
    {
        method : 'POST',
        path : '/user/register',
        handler : handler.registerUserHandler,
        options: {
            // auth: 'lelang_jwt',
            validate: {
                payload: Joi.object({
                    nama_lengkap: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().min(8).required(),
                    telp: Joi.string().required(),
                })
            }
        }
    }
]   

module.exports = routesRegister