const Joi = require("@hapi/joi")

const routesRegister = (handler) => [
    {
        method : 'POST',
        path : '/user/register',
        handler : handler.registerUserHandler,
        options: {
            validate: {
                payload: Joi.object({
                    nama_lengkap: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().min(8).required(),
                    telp: Joi.string().max(15).required(),
                })
            }
        }
    }
]   

module.exports = routesRegister