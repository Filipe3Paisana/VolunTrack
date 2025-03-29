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

app.post("/register-coordenador", async (req, res) => {
  const { nome, email, telefone, data_nascimento, departamento, password, localidade } = req.body;

  try {
    const id_utilizador = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10); 

    await pool.query(
      "INSERT INTO Utilizadores (ID_Utilizador, Nome, Email, Telefone, Data_Nascimento, Tipo_Utilizador, Password, Localidade) VALUES ($1, $2, $3, $4, $5, 'Coordenador', $6, $7)",
      [id_utilizador, nome, email, telefone, data_nascimento, hashedPassword, localidade]
    );

    await pool.query(
      "INSERT INTO Coordenadores (ID_Coordenador, Departamento, ID_Administrador) VALUES ($1, $2, NULL)", // O ID_Administrador pode ser NULL ou você pode associá-lo a um administrador existente
      [id_utilizador, departamento]  // Usando o ID_Utilizador como ID_Coordenador
    );

    res.status(201).json({
      message: "Coordenador registrado com sucesso!",
      id_utilizador,
      nome,
      email,
      departamento,
    });
  } catch (error) {
    console.error("Erro ao registrar coordenador:", error);
    res.status(500).json({ message: "Erro ao registrar coordenador." });
  }
});

app.post("/projetos", verificarToken, async (req, res) => {
  const { nome, descricao, data_inicio, data_fim, id_coordenador } = req.body;

  // Verifica se o usuário tem permissão para criar um projeto
  if (req.user.tipo_utilizador !== "Coordenador" && req.user.tipo_utilizador !== "Administrador") {
    return res.status(403).json({ message: "Apenas Coordenadores e Administradores podem criar projetos." });
  }

  try {
    const id_projeto = uuidv4();

    await pool.query(
      "INSERT INTO Projetos (ID_Projeto, Nome_Projeto, Descricao, Data_Inicio, Data_Fim, ID_Coordenador) VALUES ($1, $2, $3, $4, $5, $6)",
      [id_projeto, nome, descricao, data_inicio, data_fim, id_coordenador]
    );

    // Buscar voluntários disponíveis
    const voluntariosQuery = await pool.query(
      "SELECT ID_Voluntario, Nome, Disponibilidade, Email FROM Voluntarios INNER JOIN Utilizadores ON Voluntarios.ID_Voluntario = Utilizadores.ID_Utilizador WHERE Utilizadores.Ativo = TRUE"
    );

    // Enviar a lista de voluntários para o coordenador que criou o projeto
    await pool.query(
      "INSERT INTO Comunicacoes (ID_Comunicacao, ID_Utilizador, Tipo, Assunto, Mensagem, Status_Envio) VALUES ($1, $2, 'email', $3, $4, 'pendente')",
      [uuidv4(), req.user.id, "Lista de Voluntários Disponíveis", JSON.stringify(voluntariosQuery.rows)]
    );

    res.status(201).json({ 
      message: "Projeto criado com sucesso!", 
      id_projeto, 
      voluntarios_disponiveis: voluntariosQuery.rows 
    });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    res.status(500).json({ message: "Erro ao criar projeto." });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
