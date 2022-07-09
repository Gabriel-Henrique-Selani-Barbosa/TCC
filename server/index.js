const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1574857",
});


app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const email = req.body.email;
  const password = req.body.password;

  db.connect(function(err) {
    db.query(`CREATE DATABASE IF NOT EXISTS ${nome_empresa}`, function (err, result) {
      if (err) {
        res.send(err);
      }
      const actual_schema = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1574857",
        database: `${nome_empresa}`
      });
      actual_schema.query("CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL, user_nivel VARCHAR(6) NOT NULL)", function (err, result){
        actual_schema.query("SELECT * FROM users WHERE user_nivel = ?", ["admin"], function (err, result){
          if (err) {
            res.send(err);
          }
          if (result.length == 0) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
              actual_schema.query("INSERT INTO users (email, password, user_nivel) VALUE (?, ?, ?)",
              [email, hash, "admin"],
              )
            })
          }else {
            res.send("Ja existe um administrador cadastrado para essa empresa, se deseja criar um novo logue com a conta de administrador e no painel crie um novo usuario e de a ele o nivel de administrador")
          }
        })
      })
    });
  })  
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
