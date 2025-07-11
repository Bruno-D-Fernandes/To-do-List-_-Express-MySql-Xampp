const express = require('express');
//
// const cors = require('cors'); 
const taskModel = require('./models/TaskModel');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
// app.use(cors());  ver o que é e como funciona esse cors

taskModel.createTaskList("Primeira task", 1)


app.listen(PORT, () => {
    console.log('oi')  
})



