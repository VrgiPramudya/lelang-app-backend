class BarangHandler{
    constructor(service){
        this._service = service

        this.addBarangHandler = this.addBarangHandler.bind(this)
        this.getBarangHandler = this.getBarangHandler.bind(this)
        this.updateBarangHandler = this.updateBarangHandler.bind(this)
        this.deleteBarangHandler = this.deleteBarangHandler.bind(this)
    }

    addBarangHandler = async (request, h) => {
        const {role} = request.auth.credentials

        if(role != "User" && role != "Petugas" && role != "Admin"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            }).code(401)
        }

        const {nama_barang, tanggal, harga_awal, deskripsi_barang} = request.payload

        this._service.addBarang({nama_barang, tanggal, harga_awal, deskripsi_barang})

        const response = h.response({
            status: 'success',
            message: 'Barang berhasil ditambahkan'
        })

        response.code(201)
        return response
    }

    getBarangHandler = async(request, h) => {
        const {role} = request.auth.credentials

        if(role != "User" && role != "Petugas" && role != "Admin"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses',
                role: credentials
            }).code(401)
        }

        const barang = await this._service.getBarang()

        const response = h.response({
            status: 'success',
            data: {
                barang
            }
        })

        response.code(201)
        return response
    }

    updateBarangHandler = async (request, h) => {
        try{
            const {role} = request.auth.credentials

            if(role != "User" && role != "Petugas"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }

            const { id } = request.params
            const { nama_barang, tanggal, harga_awal, deskripsi_barang } = request.payload
            const cekBarang = await this._service.getBarangById(id);

            if(cekBarang.length == 0){
               const response = h.response({
                    status: 'fail',
                    message: 'Data barang tidak ditemukan'
                })
                return response.code(404);
            }

            await this._service.editBarangById(id, {nama_barang, tanggal, harga_awal, deskripsi_barang})

            return h.response({
                status: 'success',
                message: 'Data barang berhasil diubah',
            })
        }catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteBarangHandler = async (request, h) => {
        
        try {
            const {role} = request.auth.credentials

            if(role != "User" && role != "Petugas" && role != "Admin"){
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401)
            }
            
            const { id } = request.params

            const cekBarang = await this._service.getBarangById(id);

            if(cekBarang.length == 0){
               const response = h.response({
                    status: 'fail',
                    message: 'Data barang tidak ditemukan'
                })
                return response.code(404);
            }

            this._service.deleteBarangById(id)

            return h.response({
                status: 'success',
                message: 'Data barang berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = BarangHandler