const mysql = require ('mysql2/promise');

class HistoryHandler{
    constructor(service){
        this._service = service

        this.addHistoryHandler = this.addHistoryHandler.bind(this)
        this.getHistoryHandler = this.getHistoryHandler.bind(this)
        this.updateHistoryHandler = this.updateHistoryHandler.bind(this)
        this.deleteHistoryHandler = this.deleteHistoryHandler.bind(this)
    }

    addHistoryHandler = async   (request, h) => {
        const {credentials} = request.auth

        if(credentials.role != "Admin"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            }).code(401)
        }

        const {id_penawaran} = request.payload

        this._service.addHistory({id_penawaran})

        const response = h.response({
            status: 'success',
            message: 'History berhasil ditambahkan'
        })

        response.code(201)
        return response
    }

    getHistoryHandler = async(request, h) => {
        const history = await this._service.getHistory()

        const response = h.response({
            status: 'success',
            data: {
                history
            }
        })

        response.code(201)
        return response
    }

    updateHistoryHandler = async (request, h) => {
        try{
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { id } = request.params
            const { id_lelang } = request.payload

            const cekHistory = await this._service.getHistoryById(id);

            if(cekHistory.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data history tidak ditemukan'
                })
                return response.code(404)
            }

            await this._service.editHistoryById(id, {id_lelang})

            return h.response({
                status: 'success',
                message: 'Data history berhasil diubah',
            })
        }catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteHistoryHandler = async (request, h) => {
        try {
            const {credentials} = request.auth

            if(credentials.role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { id } = request.params

            const cekHistory = await this._service.getHistoryById(id);

            if(cekHistory.length == 0){
                const response = h.response({
                    status: 'fail',
                    message: 'Data history tidak ditemukan'
                })
                return response.code(404)
            }

            this._service.deleteHistoryById(id)

            return h.response({
                status: 'success',
                message: 'History berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = HistoryHandler