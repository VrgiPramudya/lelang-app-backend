const bcrypt = require('bcrypt');
class UserHandler{
    constructor(service){
        this._service = service

        this.addUserHandler = this.addUserHandler.bind(this)
        this.getUserHandler = this.getUserHandler.bind(this)
        this.getUserByUsernameHandler = this.getUserByUsernameHandler.bind(this)
        this.updateUserHandler = this.updateUserHandler.bind(this)
        this.deleteUserHandler = this.deleteUserHandler.bind(this)
    }

    addUserHandler = async (request, h) => {
        try {
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }
                
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

            this._service.addUser(nama_lengkap, username, passHash,telp)

            return h.response({
                status: 'success',
                message: 'Berhasil menambahkan user'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    getUserHandler = async(request, h) => {
        const {credentials} = request.auth

        if(credentials.role != "Admin" && credentials.role != "Petugas"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            }).code(401)
        }
            
        const dataUser = await this._service.getUser()

        const response = h.response({
            status: 'success',
            data: {
                dataUser
            }
        })

        response.code(201)
        return response
    }

    getUserByUsernameHandler = async(request, h) => {
        
        try {
            const {credentials} = request.auth

            if(credentials.role != "Admin" && credentials.role != "Petugas"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { username } = request.params
            const dataUser = await this._service.getUserByUsername(username)

            return h.response({
                status: 'success',
                data: {
                    dataUser
                }
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    updateUserHandler = async (request, h) => {
        try{
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { id } = request.params
            const { nama_lengkap, username, password, telp } = request.payload

            const saltRounds = 10;
            const passHash = bcrypt.hashSync(password,saltRounds);

            const cekUser = await this._service.getUserById(id);

            if(cekUser.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data user tidak ditemukan'
                })
                return response.code(404)
            }

            await this._service.editUserById(id, nama_lengkap, username, passHash, telp)

            return h.response({
                status: 'success',
                message: 'Data user berhasil diubah',
            })
        }catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteUserHandler = async (request, h) => {

        try {
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }
            
            const { id } = request.params
            const cekSiswa = await this._service.getUserById(id);

            if(cekSiswa.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data User tidak ditemukan'
                })
                return response.code(404)
            }
            this._service.deleteUserById(id)

            return h.response({
                status: 'success',
                message: 'Data User berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = UserHandler