-- Criação do esquema da base de dados VolunTrack

CREATE TABLE IF NOT EXISTS Utilizadores
(
    ID_Utilizador   UUID PRIMARY KEY,
    Nome            TEXT NOT NULL,
    Email           TEXT UNIQUE NOT NULL,
    Telefone        TEXT,
    Data_Nascimento DATE,
    Tipo_Utilizador TEXT CHECK (Tipo_Utilizador IN ('Administrador', 'Coordenador', 'Voluntario')),
    Data_Entrada    DATE DEFAULT CURRENT_DATE,
    Ativo           BOOLEAN DEFAULT TRUE,
    Localidade      TEXT,
    Password        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Administradores
(
    ID_Administrador UUID PRIMARY KEY REFERENCES Utilizadores (ID_Utilizador),
    Nivel_Acesso     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Coordenadores
(
    ID_Coordenador   UUID PRIMARY KEY REFERENCES Utilizadores (ID_Utilizador),
    Departamento     TEXT,
    ID_Administrador UUID REFERENCES Administradores (ID_Administrador)
);

CREATE TABLE IF NOT EXISTS Voluntarios
(
    ID_Voluntario   UUID PRIMARY KEY REFERENCES Utilizadores (ID_Utilizador),
    Disponibilidade TEXT CHECK (Disponibilidade IN ('Manhã', 'Tarde', 'Noite')) DEFAULT 'pendente',
    Categoria       TEXT,
    Competencias    TEXT,
    Areas_Interesse TEXT,
    ID_Coordenador  UUID REFERENCES Coordenadores (ID_Coordenador)
);

CREATE TABLE IF NOT EXISTS Projetos
(
    ID_Projeto     UUID PRIMARY KEY,
    Nome_Projeto   TEXT NOT NULL,
    Descricao      TEXT,
    Data_Inicio    DATE,
    Data_Fim       DATE,
    ID_Coordenador UUID REFERENCES Coordenadores (ID_Coordenador)
);

CREATE TABLE IF NOT EXISTS Turnos
(
    ID_Turno         UUID PRIMARY KEY,
    ID_Projeto       UUID REFERENCES Projetos (ID_Projeto) ON DELETE CASCADE,
    Data_Hora_Inicio TIMESTAMP NOT NULL,
    Data_Hora_Fim    TIMESTAMP NOT NULL,
    Localizacao      TEXT,
    Numero_Vagas     INTEGER CHECK (Numero_Vagas > 0)
);

CREATE TABLE IF NOT EXISTS Participacoes
(
    ID_Participacao  UUID PRIMARY KEY,
    ID_Turno         UUID REFERENCES Turnos (ID_Turno) ON DELETE CASCADE,
    ID_Voluntario    UUID REFERENCES Voluntarios (ID_Voluntario) ON DELETE CASCADE,
    Status           TEXT CHECK (Status IN ('confirmado', 'pendente', 'cancelado')) DEFAULT 'pendente',
    Horas_Realizadas NUMERIC(5, 2) CHECK (Horas_Realizadas >= 0)
);

CREATE TABLE IF NOT EXISTS Comunicacoes
(
    ID_Comunicacao UUID PRIMARY KEY,
    ID_Utilizador  UUID REFERENCES Utilizadores (ID_Utilizador) ON DELETE CASCADE,
    Tipo           TEXT CHECK (Tipo IN ('email', 'sms')),
    Assunto        TEXT NOT NULL,
    Mensagem       TEXT NOT NULL,
    Data_Envio     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status_Envio   TEXT CHECK (Status_Envio IN ('enviado', 'pendente', 'falhado')) DEFAULT 'pendente'
);
