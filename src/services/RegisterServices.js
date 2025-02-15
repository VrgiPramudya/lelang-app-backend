class RegisterServices{
    constructor(pool){
        this._pool = pool;
    }

    async userRegister(nama_lengkap, username, password, telp){
        const[result] = await this._pool.execute('INSERT INTO tb_user (nama_lengkap, username, password, telp) VALUES (:nama_lengkap, :username, :password, :telp)', { nama_lengkap, username, password, telp })
        console.log(result)
        return result.insertId
    }


    async cekUserByUsername(username) {
        const [rows] = await this._pool.execute('SELECT * FROM tb_user WHERE username=:username', {username});
        return rows
    }

}

module.exports = RegisterServices