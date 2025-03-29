const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

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
    client.release(); // Libera o cliente após o teste
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err.message);
  });

app.post("/register", async (req, res) => {
  const {
    nome,
    email,
    telefone,
    endereco,
    data_nascimento,
    tipo_utilizador,
    password,
  } = req.body;

  if (!nome || !email || !tipo_utilizador || !password) {
    return res.status(400).json({
      message: "Nome, Email, Tipo de Utilizador e Password são obrigatórios!",
    });
  }

  try {
    const id_utilizador = uuidv4(); // Gerando um ID único para o utilizador
    const hashedPassword = await bcrypt.hash(password, 10); // Criptografando a senha

    await pool.query(
      "INSERT INTO Utilizadores (ID_Utilizador, Nome, Email, Telefone, Endereco, Data_Nascimento, Tipo_Utilizador, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        id_utilizador,
        nome,
        email,
        telefone,
        endereco,
        data_nascimento,
        tipo_utilizador,
        hashedPassword,
      ]
    );

    res
      .status(201)
      .json({ message: "Utilizador registado com sucesso!", id_utilizador });
  } catch (error) {
    console.error("Erro ao registrar utilizador:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota de login (autenticando com Nome e Password)
app.post("/login", async (req, res) => {
  const { nome, password } = req.body;

  if (!nome || !password) {
    return res
      .status(400)
      .json({ message: "Nome e Password são obrigatórios!" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM Utilizadores WHERE Nome = $1",
      [nome]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Nome ou senha incorretos" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password); // Comparando senha digitada com a salva

    if (!passwordMatch) {
      return res.status(401).json({ message: "Nome ou senha incorretos" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
