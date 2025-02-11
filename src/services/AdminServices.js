class AdminServices{
    constructor(pool){
        this._pool = pool;
    }

    async addAdmin(username, password){
        const[result] = await this._pool.execute('INSERT INTO tb_admin (username, password) VALUES (:username, :password)', { username, password })
        return result.InsertId
    }
    
    async getAdmin() {
        const [rows] = await this._pool.query('SELECT * FROM tb_admin')
        console.log(rows)
        return rows
    }

    async getAdminByUsername(username) {
        const [rows] = await this._pool.execute('SELECT * FROM tb_admin WHERE username=:username', {username});
        return rows
    }

    async getAdminById(admin_id) {
        const [rows] = await this._pool.execute('SELECT * FROM tb_admin WHERE admin_id=:admin_id', {admin_id});
        return rows
    }

    async editAdminById(id, username, password){
        const[result] = await this._pool.execute('UPDATE tb_admin SET username=:username, password=:password WHERE admin_id=:id', {username, password, id})
        return result.affectedRows
    }

    async deleteAdminById(id){
        const [result] = await this._pool.execute('DELETE FROM tb_admin WHERE admin_id=:id', { id })
        return result.affectedRows
    }
}

module.exports = AdminServices