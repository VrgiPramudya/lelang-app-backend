class PenawaranServices{
    constructor(pool){
        this._pool = pool;
    }

    async addPenawaran(id_lelang, nominal, user_id) {
        if (!id_lelang || !nominal || !user_id) {
            throw new Error("Semua field wajib diisi");
        }
    
        const [result] = await this._pool.execute(
            'INSERT INTO tb_penawaran (id_lelang, nominal, user_id) VALUES (:id_lelang, :nominal, :user_id)', 
            { id_lelang, nominal, user_id }
        );
    
        console.log(result);
        return result.insertId;
    }
    
    
    async getPenawaran() {
        const query = `
            SELECT 
                p.id_penawaran, 
                p.nominal, 
                u.username, 
                l.id_lelang, 
                l.status, 
                b.nama_barang, 
                b.tanggal,
                b.harga_awal
            FROM tb_penawaran p
            JOIN tb_lelang l ON p.id_lelang = l.id_lelang
            JOIN tb_barang b ON l.id_barang = b.id_barang
            JOIN tb_user u ON p.user_id = u.user_id
        `;
    
        const [rows] = await this._pool.query(query);
        console.log(rows);
        return rows;
    }
    

    async getPenawaranById(id_penawaran) {
        const [rows] = await this._pool.execute(`SELECT 
                p.id_penawaran, 
                p.nominal, 
                u.username, 
                l.id_lelang, 
                l.status, 
                b.nama_barang, 
                b.tanggal,
                b.harga_awal
            FROM tb_penawaran p
            JOIN tb_lelang l ON p.id_lelang = l.id_lelang
            JOIN tb_barang b ON l.id_barang = b.id_barang
            JOIN tb_user u ON p.user_id = u.user_id
            WHERE id_penawaran=:id_penawaran`, {id_penawaran});
        return rows
    }

    async editPenawaranById(id_penawaran, id_lelang, nominal, user_id){
        const[result] = await this._pool.execute('UPDATE tb_penawaran SET id_lelang=:id_lelang, nominal=:nominal, user_id=:user_id WHERE id_penawaran=:id_penawaran', {id_lelang, nominal, user_id, id_penawaran})
        return result
    }

    async deletePenawaranById(id_penawaran){
        const [result] = await this._pool.execute('DELETE FROM tb_penawaran WHERE id_penawaran=:id_penawaran', { id_penawaran })
        return result.affectedRows
    }
}

module.exports = PenawaranServices