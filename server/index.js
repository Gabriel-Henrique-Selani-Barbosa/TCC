const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const Client = require("pg").Client


app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const nome_empresa = req.body.storeName;
  const email = req.body.username;
  const password = req.body.password;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const createDatabase = async () => {
    try {
      await db.connect();
      await db.query(`CREATE SCHEMA ${nome_empresa}`);
      return true;
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
        await db.end();
    }
  }
  createDatabase().then((result) => {
    if (result) {
        console.log('Database created batata');
    }
  });

  const actual_schema = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const createSchema = async () => {
    try {
      await actual_schema.connect();
      await actual_schema.query(`CREATE TABLE ${nome_empresa}.usuarios (usuario_id SERIAL PRIMARY KEY, email VARCHAR(50) NOT NULL, senha VARCHAR(255) NOT NULL, user_nivel VARCHAR(6) NOT NULL)`);
      await actual_schema.query(`INSERT INTO ${nome_empresa}.usuarios (email, senha, user_nivel) VALUES($1, $2, $3)`, [email, password, "admin"]);
      await actual_schema.query(`CREATE TABLE ${nome_empresa}.tb_client (client_id SERIAL PRIMARY KEY, cpf_cnpj VARCHAR(50) NOT NULL, nome VARCHAR(50), endereco VARCHAR(50), num VARCHAR(50), cidade VARCHAR (50), estado VARCHAR(50))`);
      await actual_schema.query(`CREATE TABLE ${nome_empresa}.tb_fornecedor (id_fornecedor SERIAL PRIMARY KEY, cpf_cnpj VARCHAR(50) NOT NULL, nome VARCHAR(50), produto VARCHAR(50))`);
      await actual_schema.query(`CREATE TABLE ${nome_empresa}.tb_equip (equip_id SERIAL PRIMARY KEY, fornecedor VARCHAR(100), categoria VARCHAR(50) NOT NULL, marca VARCHAR(50), modelo VARCHAR(50), preco VARCHAR(50))`);
      await actual_schema.query(`CREATE TABLE ${nome_empresa}.tb_material (material_id SERIAL PRIMARY KEY, fornecedor VARCHAR(100), categoria VARCHAR(100) NOT NULL, nome VARCHAR(100), preco VARCHAR(50))`);
      await actual_schema.query(`CREATE TABLE ${nome_empresa}.tb_pedido (pedido_id SERIAL PRIMARY KEY, cpf_cnpj VARCHAR(50), material VARCHAR(100), quantidade VARCHAR(100), equipamento VARCHAR(100), quantidadeEquipamento VARCHAR(100))`);
      return true;
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await actual_schema.end();
    }
  }
  createSchema().then((result) => {
    if (result) {
        console.log('bora');
    }
  });
});

app.post("/login", (req, res) => {
  const nome_empresa = req.body.storeName;
  const email = req.body.username;
  const password = req.body.password;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const login = async () => {
    try {
      await db.connect();
      const result = await db.query(`SELECT * FROM ${nome_empresa}.usuarios WHERE email in ($1)`, [email])
        if (password == result.rows[0].senha) {
          res.send({ msg: "Usuário logado" });
        }else {
          res.send({ msg: "Email ou senha incorretos" });
        }
      return true
    }catch (error) {
      console.error(error.stack);
      return false;
    }finally {
      await db.end()
    }
  }
  login().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
});


