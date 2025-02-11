class LelangHandler{
    constructor(service){
        this._service = service

        this.addLelangHandler = this.addLelangHandler.bind(this)
        this.getLelangHandler = this.getLelangHandler.bind(this)
        this.getLelangByIdHandler = this.getLelangByIdHandler.bind(this)
        this.updateLelangHandler = this.updateLelangHandler.bind(this)
        this.deleteLelangHandler = this.deleteLelangHandler.bind(this)
    }

    addLelangHandler = async (request, h) => {
        try{
            const { role } = request.auth.credentials

            if (role != "Admin") {
                const response = h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                })
                response.code(401)
                return response
            }

            const {id_barang, tgl_lelang, status} = request.payload

            await this._service.addLelang({id_barang, tgl_lelang, status})

            const response = h.response({
                status: 'success',
                message: 'Berhasil menambahkan lelang'
            })

            response.code(201)
            return response
        }catch (err) {
            console.log(err)
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    getLelangHandler = async(request, h) => {
        const { role } = request.auth.credentials

        if (role != 'Admin' && role != "User") {
            const response = h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            })
            response.code(401)
            return response
        }

        const dataLelang = await this._service.getLelang()

        const response = h.response({
            status: 'success',
            data: {
                dataLelang
            }
        })

        response.code(201)
        return response
    }

    getLelangByIdHandler = async(request, h) => {
        const { role } = request.auth.credentials

        if (role != "Admin" && role != "User") {
            const response = h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            })
            response.code(401)
            return response
        }

        const { id } = request.params
        const dataLelang = await this._service.getLelangById(id)

        const response = h.response({
            status: 'success',
            data: {
                dataLelang
            }
        })

        response.code(201)
        return response
    }

    updateLelangHandler = async (request, h) => {
        try{
            const { role } = request.auth.credentials

            if (role != 'Admin') {
                const response = h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                })
                response.code(401)
                return response
            }

            const { id } = request.params
            const {id_barang, tgl_lelang, status} = request.payload

            const dataLelang = await this._service.getLelangById(id);

            if (dataLelang.length == 0) {
                const response = h.response({
                    status: 'failed',
                    message: 'Data lelang tidak ditemukan'
                });
                return response.code(404);
            }

            await this._service.editLelangById(id, {id_barang, tgl_lelang, status})

            const response = h.response({
                status: 'success',
                message: 'Data lelang berhasil diubah',
            })

            return response.code(200);
        }catch (err) {
            const response =  h.response({
                status: 'fail',
                message: err.message,
            })

            return response.code(400);
        }
    }

    deleteLelangHandler = async (request, h) => {

        try {
            const { role } = request.auth.credentials

            if ( role != 'Admin' ) {
                const response = h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                })
                response.code(401)
                return response
            }
        
            const { id } = request.params
            const dataLelang = await this._service.getLelangById(id);

            if(dataLelang.length == 0){
               const response = h.response({
                    status: 'failed',
                    message: 'Data lelang tidak ditemukan'
                })
                return response.code(404);
            }

            this._service.deleteLelangById(id)

            return h.response({
                status: 'success',
                message: 'Data lelang berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = LelangHandler