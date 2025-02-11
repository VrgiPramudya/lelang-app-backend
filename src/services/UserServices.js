class UserServices{
    constructor(pool){
        this._pool = pool;
    }

    async addUser(nama_lengkap, username, password, telp){
        const[result] = await this._pool.execute('INSERT INTO tb_user (nama_lengkap, username, password, telp) VALUES (:nama_lengkap, :username, :password, :telp)', { nama_lengkap, username, password, telp })
        console.log(result)
        return result.InsertId
    }
    
    async getUser() {
        const [rows] = await this._pool.query('SELECT * FROM tb_user')
        console.log(rows)
        return rows
    }

    async getUserByUsername(username) {
        const [rows] = await this._pool.execute('SELECT * FROM tb_user WHERE username=:username', {username});
        return rows
    }

    async getUserById(id) {
        const [rows] = await this._pool.execute('SELECT * FROM tb_user WHERE user_id=:id', {id});
        return rows
    }

    async editUserById(user_id, nama_lengkap, username, password, telp){
        const[result] = await this._pool.execute('UPDATE tb_user SET nama_lengkap=:nama_lengkap, username=:username, password=:password, telp=:telp WHERE user_id=:user_id', {nama_lengkap, username, password, telp, user_id})
        return result.affectedRows
    }

    async deleteUserById(user_id){
        const [result] = await this._pool.execute('DELETE FROM tb_user WHERE user_id=:user_id', { user_id })
        return result.affectedRows
    }
}

module.exports = UserServices