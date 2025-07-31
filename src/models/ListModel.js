const pool = require('../config/dataBase');

class ListModel {
    static async createTaskList(nomeLista, idUsuario) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'INSERT INTO tbLista (nomeLista, idUsuario) VALUES (?, ?)',
                [nomeLista, idUsuario]
            );
            return resultado;
        } catch (e) {
            console.error('Erro ao criar tarefa:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async deleteTaskList(idLista) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'DELETE FROM tbLista WHERE idLista = ?', [idLista]
            );
            return resultado;
        } catch (e) {
            console.error('Erro ao deletar tarefa:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateTaskList(idLista, novoNomeLista) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'UPDATE tbLista SET nomeLista = ? WHERE idLista = ?', [novoNomeLista, idLista]
            );
            return resultado;
        } catch (e) {
            console.error('Erro ao atualizar tarefa:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async listarTaskLists(idUsuario) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.query(
                'SELECT idLista, nomeLista FROM tbLista WHERE idUsuario = ?', [idUsuario]
            );
            return rows;
        } catch (e) {
            console.error('Erro ao listar listas:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async listarTaskListPorId(idUsuario, idLista) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.query(
                'SELECT nomeLista FROM tbLista WHERE idUsuario = ? AND idLista = ?', [idUsuario, idLista]
            );
            return rows;
        } catch (e) {
            console.error('Erro ao listar lista:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = ListModel;