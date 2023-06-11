const mysql = require("mysql");

//Conexão com o banco de dados
const poll = mysql.createPool({
    connectionLimit:10,
    host: "localhost",
    user: "root",
    password: "",
    database: "dadosform",
});

module.exports = poll;