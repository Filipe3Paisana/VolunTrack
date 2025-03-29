import React, { useState } from 'react';
import './Perfil.css';

function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: 'João Silva',
        email: 'joao.silva@email.com',
        horário: 'manhã',
        cidade: 'lisboa',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveChanges = () => {
        setIsEditing(false);
        console.log('Dados salvos:', userData);
    };

    return (
        <div className="perfil-container">
            <h2>Perfil do Usuário</h2>
            <div className="perfil-image">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Foto de Perfil"
                    className="perfil-img"
                />
            </div>
            <div className="perfil-field">
                <label htmlFor="username">Nome:</label>
                {isEditing ? (
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                ) : (
                    <p id="username" className="field-value">{userData.username}</p>
                )}
            </div>

            <div className="perfil-field">
                <label htmlFor="email">E-mail:</label>
                {isEditing ? (
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                ) : (
                    <p id="email" className="field-value">{userData.email}</p>
                )}
            </div>

            <div className="perfil-field">
                <label htmlFor="telefone">Telefone:</label>
                {isEditing ? (
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={userData.telefone}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                ) : (
                    <p id="telefone" className="field-value">{userData.telefone}</p>
                )}
            </div>

            <div className="perfil-field">
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                {isEditing ? (
                    <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={userData.dataNascimento || ''}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                ) : (
                    <p id="dataNascimento" className="field-value">
                        {userData.dataNascimento || 'Não especificado'}
                    </p>
                )}
            </div>

            <div className="perfil-field">
                <label htmlFor="tipoVoluntario">Tipo de Voluntário:</label>
                {isEditing ? (
                    <select
                        id="tipoVoluntario"
                        name="tipoVoluntario"
                        value={userData.tipoVoluntario || ''}
                        onChange={handleInputChange}
                        className="input-field"
                    >
                        <option value="educação">Educação</option>
                        <option value="saúde">Saúde</option>
                        <option value="meioAmbiente">Meio Ambiente</option>
                        <option value="outros">Outros</option>
                    </select>
                ) : (
                    <p id="tipoVoluntario" className="field-value">
                        {userData.tipoVoluntario || 'Não especificado'}
                    </p>
                )}
            </div>

            <div className="perfil-field">
                <label htmlFor="horário">Horário</label>
                {isEditing ? (
                    <select
                        id="horário"
                        name="horário"
                        value={userData.horário}
                        onChange={handleInputChange}
                        className="input-field"
                    >
                        <option value="manhã">Manhã</option>
                        <option value="tarde">Tarde</option>
                        <option value="noite">Noite</option>
                    </select>
                ) : (
                    <p id="horário" className="field-value">{userData.horário}</p>
                )}
            </div>

            <div className="perfil-field">
                <label htmlFor="cidade">Cidade:</label>
                {isEditing ? (
                    <select
                        id="cidade"
                        name="cidade"
                        value={userData.cidade}
                        onChange={handleInputChange}
                        className="input-field"
                    >
                        <option value="lisboa">Lisboa</option>
                        <option value="alentejo">Alentejo</option>
                        <option value="algarve">Algarve</option>
                    </select>
                ) : (
                    <p id="cidade" className="field-value">{userData.cidade}</p>
                )}
            </div>

            <button
                onClick={isEditing ? saveChanges : toggleEdit}
                className={`action-button ${isEditing ? 'save' : 'edit'}`}
            >
                {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
            </button>
        </div>
    );
}

export default Perfil;
