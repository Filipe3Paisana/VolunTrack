import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn,
    MDBTextArea,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const CreateProjectPage = () => {
    const [formData, setFormData] = useState({
        nomeProjeto: '',
        descricao: '',
        dataInicio: '',
        dataFim: '',
        localidade: '',
        categoria: '',
        numVoluntarios: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Projeto a criar:", formData);
        // Aqui vais fazer POST para o backend (ex: fetch/axios)
    };

    return (
        <MDBContainer className="py-5">
            <h2 className="mb-4 text-center">Criar Novo Projeto</h2>
            <MDBCard>
                <MDBCardBody>
                    <form onSubmit={handleSubmit}>
                        <MDBInput
                            className="mb-4"
                            label="Nome do Projeto"
                            name="nomeProjeto"
                            type="text"
                            value={formData.nomeProjeto}
                            onChange={handleChange}
                        />

                        <MDBTextArea
                            className="mb-4"
                            label="Descrição"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />

                        <MDBRow className="mb-4">
                            <MDBCol>
                                <MDBInput
                                    label="Data de Início"
                                    name="dataInicio"
                                    type="date"
                                    value={formData.dataInicio}
                                    onChange={handleChange}
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    label="Data de Fim"
                                    name="dataFim"
                                    type="date"
                                    value={formData.dataFim}
                                    onChange={handleChange}
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-4">
                            <MDBCol>
                                <select
                                    className="form-select"
                                    name="localidade"
                                    value={formData.localidade}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleciona a Localidade</option>
                                    {["Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Açores", "Madeira"].map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </MDBCol>
                            <MDBCol>
                                <select
                                    className="form-select"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                >
                                    <option value="">Categoria</option>
                                    {["Saúde", "Socorro e Emergência", "Formação/Ensino", "Apoio Social", "Âmbito Local"].map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </MDBCol>
                        </MDBRow>

                        <MDBInput
                            className="mb-4"
                            label="Nº de Voluntários Necessários"
                            name="numVoluntarios"
                            type="number"
                            value={formData.numVoluntarios}
                            onChange={handleChange}
                        />

                        <MDBBtn type="submit" className="w-100" style={{ backgroundColor: 'hsl(0, 90%, 50%)', color: 'white' }}>
                            Criar Projeto
                        </MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default CreateProjectPage;
