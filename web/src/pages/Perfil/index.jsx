import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Importando o AuthContext
import './Perfil.css';

function Perfil() {
    const { user } = useContext(AuthContext); // Pegando os dados do usuário do contexto

    // Verificando se o user foi carregado
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img
                                            src={user.avatar || "https://bootdey.com/img/Content/avatar/avatar7.png"} // Usar a imagem do usuário
                                            alt="User Avatar"
                                        />
                                    </div>
                                    <h5 className="user-name">{user.nome}</h5>
                                    <h6 className="user-email">{user.email}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mb-2 text-primary">Detalhes Pessoais</h6>
                                </div>

                                {/* Nome */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text" className="form-control" value={user.nome} disabled />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" value={user.email} disabled />
                                    </div>
                                </div>

                                {/* Telefone */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="telefone">Telefone</label>
                                        <input type="text" className="form-control" value={user.telefone || 'Não disponível'} disabled />
                                    </div>
                                </div>

                                {/* Data de Nascimento */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="data_nascimento">Data de Nascimento</label>
                                        <input type="text" className="form-control" value={user.data_nascimento || 'Não disponível'} disabled />
                                    </div>
                                </div>

                                {/* Categoria */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="categoria">Categoria</label>
                                        <input type="text" className="form-control" value={user.categoria || 'Não disponível'} disabled />
                                    </div>
                                </div>

                                {/* Disponibilidade */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="disponibilidade">Disponibilidade</label>
                                        <input type="text" className="form-control" value={user.disponibilidade || 'Não disponível'} disabled />
                                    </div>
                                </div>

                                {/* Competências */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="competencias">Competências</label>
                                        <input type="text" className="form-control" value={user.competencias || 'Não disponível'} disabled />
                                    </div>
                                </div>

                                {/* Localidade */}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="localidade">Localidade</label>
                                        <input type="text" className="form-control" value={user.localidade || 'Não disponível'} disabled />
                                    </div>
                                </div>
                            </div>

                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right" style={{ marginTop: '20px' }}>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            style={{ backgroundColor: 'hsl(0, 90%, 50%)', color: 'white' }}
                                            onClick={() => window.history.back()} // Botão para voltar
                                        >
                                            Voltar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
