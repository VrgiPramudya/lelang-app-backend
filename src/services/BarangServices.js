const fs = require('fs');
const path = require('path');

class BarangServices{
    constructor(pool){
        this._pool = pool;
    }

    async addBarang({ foto, nama_barang, tanggal, harga_awal, deskripsi_barang }) {
        const [result] = await this._pool.execute('INSERT INTO tb_barang (foto, nama_barang, tanggal, harga_awal, deskripsi_barang) VALUES (:foto, :nama_barang, :tanggal, :harga_awal, :deskripsi_barang)',{foto, nama_barang, tanggal, harga_awal, deskripsi_barang});
        return result.insertId;
    }
    
    async getBarang() {
        const [rows] = await this._pool.query('SELECT * FROM tb_barang')
        return rows
    }

    async getBarangById(id_barang) {
        const [rows] = await this._pool.query('SELECT * FROM tb_barang WHERE id_barang=:id_barang', {id_barang})
        return rows
    }

    async editBarangById(id_barang, {foto, nama_barang, tanggal, harga_awal, deskripsi_barang}){
        const[result] = await this._pool.execute('UPDATE tb_barang SET foto=:foto, nama_barang=:nama_barang, tanggal=:tanggal, harga_awal=:harga_awal, deskripsi_barang=:deskripsi_barang WHERE id_barang=:id_barang', {foto, nama_barang, tanggal, harga_awal, deskripsi_barang, id_barang})
        return result.affectedRows
    }

    async deleteBarangById(id_barang){
        const [result] = await this._pool.execute('DELETE FROM tb_barang WHERE id_barang=:id_barang', { id_barang })
        return result.affectedRows
    }
}

module.exports = BarangServices