const bcrypt = require('bcrypt');
class RegisterHandler{
    constructor(service){
        this._service = service

        this.registerUserHandler = this.registerUserHandler.bind(this)
    }

    registerUserHandler = async (request, h) => {
        const { nama_lengkap, username, password, telp } = request.payload

        const saltRounds = 10;
        const passHash = bcrypt.hashSync(password,saltRounds);

        const cekUsername = await this._service.getUserByUsername(username)

        if(cekUsername.length > 0){
            return h.response({
                status: 'fail',
                message: 'Username tersebut telah digunakan'
            }).code(409)
        }

        this._service.addUser(nama_lengkap, username, password, passHash,telp)

        const response = h.response({
            status: 'success',
            message: 'Berhasil menambahkan siswa'
        })

        response.code(201)
        return response
    }
}

module.exports = RegisterHandler