app.post("/registar-maodeobra", (req, res) => {
  const nome_empresa = req.body.nome_empresa;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const cliente = req.body.nome_cliente;
  const condominio = req.body.condominio;
  const terreno = req.body.terreno;
  const data = req.body.data;
  const medicao = req.body.medicao;
  const servico = req.body.servico
  const total = req.body.total;
  const insertMaoObra = async () => {
    try {
      await db.connect();
      await db.query(`INSERT INTO ${nome_empresa}.tb_maodeobra (cliente, condominio, terreno, data, medicao, servico, total) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [cliente, condominio, terreno, data, medicao, servico, total]);
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insertMaoObra().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.get("/get-pedidos", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const getPedidos = async () => {
    try {
      await db.connect();
      const result = await db.query(`SELECT * FROM ${nome_empresa}.tb_pedido ORDER BY pedido_id ASC`);
      if (result) {
        res.send(result);
      }else {
        res.send("no results found");
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  getPedidos().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
});

app.post("/delete-pedidos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const pedido_id = req.body.pedido_id
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const deletePedidos = async () => {
    try {
      await db.connect();
      await db.query(`DELETE FROM ${nome_empresa}.tb_pedido WHERE pedido_id in ($1})`, [pedido_id])
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  deletePedidos().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/register-mass-pedidos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const massProviders = req.body.equipamentos;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insetInMass = async () => {
    try {
      await db.connect();
      for (i = 0; i < massProviders.length; i++) {
        const cpfcnpj = massProviders[i][0];
        const material = massProviders[i][1];
        const quantidade = massProviders[i][2];
        const equipamento = massProviders[i][3];
        const quantidadeequipamento = massProviders[i][4];
        const result = await db.query(`INSERT INTO ${nome_empresa}.tb_pedido (cpf_cnpj, material, quantidade, equipamento, quantidadeequipamento) VALUES ($1, $2, $3, $4, $5)`, [cpfcnpj, material, quantidade, equipamento, quantidadeequipamento])
        if (i == massProviders.length - 1) {
          if (result) {
            res.send('registrado');
          }
        }
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insetInMass().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/registrar-pedidos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const cpfcnpj = req.body.cpfcnpj;
  const material = req.body.material;
  const quantidade = req.body.quantidade;
  const equipamento = req.body.equipamento;
  const quantidadeequipamento = req.body.quantidadeequipamento;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insertPedidos = async () => {
    try {
      await db.connect();
      const result = await db.query(`INSERT INTO ${nome_empresa}.tb_pedido (cpf_cnpj, material, quantidade, equipamento, quantidadeequipamento) VALUES ($1, $2, $3, $4, $5)`, [cpfcnpj, material, quantidade, equipamento, quantidadeequipamento])
      if (result) {
        res.send("registrado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insertPedidos().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.get("/get-materiais", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const getMateriais = async () => {
    try {
      await db.connect();
      const result = await db.query(`SELECT * FROM ${nome_empresa}.tb_material ORDER BY material_id ASC`);
      if (result) {
        res.send(result);
      }else {
        res.send("no results found");
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  getMateriais().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
});

app.post("/update-materiais", (req, res) => {
  const nome_empresa = req.body.storeName;
  const fornecedor = req.body.fornecedor;
  const id_material = req.body.id;
  const categoria = req.body.categoria;
  const nome = req.body.nome;
  const preco = req.body.preco;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const updateMaterial = async () => {
    try {
      await db.connect();
      const result = await db.query(`UPDATE ${nome_empresa}.tb_material SET "fornecedor" = $1, "categoria" = $2, "nome" = $3, "preco" = $4 WHERE material_id in ($5)`, [fornecedor, categoria, nome, preco, id_material]);
      if (result) {
        res.send("atualizado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  updateMaterial().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.get("/get-equipamentos", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const getPedidos = async () => {
    try {
      await db.connect();
      const result = await db.query(`SELECT * FROM ${nome_empresa}.tb_equip ORDER BY equip_id ASC`);
      if (result) {
        res.send(result);
      }else {
        res.send("no results found");
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  getPedidos().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
});

app.post("/registrar-materiais", (req, res) => {
  const nome_empresa = req.body.storeName;
  const fornecedor = req.body.fornecedor
  const categoria = req.body.categoria
  const nome = req.body.nome
  const preco = req.body.preco
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const registerEquip = async () => {
    try {
      await db.connect();
      const result = await db.query(`INSERT INTO ${nome_empresa}.tb_material (fornecedor, categoria, nome, preco) VALUES ($1, $2, $3, $4)`, [fornecedor, categoria, nome, preco])
      if (result) {
        res.send('registrado')
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  registerEquip().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/register-mass-materiais", (req, res) => {
  const nome_empresa = req.body.storeName;
  const massProviders = req.body.equipamentos;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insetInMass = async () => {
    try {
      await db.connect();
      for (i = 0; i < massProviders.length; i++) {
        const fornecedor = massProviders[i][0];
        const categoria = massProviders[i][1];
        const nome = massProviders[i][2];
        const preco = massProviders[i][3];
        const result = await db.query(`INSERT INTO ${nome_empresa}.tb_material (material_id, categoria, nome, preco) VALUES ($1, $2, $3, $4)`, [fornecedor, categoria, nome, preco]);
        if (i == massProviders.length - 1) {
          if (result) {
            res.send('registrado');
          }
        }
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insetInMass().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/update-equipamentos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const id_equip = req.body.id
  const equipamentoCategoria = req.body.categoria
  const equipamentoMarca = req.body.marca
  const equipamentoModelo = req.body.modelo
  const equipamentoPreco = req.body.preco
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const updateEquip = async () => {
    try {
      await db.connect();
      const result = await db.query(`UPDATE ${nome_empresa}.tb_equip SET "categoria" = $1, "marca" = $2, "modelo" = $3, "preco" = $4 WHERE equip_id in ($5)`, [equipamentoCategoria, equipamentoMarca, equipamentoModelo, equipamentoPreco, id_equip]);
      if (result) {
        res.send("atualizado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  updateEquip().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/delete-equipamentos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const equip_id = req.body.equip_id
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const deleteEquip = async () => {
    try {
      await db.connect();
      await db.query(`DELETE FROM ${nome_empresa}.tb_equip WHERE equip_id in ($1})`, [equip_id])
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  deleteEquip().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/registrar-equipamentos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const categoria = req.body.categoria;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const preco = req.body.preco;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const registerEquip = async () => {
    try {
      await db.connect();
      const result = await db.query(`INSERT INTO ${nome_empresa}.tb_equip (categoria, marca, modelo, preco) VALUES ($1, $2, $3, $4)`, [categoria, marca, modelo, preco])
      if (result) {
        res.send('registrado')
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  registerEquip().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/register-mass-equipamentos", (req, res) => {
  const nome_empresa = req.body.storeName;
  const massProviders = req.body.equipamentos;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insetInMass = async () => {
    try {
      await db.connect();
      for (i = 0; i < massProviders.length; i++) {
        const fornecedor = massProviders[i][0]
        const categoria = massProviders[i][1];
        const marca = massProviders[i][2];
        const modelo = massProviders[i][3];
        const preco = massProviders[i][4];
        const result = await db.query(`INSERT INTO ${nome_empresa}.tb_equip (fornecedor, categoria, marca, modelo, preco) VALUES ($1, $2, $3, $4, $5)`, [fornecedor, categoria, marca, modelo, preco]);
        if (i == massProviders.length - 1) {
          if (result) {
            res.send('registrado');
          }
        }
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insetInMass().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.get("/get-fornecedores", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const getFornecedores = async () => {
    try {
      await db.connect();
      const result = await db.query(`SELECT * FROM ${nome_empresa}.tb_fornecedor ORDER BY id_fornecedor ASC`)
      if (result) {
        res.send(result);
      }else {
        res.send("no results found");
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  getFornecedores().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
});

app.post("/update-fornecedores", (req, res) => {
  const nome_empresa = req.body.storeName;
  const id_fornecedor = req.body.id;
  const nome = req.body.nome;
  const cnpjcpf = req.body.cnpjcpf;
  const produto = req.body.produto;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const updateEquip = async () => {
    try {
      await db.connect();
      const result = await db.query(`UPDATE ${nome_empresa}.tb_fornecedor SET "cpf_cnpj" = $1, "nome" = $2, "produto" = $3 WHERE id_fornecedor in ($4)`, [cnpjcpf, nome, produto, id_fornecedor]);
      if(result) {
        res.send("editado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  updateEquip().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/delete-fornecedores", (req, res) => {
  const nome_empresa = req.body.storeName;
  const id_fornecedor = req.body.id_fornecedor;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  })
  const deleteFornecedor = async () => {
    try {
      await db.connect();
      const result = await db.query(`DELETE FROM ${nome_empresa}.tb_fornecedor WHERE id_fornecedor = $1`, [id_fornecedor])
      if (result) {
        console.log('deletado')
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  deleteFornecedor().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/registrar-fornecedores", (req, res) => {
  const nome_empresa = req.body.storeName;
  const nome = req.body.nome;
  const cnpjcpf = req.body.cnpjcpf;
  const produto = req.body.produto;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insertFornecedor = async () => {
    try {
      await db.connect();
      const result = await db.query(`INSERT INTO ${nome_empresa}.tb_fornecedor (cpf_cnpj, nome, produto) VALUES ($1, $2, $3)`, [cnpjcpf, nome, produto])
      if (result) {
        res.send("adicionado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insertFornecedor().then((result) => {
    if (result) {
      res.send("adicionado")
    }
  })
})

app.post("/register-mass-fornecedores", (req, res) => {
  const nome_empresa = req.body.storeName;
  const massProviders = req.body.providers;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insetInMass = async () => {
    try {
      await db.connect();
      for (i = 0; i < massProviders.length; i++) {
        const nome = massProviders[i][0];
        const cnpjcpf = massProviders[i][1];
        const produto = massProviders[i][2];
        const result = await db.query(`INSERT INTO ${nome_empresa}.tb_fornecedor (cpf_cnpj, nome, produto) VALUES ($1, $2, $3)`, [cnpjcpf, nome, produto]);
        if (i == massProviders.length - 1) {
          if (result) {
            res.send('registrado');
          }
        }
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insetInMass().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.get("/get-clientes", (req, res) => {
  const nome_empresa = req.query.storeName;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const getClientes = async () => {
    try {
      await db.connect();
      const result = await db.query(`SELECT * FROM ${nome_empresa}.tb_client ORDER BY client_id ASC`)
      if (result) {
        res.send(result);
      }else {
        res.send("no results found");
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  getClientes().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
});

app.post("/update-clientes", (req, res) => {
  const nome_empresa = req.body.storeName;
  const id_client = req.body.id;
  const nome = req.body.nome;
  const cnpjcpf = req.body.cnpjcpf;
  const estado = req.body.estado;
  const cidade = req.body.cidade;
  const endereco = req.body.endereco;
  const numero = req.body.numero;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });

  const updateEquip = async () => {
    try {
      await db.connect();
      const result = await db.query(`UPDATE ${nome_empresa}.tb_client SET "cpf_cnpj" = $1, "nome" = $2, "endereco" = $3, "num" = $4, "cidade" = $5, "estado" = $6 WHERE client_id in ($7)`, [cnpjcpf, nome, endereco, numero, cidade, estado, id_client]);
      if(result) {
        res.send("editado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  updateEquip().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/delete-clientes", (req, res) => {
  const nome_empresa = req.body.storeName;
  const cliente_id = req.body.client_id;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const deleteCliente = async () => {
    try {
      await db.connect();
      const result = await db.query(`DELETE FROM ${nome_empresa}.tb_client WHERE client_id = $1`, [cliente_id])
      if(result) {
        res.send("deletado")
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  deleteCliente().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.post("/register-mass-clientes", (req, res) => {
  const nome_empresa = req.body.storeName;
  const massClients = req.body.clientes;
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insetInMass = async () => {
    try {
      await db.connect();
      for (i = 0; i < massClients.length; i++) {
        const nome = massClients[i][0];
        const cnpjcpf = massClients[i][1];
        const estado = massClients[i][2];
        const cidade = massClients[i][3];
        const endereco = massClients[i][4];
        const numero = massClients[i][5];
        const result = await db.query(`INSERT INTO ${nome_empresa}.tb_client (cpf_cnpj, nome, endereco, num, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6)`, [cnpjcpf, nome, endereco, numero, cidade, estado]);
        if (i == massClients.length - 1) {
          if (result) {
            res.send('registrado');
          }
        }
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insetInMass().then((result) => {
    if (result) {
      console.log('logado');
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
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1574857',
    port: 5432,
    database: "postgres",
  });
  const insertClient = async () => {
    try {
      await db.connect();
      const result = await db.query(`INSERT INTO ${nome_empresa}.tb_client (cpf_cnpj, nome, endereco, num, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6)`, [cnpjcpf, nome, endereco, numero, cidade, estado])
      if (result) {
        res.send('registrado')
      }
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await db.end();
    }
  }
  insertClient().then((result) => {
    if (result) {
      console.log('logado');
    }
  })
})

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
