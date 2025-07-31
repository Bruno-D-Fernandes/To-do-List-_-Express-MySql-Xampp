const pool = require('../config/dataBase');

class UserModel {

    static async createUser(nomeUser, emailUser, senhaUser) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(
        'INSERT INTO tbUsuario (nomeUsuario, emailUsuario, senhaUsuario) VALUES (?, ?, ?)',
        [nomeUser, emailUser, senhaUser]
        );
        return result;
    } catch (e) {
        throw e;
    } finally {
        if (connection) connection.release();
    }
    }


    static async updateUser(idUser, nomeUser, emailUser, senhaUser) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'UPDATE tbUsuario SET nomeUsuario = ?, emailUsuario = ?, senhaUsuario = ? WHERE idUsuario = ?',
                [nomeUser, emailUser, senhaUser, idUser]
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao atualizar usuário: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async deleteUser(idUser) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'DELETE FROM tbUsuario WHERE idUsuario = ?',
                [idUser]
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao deletar usuário: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async listUsers() {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'SELECT * FROM tbUsuario'
            );
            return resultado;
        } catch (e) {
            console.log('Erro ao listar usuários: ', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getUserById(idUser) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'SELECT * FROM tbUsuario WHERE idUsuario = ?',
                [idUser]
            );
            return resultado;
        } catch (e) {
            console.error('Error fetching user by idUsuario:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getUserByEmail(emailUser) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [resultado] = await connection.query(
                'SELECT * FROM tbUsuario WHERE emailUsuario = ?',
                [emailUser]
            );
            return resultado;
        } catch (e) {
            console.error('Error fetching user by emailUsuario:', e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

}

module.exports = UserModel;