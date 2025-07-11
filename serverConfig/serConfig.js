require('dotenv').config(); 
const mysql = require('mysql2/promise');

const poolConnection = mysql.createPool({
host: process.env.DB_HOST, 
login: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
waitForConnections: true, 
connectionLimit: 10,
queueLimit: 0, 
});

async function testConnection() {
    try {
        const connection = await pool.getConnection(); 
        console.log('Conectado ao banco de dados MySQL!');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
        process.exit(1); 
    }
}

testConnection();
module.exports = poolConnection;
