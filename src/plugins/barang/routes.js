const Joi = require("@hapi/joi")

const routesBarang = (handler) => [
    {
        method: 'POST',
        path: '/barang',
        handler: handler.addBarangHandler,
        options: {
            auth: 'lelang_jwt',
            payload: {
                maxBytes: 10485760, // Maksimal 10MB untuk file
                output: 'stream',  // Mengirim file sebagai stream
                parse: true,
                multipart: true
            },
            validate: {
                payload: Joi.object({
                    foto: Joi.object().required(),
                    nama_barang: Joi.string().required(),
                    tanggal: Joi.date().required(),
                    harga_awal: Joi.number().required(),
                    deskripsi_barang: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/barang',
        handler: handler.getBarangHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    {
        method: "PUT",
        path: "/barang/{id}",
        handler: handler.updateBarangHandler,
        options: {
            auth: "lelang_jwt",
            payload: {
                maxBytes: 10485760, // Maksimal 10MB
                output: "stream",
                parse: true,
                multipart: true
            },
            validate: {
                payload: Joi.object({
                    foto: Joi.object().optional(),
                    nama_barang: Joi.string(),
                    tanggal: Joi.date(),
                    harga_awal: Joi.number(),
                    deskripsi_barang: Joi.string()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/barang/{id}',
        handler: handler.deleteBarangHandler,
        options: {
            auth: 'lelang_jwt'
        }
    },
    
]   

module.exports = routesBarang