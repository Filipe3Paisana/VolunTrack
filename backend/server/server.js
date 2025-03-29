const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8080;
const SECRET_KEY = "chave_secreta_super_segura"; // Troca isso por algo mais seguro

app.use(cors());
app.use(bodyParser.json());

const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

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

/**
 * ROTA DE REGISTRO DE UTILIZADOR
 */
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
    const hashedPassword = await bcrypt.hash(password, 10); // Corrigido: Agora armazena a versão encriptada da senha.

    // Inserir o utilizador na tabela Utilizadores
    await pool.query(
      "INSERT INTO Utilizadores (ID_Utilizador, Nome, Email, Telefone, Data_Nascimento, Tipo_Utilizador, Password, Localidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [id_utilizador, nome, email, telefone, data_nascimento, tipo_utilizador, hashedPassword, localidade]
    );

    // Inserir o voluntário na tabela Voluntarios
    await pool.query(
      "INSERT INTO Voluntarios (ID_Voluntario, Disponibilidade, Competencias, Categoria) VALUES ($1, $2, $3, $4)",
      [id_utilizador, disponibilidade, competencias, categoria]
    );

    res.status(HttpStatus.OK).json({
      message: "Utilizador registrado com sucesso",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Erro ao registrar o utilizador",
    });
  }
});

/**
 * ROTA DE LOGIN
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = await pool.query("SELECT * FROM Utilizadores WHERE Email = $1", [email]);

    if (userQuery.rows.length === 0) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Credenciais inválidas" });
    }

    const user = userQuery.rows[0];

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Credenciais inválidas" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id_utilizador, tipo_utilizador: user.tipo_utilizador }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.json({ token, user: { id: user.id_utilizador, nome: user.nome, email: user.email, tipo: user.tipo_utilizador } });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro no servidor" });
  }
});

/**
 * Middleware para verificar autenticação JWT
 */
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Acesso negado! Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Adiciona os dados do utilizador ao request
    next();
  } catch (error) {
    return res.status(HttpStatus.NOT_FOUND).json({ message: "Token inválido ou expirado." });
  }
};

/**
 * ROTA PARA OBTER PERFIL DO UTILIZADOR LOGADO
 */
app.get("/profile", verificarToken, async (req, res) => {
  try {
    const userQuery = await pool.query("SELECT * FROM Utilizadores WHERE ID_Utilizador = $1", [req.user.id]);

    if (userQuery.rows.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Utilizador não encontrado" });
    }

    const user = userQuery.rows[0];

    res.json({
      id: user.id_utilizador,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      data_nascimento: user.data_nascimento,
      tipo_utilizador: user.tipo_utilizador,
      localidade: user.localidade,
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar perfil" });
  }
});

/**
 * INICIANDO O SERVIDOR
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
