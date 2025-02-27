class LelangServices{
    constructor(pool){
        this._pool = pool;
    }

    async addLelang({id_barang, tgl_lelang, status}){
        const[result] = await this._pool.execute('INSERT INTO tb_lelang (id_barang, tgl_lelang, status) VALUES (:id_barang, :tgl_lelang, :status)', { id_barang, tgl_lelang, status })
        return result
    }
    
    async getLelang() {
        const [rows] = await this._pool.query(`SELECT * FROM tb_lelang JOIN tb_barang ON tb_lelang.id_barang = tb_barang.id_barang
        `);
        return rows;
    }
    

    async getLelangById(id_lelang) {
        const [rows] = await this._pool.execute('SELECT * FROM tb_lelang WHERE id_lelang=:id_lelang', {id_lelang});
        return rows  
    }

    async editLelangById(id_lelang, {id_barang, tgl_lelang, status}){
        const[result] = await this._pool.execute('UPDATE tb_lelang SET id_barang=:id_barang, tgl_lelang=:tgl_lelang, status=:status WHERE id_lelang=:id_lelang', {id_barang, tgl_lelang, status, id_lelang})
        return result.affectedRows
    }

    async deleteLelangById(id_lelang){
        const [result] = await this._pool.execute('DELETE FROM tb_lelang WHERE id_lelang=:id_lelang', { id_lelang })
        return result.affectedRows
    }
}

module.exports = LelangServices