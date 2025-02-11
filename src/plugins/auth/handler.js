const { generateToken } = require("../../tokenize/tokenManager")
const bcrypt = require('bcrypt')

class AuthHandler {
  constructor(adminService, userService) {
    this._adminService = adminService
    this._userService = userService
    
    this.loginAdminHandler = this.loginAdminHandler.bind(this)
    this.loginUserHandler = this.loginUserHandler.bind(this)
  }

  loginAdminHandler = async (request, h) => {
    try{
      const { username, password } = request.payload

      const authAdmin = await this._adminService.getAdminByUsername(username)
      if(authAdmin.length == 0){
        const response =  h.response({
            status: 'fail',
            message: 'username tidak ditemukan'
        })
        response.code(404)
        return response
      }

      const checkPass = bcrypt.compareSync(password,authAdmin[0].password);

      if(checkPass){
        const token = generateToken({ id: authAdmin[0].admin_id, role: "Admin" })
        const response = h.response({
            status: 'success',
            message: 'anda berhasil login', 
            data: {
                token,
                role:"Admin"
            }
        })
        response.code(200)
        return response
      }else{
          const response = h.response({
              status: 'fail',
              message: 'password tidak valid', 
          })
          response.code(401)
          return response
      }
    }catch (err) {
      return h.response({
          status: 'fail',
          message: err.message,
      })
    }
  }

  loginUserHandler = async (request, h) => {
    try{
      const { username, password } = request.payload

      const authUser = await this._userService.getUserByUsername(username)
      if(authUser.length == 0){
        const response =  h.response({
            status: 'fail',
            message: 'username tidak ditemukan'
        })
        response.code(404)
        return response
      }

      const checkPass = bcrypt.compareSync(password,authUser[0].password);


      if(checkPass){
        const token = generateToken({ id: authUser[0].user_id, role: "User" })
        const response = h.response({
            status: 'success',
            message: 'anda berhasil login', 
            data: {
                token,
                role:"User"
            }
        })
        response.code(200)
        return response
      }else{
          const response = h.response({
              status: 'fail',
              message: 'password tidak valid', 
          })
          response.code(401)
          return response
      }
    }catch (err) {
      return h.response({
          status: 'fail',
          message: err.message,
      })
    }
  }
}

module.exports = AuthHandler