const fs = require('fs'); // Tambahkan ini
const path = require("path");

class BarangHandler{
    constructor(service){
        this._service = service

        this.addBarangHandler = this.addBarangHandler.bind(this)
        this.getBarangHandler = this.getBarangHandler.bind(this)
        this.updateBarangHandler = this.updateBarangHandler.bind(this)
        this.deleteBarangHandler = this.deleteBarangHandler.bind(this)
    }

    addBarangHandler = async (request, h) => {
        try{
            const { role } = request.auth.credentials;
            if (role !== "Admin") {
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401);
            }
        
            const { foto, nama_barang, tanggal, harga_awal, deskripsi_barang } = request.payload;

            const uploadDir = path.join(__dirname, '../../uploads');

            // Pastikan direktori ada
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filename = `${Date.now()}-${foto.hapi.filename}`;
            const imgPath = path.join(uploadDir, filename);
            const fileStream = fs.createWriteStream(imgPath);

            await new Promise((resolve, reject) => {
                foto.pipe(fileStream);
                foto.on('end', resolve);
                foto.on('error', reject);
            });

            await this._service.addBarang({ foto: imgPath, nama_barang, tanggal, harga_awal, deskripsi_barang });
        
            return h.response({
                status: 'success',
                message: 'Barang berhasil ditambahkan'
            }).code(201);
        } catch (err) {
            console.error(err);
            return h.response({
                status: 'fail',
                message: err.message
            }).code(400);
        }
    };    

    getBarangHandler = async(request, h) => {
        const {role} = request.auth.credentials

        if(role !== "User" && role !== "Petugas" && role !== "Admin"){
            return h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            }).code(401);
        }

        const barang = await this._service.getBarang();

        return h.response({
            status: 'success',
            data: { barang }
        }).code(200);
    }

    updateBarangHandler = async (request, h) => {
        try {
            const { role } = request.auth.credentials;
            if (role !== "Admin") {
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401);
            }

            const { id } = request.params;
            const { nama_barang, tanggal, harga_awal, deskripsi_barang } = request.payload;
            const cekBarang = await this._service.getBarangById(id);

            if (cekBarang.length === 0) {
                return h.response({
                    status: 'fail',
                    message: 'Data barang tidak ditemukan'
                }).code(404);
            }

            await this._service.editBarangById(id, { nama_barang, tanggal, harga_awal, deskripsi_barang });

            return h.response({
                status: 'success',
                message: 'Data barang berhasil diubah',
            }).code(200);
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            }).code(400);
        }
    }

    deleteBarangHandler = async (request, h) => {
        try {
            const { role } = request.auth.credentials;
            if (role !== "Admin") {
                return h.response({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                }).code(401);
            }
            
            const { id } = request.params;
            const cekBarang = await this._service.getBarangById(id);

            if (cekBarang.length === 0) {
                return h.response({
                    status: 'fail',
                    message: 'Data barang tidak ditemukan'
                }).code(404);
            }

            await this._service.deleteBarangById(id);

            return h.response({
                status: 'success',
                message: 'Data barang berhasil dihapus'
            }).code(200);
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            }).code(400);
        }
    }
}

module.exports = BarangHandler;
