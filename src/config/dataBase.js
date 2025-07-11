require('dotenv').config(); // depois estudar isso
const mysql2 = require('mysql2/promise');

const poolConnection = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbTodoListJAVA',
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0, 
});

async function testConnection() {
    try {
        const connection = await poolConnection.getConnection(); 
        console.log('Conectado ao banco de dados MySQL!');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
        process.exit(1); 
    }
}

testConnection();
module.exports = poolConnection;
