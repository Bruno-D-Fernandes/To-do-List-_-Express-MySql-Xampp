const pool = require('../config/dataBase');

class TaskModel {

    static async createTask(tituloTarefa, descTarefa, idLista) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'INSERT INTO tbTarefa (tituloTarefa, descTarefa, idLista) VALUES (?, ?, ?)',
                [tituloTarefa, descTarefa, idLista]
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao criar tarefa: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateTask(idTarefa, tituloTarefa, descTarefa, idLista) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'UPDATE tbTarefa SET tituloTarefa = ?, descTarefa = ?, idLista = ? WHERE idTarefa = ?',
                [tituloTarefa, descTarefa, idLista, idTarefa]
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao atualizar tarefa: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async deleteTask(idTarefa) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'DELETE FROM tbTarefa WHERE idTarefa = ?',
                [idTarefa]
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao deletar tarefa: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async listTasks(idLista) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'SELECT * FROM tbTarefa WHERE idLista = ?',
                [idLista]
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao listar tarefas: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = TaskModel;