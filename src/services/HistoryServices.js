class HistoryServices{
    constructor(pool){
        this._pool = pool;
    }

    async addHistory({id_lelang}){
        const[result] = await this._pool.execute('INSERT INTO history_lelang (id_lelang) VALUES (:id_lelang)', { id_lelang })
        console.log(result)
        return result.InsertId
    }
    
    async getHistory() {
        const [rows] = await this._pool.query('SELECT * FROM history_lelang')
        console.log(rows)
        return rows
    }

    async getHistoryById(id_history) {
        const [rows] = await this._pool.query('SELECT * FROM history_lelang WHERE id_history=:id_history', {id_history})
        return rows
    }

    async editHistoryById(id_history, {id_lelang}){
        const[result] = await this._pool.execute('UPDATE history_lelang SET id_lelang=:id_lelang WHERE id_history=:id_history', {id_lelang, id_history})
        return result.affectedRows
    }

    async deleteHistoryById(id_history){
        const [result] = await this._pool.execute('DELETE FROM history_lelang WHERE id_history=:id_history', { id_history })
        return result.affectedRows
    }
}

module.exports = HistoryServices