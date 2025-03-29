import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn
} from 'mdb-react-ui-kit';

// Simulação de dados (no futuro virão do backend)
const voluntariosMock = [
    {
        id: 1,
        nome: 'Ana Silva',
        email: 'ana@example.com',
        localidade: 'Lisboa',
        disponibilidade: 'Manhã',
        categoria: 'Saúde',
        competencias: ['Enfermeiro']
    },
    {
        id: 2,
        nome: 'João Costa',
        email: 'joao@example.com',
        localidade: 'Porto',
        disponibilidade: 'Tarde',
        categoria: 'Apoio Social',
        competencias: ['Voluntário']
    },
    {
        id: 3,
        nome: 'Rita Santos',
        email: 'rita@example.com',
        localidade: 'Lisboa',
        disponibilidade: 'Manhã',
        categoria: 'Saúde',
        competencias: ['Médico']
    }
];

const MatchingVolunteersPage = ({ projeto }) => {
    const [voluntariosFiltrados, setVoluntariosFiltrados] = useState([]);

    // Simulação: projeto passado por props
    const projetoExemplo = projeto || {
        localidade: 'Lisboa',
        disponibilidade: 'Manhã',
        categoria: 'Saúde'
    };

    useEffect(() => {
        const filtrados = voluntariosMock.filter((vol) => {
            return (
                vol.localidade === projetoExemplo.localidade &&
                vol.disponibilidade === projetoExemplo.disponibilidade &&
                vol.categoria === projetoExemplo.categoria
            );
        });
        setVoluntariosFiltrados(filtrados);
    }, [projetoExemplo]);

    return (
        <MDBContainer className="py-5">
            <h2 className="mb-4 text-center">Voluntários Compatíveis</h2>

            <MDBCard>
                <MDBCardBody>
                    {voluntariosFiltrados.length > 0 ? (
                        <MDBTable responsive hover>
                            <MDBTableHead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Localidade</th>
                                    <th>Disponibilidade</th>
                                    <th>Competência</th>
                                    <th>Ação</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {voluntariosFiltrados.map((vol) => (
                                    <tr key={vol.id}>
                                        <td>{vol.nome}</td>
                                        <td>{vol.email}</td>
                                        <td>{vol.localidade}</td>
                                        <td>{vol.disponibilidade}</td>
                                        <td>{vol.competencias.join(', ')}</td>
                                        <td>
                                            <MDBBtn color='success' size='sm'>
                                                Selecionar
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    ) : (
                        <p className="text-center">Nenhum voluntário compatível encontrado.</p>
                    )}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default MatchingVolunteersPage;
