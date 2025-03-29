import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon
} from 'mdb-react-ui-kit';

// Exemplo de dados mock (para simular dados reais)
const projetosMock = [
  {
    id: 1,
    nome: 'Distribuição de Alimentos',
    localidade: 'Lisboa',
    categoria: 'Apoio Social',
    dataInicio: '2025-04-01',
    dataFim: '2025-04-30'
  },
  {
    id: 2,
    nome: 'Campanha de Doação de Sangue',
    localidade: 'Porto',
    categoria: 'Saúde',
    dataInicio: '2025-05-10',
    dataFim: '2025-05-12'
  }
];

const CoordinatorDashboard = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    // No futuro: fetch para API -> /api/coordenador/projetos
    setProjetos(projetosMock);
  }, []);

  return (
    <MDBContainer className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Meus Projetos</h2>
        <MDBBtn color="success" href="/create_project">
          <MDBIcon icon="plus" className="me-2" />
          Criar Novo Projeto
        </MDBBtn>
      </div>

      {projetos.length > 0 ? (
        <MDBRow>
          {projetos.map((proj) => (
            <MDBCol md="6" lg="4" className="mb-4" key={proj.id}>
              <MDBCard className="h-100 shadow-3">
                <MDBCardBody>
                  <MDBCardTitle>{proj.nome}</MDBCardTitle>
                  <p><strong>Categoria:</strong> {proj.categoria}</p>
                  <p><strong>Localidade:</strong> {proj.localidade}</p>
                  <p><strong>Início:</strong> {proj.dataInicio}</p>
                  <p><strong>Fim:</strong> {proj.dataFim}</p>
                  <MDBBtn color="primary" href={`/projeto/${proj.id}`}>
                    <MDBIcon icon="folder-open" className="me-2" />
                    Ver Projeto
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <p className="text-muted text-center">Ainda não tens projetos. Clica em "Criar Novo Projeto" para começar.</p>
      )}
    </MDBContainer>
  );
};

export default CoordinatorDashboard;
