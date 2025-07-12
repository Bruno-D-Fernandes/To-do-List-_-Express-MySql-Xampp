const express = require('express');
const app = express();

const listRouter = require('./routes/listRouter');
const userRouter = require('./routes/userRouter'); 
const taskRouter = require('./routes/taskRouter'); 


app.use(express.json());
// app.use(cors()); // se for usar CORS

app.use('/listas', listRouter);
app.use('/usuarios', userRouter);
app.use('/task', taskRouter); 


module.exports = app;