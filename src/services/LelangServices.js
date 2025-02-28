class LelangServices{
    constructor(pool){
        this._pool = pool;
    }

    async addLelang({id_barang, status}){
        const[result] = await this._pool.execute('INSERT INTO tb_lelang (id_barang, status) VALUES (:id_barang, :status)', { id_barang, status })
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

    async editLelangById(id_lelang, {id_barang, status}){
        const[result] = await this._pool.execute('UPDATE tb_lelang SET id_barang=:id_barang, status=:status WHERE id_lelang=:id_lelang', {id_barang, status, id_lelang})
        return result.affectedRows
    }

    async deleteLelangById(id_lelang){
        const [result] = await this._pool.execute('DELETE FROM tb_lelang WHERE id_lelang=:id_lelang', { id_lelang })
        return result.affectedRows
    }
}

module.exports = LelangServices