const bcrypt = require('bcrypt');
class AdminHandler{
    constructor(service){
        this._service = service

        this.addAdminHandler = this.addAdminHandler.bind(this)
        this.getAdminHandler = this.getAdminHandler.bind(this)
        this.getAdminByUsernameHandler = this.getAdminByUsernameHandler.bind(this)
        this.updateAdminHandler = this.updateAdminHandler.bind(this)
        this.deleteAdminHandler = this.deleteAdminHandler.bind(this)
    }

    generatePassword = (password) => {
        const saltRounds = 10;
        return bcrypt.hashSync(password,saltRounds);
    }

    addAdminHandler = async (request, h) => {
        const {credentials} = request.auth

        if(credentials.role != "Admin"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            }).code(401)
        }

        const {username, password} = request.payload

        const passHash = this.generatePassword(password)
        const cekUsername = await this._service.getAdminByUsername(username)

        if(cekUsername.length > 0){
            return h.response({
                status: 'fail',
                message: 'Username tersebut telah digunakan'
            }).code(409)
        }

        const userId = await this._service.addAdmin(username, passHash);

        const response = h.response({
            status: 'success',
        })

        response.code(201)
        return response
    }

    getAdminHandler = async(request, h) => {
        const {credentials} = request.auth

        if(credentials.role != "Admin"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            }).code(401)
        }

        const admin = await this._service.getAdmin()

        const response = h.response({
            status: 'success',
            data: {
                admin
            }
        })

        response.code(201)
        return response
    }

    getAdminByUsernameHandler = async(request, h) => {
        
        try {
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { username } = request.params
            const admin = await this._service.getAdminByUsername(username)

            return h.response({
                status: 'success',
                data: {
                    admin
                }
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    updateAdminHandler = async (request, h) => {
        try{
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { id } = request.params
            const { username, password } = request.payload
            const passHash = this.generatePassword(password)

            const cekAdmin = await this._service.getAdminById(id);

            if(cekAdmin.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data admin tidak ditemukan'
                })
                return response.code(404)
            }


            await this._service.editAdminById(id, username, passHash)

            return h.response({
                status: 'success',
                message: 'Data admin berhasil diubah',
            })
        }catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteAdminHandler = async (request, h) => {
        try {
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }
            
            const { id } = request.params
            const cekAdmin = await this._service.getAdminById(id);

            if(cekAdmin.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data admin tidak ditemukan'
                })
                return response.code(404)
            }
            
            this._service.deleteAdminById(id)

            return h.response({
                status: 'success',
                message: 'Admin berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = AdminHandler