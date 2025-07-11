const express = require('express');
const TaskModel = require('./models/TaskModel'); 
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors()); 

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.getAllTasks(); 
        res.json(tasks); 
    } catch (error) {
        console.error('Erro na rota /tasks:', error);
        res.status(500).json({ message: 'Erro ao buscar tarefas.' });
    }
});

app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'O título da tarefa é obrigatório.' });
    }
    try {
        const newTask = await TaskModel.createTask(title, description);
        res.status(201).json(newTask); // 201 Created
    } catch (error) {
        console.error('Erro na rota POST /tasks:', error);
        res.status(500).json({ message: 'Erro ao criar tarefa.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Verificando conexão com o banco de dados...');
    require('./config/db'); 
});
