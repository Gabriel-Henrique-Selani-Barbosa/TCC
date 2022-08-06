const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;


app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const nome_empresa = req.body.storeName;
  const email = req.body.username;
  const password = req.body.password;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
  });
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
            res.send("Usuario cadastrado com sucesso")
          }else {
            res.send("Ja existe um administrador cadastrado para essa empresa, se deseja criar um novo logue com a conta de administrador e no painel crie um novo usuario e de a ele o nivel de administrador")
          }
        })
      })
    });
  })  
});

app.post("/login", (req, res) => {
  const nome_empresa = req.body.storeName;
  const email = req.body.username;
  const password = req.body.password;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
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

app.post("/registrar-equipamento", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  const cliente = req.body.nome_cliente;
  const condominio = req.body.condominio;
  const terreno = req.body.terreno;
  const metragem = req.body.metragem;
  const razao = req.body.razaosocial;
  const datade = req.body.datade;
  const para = req.body.para;
  const ndocumento = req.body.ndocumento;
  const valor = req.body.valor;
  const envioboleto = req.body.envioboleto;
  const centrodecusto = req.body.centrodecusto;
  const observacao = req.body.obersao;
  db.query("INSERT INTO equipamentos (cliente, condominio, terreno, metragem, razao, datade, para, numerodocumento, valor, envioboleto, centrodecusto, observacao) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [cliente, condominio, terreno, metragem, razao, datade, para, ndocumento, valor, envioboleto, centrodecusto, observacao],)
});

app.post("/registar-maodeobra", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  const cliente = req.body.nome_cliente;
  const condominio = req.body.condominio;
  const terreno = req.body.terreno;
  const data = req.body.data;
  const medicao = req.body.medicao;
  const servico = req.body.servico
  const total = req.body.total;
  db.query("INSERT INTO maodeobra (cliente, condominio, terreno, data, medicao, servico, total) VALUE (?, ?, ?, ?, ?, ?, ?)", [cliente, condominio, terreno, data, medicao, servico, total])
})

app.post("registrar-obra", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  const nomeobra = req.body.nomeobra
  const cliente = req.body.nome_cliente
  const situacao = req.body.situacao
  const categoria = req.body.categoria
  db.query("INSERT INTO obra (nomeobra, cliente, situacao, categoria) VALUE (?, ?, ?, ?)", [nomeobra, cliente, situacao, categoria])
})

app.post("registrar-fornecedor", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
})

app.post("registrar-cliente", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
})

app.post("registrar-fornecedor", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
})
app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
