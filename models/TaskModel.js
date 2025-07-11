const pool = require('../serverConfig/serConfig');

class taskModel {

    static async createTaskList (nomeLista, idUsuario){
        const connection = await pool.getConnection();
        try{
            const resultado = await connection.query(
                'INSERT INTO tbLista (nomeLista, idUsuario) VALUES (?, ?)',
                [nomeLista, idUsuario]
            );
            return resultado;
        }catch(e){
            console.error('Erro ao criar tarefa. Erro: ' + e);
            throw e;
        }finally{
            connection.release();
        }

    }

}

module.exports = taskModel;