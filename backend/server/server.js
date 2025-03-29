const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "test",
  host: "db",
  database: "test",
  password: "test",
  port: 5432,
});

pool
  .connect()
  .then((client) => {
    console.log("✅ Conexão bem-sucedida ao PostgreSQL!");
    client.release(); 
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err.message);
  });

  app.post("/register", async (req, res) => {
    const {
      nome,
      email,
      telefone,
      data_nascimento,
      tipo_utilizador = "Voluntario",
      password,
      disponibilidade,
      competencias,
      categoria,
      localidade,

    } = req.body;
  
    
  
    try {
      const id_utilizador = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Inserir o utilizador na tabela Utilizadores
      await pool.query(
        "INSERT INTO Utilizadores (ID_Utilizador, Nome, Email, Telefone, Data_Nascimento, Tipo_Utilizador, Password, Localidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [id_utilizador, nome, email, telefone, data_nascimento, tipo_utilizador, password, localidade]
      );
  
      // Inserir o voluntário na tabela Voluntarios
      await pool.query(
        "INSERT INTO Voluntarios (ID_Voluntario, Disponibilidade, Competencias, Categoria) VALUES ($1, $2, $3, $4)",
        [id_utilizador, disponibilidade, competencias, categoria]
      );
  
      res.status(201).json({
        message: "Utilizador registrado com sucesso ",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erro ao registrar o utilizador ",
      });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });