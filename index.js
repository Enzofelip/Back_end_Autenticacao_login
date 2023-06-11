const express = require("express");
const app = express();
const cors = require("cors");
const poll = require("./db/config");

//Configurando recebimentos de dados
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Cors é usado para fazer a conexão com o react.js
app.use(cors());


//Enviando dados para o Mysql
app.post("/registro", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confipassword = req.body.confipassword;

    poll.query("SELECT * FROM number WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length == 0 ){
            const sql = "INSERT INTO number (name, email, password, confipassword) VALUES (?, ?, ?, ?)"
            poll.query(sql, [name, email, password, confipassword], (err, result) => {
                if(err){
                    res.send(err);
                }
                res.send({msg: "Cadastrado com sucesso"});
            })
        }else{
            res.send({msg: "Usuario já cadastrado"});
        }
    })    
    console.log(name, email, password, confipassword);
});

//Dados de login
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    poll.query("SELECT * FROM number WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            res.send({msg: "Login aceito"});
        }else{
            res.send({msg: "Usuario não encontrado"});
        }
    })

    console.log(email, password);
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


//datas