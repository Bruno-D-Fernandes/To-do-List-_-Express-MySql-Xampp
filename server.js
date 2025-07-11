const express = require('express');
//
// const cors = require('cors'); 
const taskModel = require('./src/models/ListModel');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
// app.use(cors());  ver o que é e como funciona esse cors

taskModel.createTaskList("Sexta task", 1)
// taskModel.listarListas(1);


app.listen(PORT, () => {
    console.log(`Porta ${PORT} aberta!`);
});



