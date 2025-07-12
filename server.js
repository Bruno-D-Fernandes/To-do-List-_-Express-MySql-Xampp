// const cors = require('cors'); 
// app.use(cors());  ver o que é e como funciona esse cors
const express = require('express');
const app = require('./src/app');
const PORT = process.env.PORT || 3000;

// app.use(express.json());
// taskModel.createTaskList("Sexta task", 1)
// taskModel.listarListas(1);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


