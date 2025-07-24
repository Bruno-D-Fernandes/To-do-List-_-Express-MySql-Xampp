require('dotenv').config(); 
const mysql2 = require('mysql2/promise');

const poolConnection = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
