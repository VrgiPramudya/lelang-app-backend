const bcrypt = require('bcrypt');
class PenawaranHandler {
    constructor(service) {
        this._service = service

        this.addPenawaranHandler = this.addPenawaranHandler.bind(this)
        this.getPenawaranHandler = this.getPenawaranHandler.bind(this)
        this.getPenawaranByIdHandler = this.getPenawaranByIdHandler.bind(this)
        this.updatePenawaranHandler = this.updatePenawaranHandler.bind(this)
        this.deletePenawaranHandler = this.deletePenawaranHandler.bind(this)
    }

    addPenawaranHandler = async (request, h) => {
        try{
            const { id, role } = request.auth.credentials;

            if(role != "User"){
                const response =  h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                })
                response.code(401);
                return response;
            }

            const {id_lelang} = request.params
            const {nominal} = request.payload  

            await this._service.addPenawaran( id_lelang, nominal, id )

            return h.response({
                status: 'success',
                message: 'Penawaran berhasil ditambahkan',
            })
        }catch(err){
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    getPenawaranHandler = async (request, h) => {
        const dataPenawaran = await this._service.getPenawaran()

        const response = h.response({
            status: 'success',
            data: {
                dataPenawaran
            }
        })

        response.code(201)
        return response
    }

    getPenawaranByIdHandler = async(request, h) => {
        const { id_penawaran } = request.params

        const dataPenawaran = await this._service.getPenawaranById(id_penawaran)

        const response = h.response({
            status: 'success',
            data: {
                dataPenawaran
            }
        })

        response.code(201)
        return response
    }

    updatePenawaranHandler = async (request, h) => {
        try {
            const {id, role} = request.auth.credentials

            if(role != "User"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { id_penawaran, id_lelang } = request.params
            const {nominal} = request.payload

            const cekPenawaran = await this._service.getPenawaranById(id_penawaran);

            if(cekPenawaran.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data penawaran tidak ditemukan'
                })
                return response.code(404)
            }

            await this._service.editPenawaranById(id_penawaran, id_lelang, nominal, id )

            return h.response({
                status: 'success',
                message: 'Data penawaran berhasil diubah',
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deletePenawaranHandler = async (request, h) => {

        try {
            const { id, role} = request.auth.credentials

            if(role != "Admin" && role != "User"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }
            
            const { id_penawaran } = request.params

            const cekPenawaran = await this._service.getPenawaranById(id_penawaran);

            if(cekPenawaran.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data penawaran tidak ditemukan'
                })
                return response.code(404)
            }

            this._service.deletePenawaranById(id_penawaran)

            return h.response({
                status: 'success',
                message: 'Data penawaran berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = PenawaranHandler