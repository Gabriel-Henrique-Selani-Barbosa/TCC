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
      actual_schema.query("CREATE TABLE tb_client (client_id INT AUTO_INCREMENT PRIMARY KEY, cpf_cnpj VARCHAR(50) NOT NULL, nome VARCHAR(50), endereco VARCHAR(50), num INT, cidade VARCHAR (50), estado VARCHAR(50))")
      actual_schema.query("CREATE TABLE tb_fornecedor (id_fornecedor INT AUTO_INCREMENT PRIMARY KEY, cpf_cnpj VARCHAR(50) NOT NULL, nome VARCHAR(50), produto VARCHAR(50))")
      actual_schema.query(`CREATE TABLE tb_equip (equip_id INT AUTO_INCREMENT PRIMARY KEY, CONSTRAINT id_fornecedor FOREIGN KEY(equip_id) REFERENCES ${nome_empresa}.tb_fornecedor (id_fornecedor), categoria VARCHAR(50) NOT NULL, marca VARCHAR(50), modelo VARCHAR(50), preco INT)`)
      actual_schema.query("CREATE TABLE tb_pedido (pedido_id INT AUTO_INCREMENT PRIMARY KEY, servico VARCHAR(50), valor INT, data_pedido DATE, observação VARCHAR (50))")
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

app.get("/get-pedidos", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("SELECT * FROM tb_pedido", (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send(result)
    }
  });
});

app.post("/delete-pedidos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const pedido_id = req.body.pedido_id
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("DELETE FROM tb_pedido WHERE pedido_id = ?", [pedido_id], (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send("Cliente fornecedor com sucesso")
    }
  })
})

app.post("/registrar-pedidos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const servico = req.body.servico;
  const valor = req.body.valor;
  const data_pedido = req.body.datapedido;
  const observacao = req.body.observacao;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("INSERT INTO tb_pedido (servico, valor, data_pedido, observação) VALUE (?, ?, ?, ?)", [servico, valor, data_pedido, observacao])
})

app.get("/get-equipamentos", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("SELECT * FROM tb_equip", (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send(result)
    }
  });
});

app.post("/delete-equipamentos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const id_equip = req.body.equip_id
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("DELETE FROM tb_equip WHERE equip_id = ?", [id_equip], (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send("Cliente fornecedor com sucesso")
    }
  })
})

app.post("/registrar-equipamentos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const categoria = req.body.categoria;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const preco = req.body.preco;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("INSERT INTO tb_equip (categoria, marca, modelo, preco) VALUE (?, ?, ?, ?)", [categoria, marca, modelo, preco])
})

app.get("/get-fornecedores", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("SELECT * FROM tb_fornecedor", (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send(result)
    }
  });
});

app.post("/delete-fornecedores", (req, res) => {
  const nome_empresa = req.body.storeName;
  const id_fornecedor = req.body.cliente_id
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("DELETE FROM tb_fornecedor WHERE id_fornecedor = ?", [id_fornecedor], (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send("Cliente fornecedor com sucesso")
    }
  })
})

app.post("/registrar-fornecedores", (req, res) => {
  const nome_empresa = req.body.storeName;
  const nome = req.body.nome;
  const cnpjcpf = req.body.cnpjcpf;
  const produto = req.body.produto;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("INSERT INTO tb_fornecedor (cpf_cnpj, nome, produto) VALUE (?, ?, ?)", [cnpjcpf, nome, produto])
})

app.get("/get-clientes", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("SELECT * FROM tb_client", (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send(result)
    }
  });
});

app.post("/delete-clientes", (req, res) => {
  const nome_empresa = req.body.storeName;
  const cliente_id = req.body.cliente_id
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("DELETE FROM tb_client WHERE client_id = ?", [cliente_id], (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result) {
      res.send("Cliente deletado com sucesso")
    }
  })
})

app.post("/registrar-cliente", (req, res) => {
  const nome_empresa = req.body.storeName;
  const nome = req.body.nome;
  const cnpjcpf = req.body.cnpjcpf;
  const estado = req.body.estado;
  const cidade = req.body.cidade;
  const endereco = req.body.endereco;
  const numero = req.body.numero;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1574857",
    database: `${nome_empresa}`,
  });
  db.query("INSERT INTO tb_client (cpf_cnpj, nome, endereco, num, cidade, estado) VALUE (?, ?, ?, ?, ?, ?)", [cnpjcpf, nome, endereco, numero, cidade, estado])
})

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
