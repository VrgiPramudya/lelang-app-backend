const Joi = require("@hapi/joi")

const routes = handler => [
  {   
      method: 'POST',
      path: '/auth/admin',
      handler: handler.loginAdminHandler,
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.required(),
            password: Joi.required()
          })
        }
      }
  },
  {   
    method: 'POST',
    path: '/auth/user',
    handler: handler.loginUserHandler,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.required(), 
          password: Joi.required()
        })
      }
    }
  },

]

module.exports = routes