const path = require('path'); // Entender o path 
const express = require('express');
const app = express();

const listRouter = require('./routes/listRouter');
const userRouter = require('./routes/userRouter'); 
const taskRouter = require('./routes/taskRouter'); 
const loginRouter = require('./routes/loginRouter');
const homeRouter = require('./routes/homeRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Entender o que é e como funciona

// app.use(cors()); // se for usar CORS 
app.use(express.static(path.join(__dirname, '..', 'views', 'assets')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use('/home', homeRouter);
// app.use('/registro', loginRouter);
app.use('/login', loginRouter)
app.use('/listas', listRouter);
app.use('/usuarios', userRouter);
app.use('/task', taskRouter); 

module.exports = app;