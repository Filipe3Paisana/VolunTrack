-- Criação do esquema da base de dados VolunTrack

CREATE TABLE Utilizadores
(
    ID_Utilizador   UUID PRIMARY KEY,
    Nome            TEXT NOT NULL,
    Email           TEXT UNIQUE NOT NULL,
    Telefone        TEXT,
    Endereco        TEXT,
    Data_Nascimento DATE,
    Tipo_Utilizador TEXT CHECK (Tipo_Utilizador IN ('Administrador', 'Coordenador', 'Voluntario')),
    Data_Entrada    DATE DEFAULT CURRENT_DATE,
    Ativo           BOOLEAN DEFAULT TRUE
);

CREATE TABLE Administradores
(
    ID_Administrador UUID PRIMARY KEY REFERENCES Utilizadores (ID_Utilizador),
    Nivel_Acesso     TEXT NOT NULL
);

CREATE TABLE Coordenadores
(
    ID_Coordenador   UUID PRIMARY KEY REFERENCES Utilizadores (ID_Utilizador),
    Departamento     TEXT,
    ID_Administrador UUID REFERENCES Administradores (ID_Administrador)
);

CREATE TABLE Voluntarios
(
    ID_Voluntario   UUID PRIMARY KEY REFERENCES Utilizadores (ID_Utilizador),
    Disponibilidade TEXT,
    Competencias    TEXT,
    Areas_Interesse TEXT,
    ID_Coordenador  UUID REFERENCES Coordenadores (ID_Coordenador)
);

CREATE TABLE Projetos
(
    ID_Projeto     UUID PRIMARY KEY,
    Nome_Projeto   TEXT NOT NULL,
    Descricao      TEXT,
    Data_Inicio    DATE,
    Data_Fim       DATE,
    ID_Coordenador UUID REFERENCES Coordenadores (ID_Coordenador)
);

CREATE TABLE Turnos
(
    ID_Turno         UUID PRIMARY KEY,
    ID_Projeto       UUID REFERENCES Projetos (ID_Projeto) ON DELETE CASCADE,
    Data_Hora_Inicio TIMESTAMP NOT NULL,
    Data_Hora_Fim    TIMESTAMP NOT NULL,
    Localizacao      TEXT,
    Numero_Vagas     INTEGER
);

CREATE TABLE Participacoes
(
    ID_Participacao  UUID PRIMARY KEY,
    ID_Turno         UUID REFERENCES Turnos (ID_Turno) ON DELETE CASCADE,
    ID_Voluntario    UUID REFERENCES Voluntarios (ID_Voluntario) ON DELETE CASCADE,
    Status           TEXT CHECK (Status IN ('confirmado', 'pendente', 'cancelado')) DEFAULT 'pendente',
    Horas_Realizadas NUMERIC(5, 2)
);

CREATE TABLE Comunicacoes
(
    ID_Comunicacao UUID PRIMARY KEY,
    ID_Utilizador  UUID REFERENCES Utilizadores (ID_Utilizador) ON DELETE CASCADE,
    Tipo           TEXT CHECK (Tipo IN ('email', 'sms')),
    Assunto        TEXT,
    Mensagem       TEXT,
    Data_Envio     TIMESTAMP                                                       DEFAULT CURRENT_TIMESTAMP,
    Status_Envio   TEXT CHECK (Status_Envio IN ('enviado', 'pendente', 'falhado')) DEFAULT 'pendente'
);