class HistoryServices{
    constructor(pool){
        this._pool = pool;
    }

    async addHistory({id_penawaran}){
        const[result] = await this._pool.execute('INSERT INTO history_lelang (id_penawaran) VALUES (:id_penawaran)', { id_penawaran })
        console.log(result)
        return result.InsertId
    }
    
    async getHistory() {
        const query = `
            SELECT hl.id_history, p.id_penawaran, l.id_lelang, l.status, 
            b.id_barang, b.tanggal, b.nama_barang, b.harga_awal, u.user_id, u.nama_lengkap
            FROM history_lelang hl
            JOIN tb_penawaran p ON hl.id_penawaran = p.id_penawaran
            JOIN tb_lelang l ON p.id_lelang = l.id_lelang
            JOIN tb_barang b ON l.id_barang = b.id_barang
            JOIN tb_user u ON p.user_id = u.user_id
        `;
        const [rows] = await this._pool.query(query);
        return rows;
    }
    

    async getHistoryById(id_history) {
        const query = `
            SELECT hl.id_history, p.id_penawaran, l.id_lelang, l.status, 
            b.id_barang, b.nama_barang, b.tanggal, b.harga_awal, u.user_id, u.nama_lengkap
            FROM history_lelang hl
            JOIN tb_penawaran p ON hl.id_penawaran = p.id_penawaran
            JOIN tb_lelang l ON p.id_lelang = l.id_lelang
            JOIN tb_barang b ON l.id_barang = b.id_barang
            JOIN tb_user u ON p.user_id = u.user_id
            WHERE hl.id_history = :id_history
        `;
        const [rows] = await this._pool.query(query, { id_history });
        return rows;
    }
    

    async editHistoryById(id_history, {id_penawaran}){
        const[result] = await this._pool.execute('UPDATE history_lelang SET id_penawaran=:id_penawaran WHERE id_history=:id_history', {id_penawaran, id_history})
        return result.affectedRows
    }

    async deleteHistoryById(id_history){
        const [result] = await this._pool.execute('DELETE FROM history_lelang WHERE id_history=:id_history', { id_history })
        return result.affectedRows
    }
}

module.exports = HistoryServices