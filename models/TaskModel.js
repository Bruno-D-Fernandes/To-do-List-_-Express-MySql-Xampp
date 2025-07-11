const pool = require('../serverConfig/serConfig');

class TaskModel {
    // Método para buscar todas as tarefas
    static async getAllTasks() {
        try {
            const [rows] = await pool.query('SELECT * FROM tasks');
            return rows;
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            throw error; 
        }
    }

    // Método para buscar uma tarefa por ID
    static async getTaskById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
            return rows[0]; 
        } catch (error) {
            console.error('Erro ao buscar tarefa por ID:', error);
            throw error;
        }
    }

    // Método para criar uma nova tarefa
    static async createTask(title, description) {
        try {
            const [result] = await pool.query(
                'INSERT INTO tasks (title, description) VALUES (?, ?)',
                [title, description]
            );
            return { id: result.insertId, title, description, completed: false };
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    }

    // Método para atualizar uma tarefa
    static async updateTask(id, title, description, completed) {
        try {
            const [result] = await pool.query(
                'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            throw error;
        }
    }

    // Método para deletar uma tarefa
    static async deleteTask(id) {
        try {
            const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
            return result.affectedRows > 0; 
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            throw error;
        }
    }
}

module.exports = TaskModel;
