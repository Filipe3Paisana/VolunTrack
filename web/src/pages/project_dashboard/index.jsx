import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const ProjectDashboard = () => {
  const projeto = {
    id: 1,
    nome: 'Distribuição de Alimentos',
    descricao: 'Apoiar famílias carenciadas na zona de Lisboa',
    dataInicio: '2025-04-01',
    dataFim: '2025-04-30',
    localidade: 'Lisboa',
    categoria: 'Apoio Social',
    voluntariosAtribuidos: [
      { nome: 'Ana Silva', disponibilidade: 'Manhã', email: 'ana@email.com' },
      { nome: 'Carlos Santos', disponibilidade: 'Tarde', email: 'carlos@email.com' }
    ]
  };

  return (
    <MDBContainer className="py-5">
      <h2 className="mb-4 text-center">Projeto: {projeto.nome}</h2>

      <MDBCard>
        <MDBCardBody>

          {/* Secção: Informações do Projeto */}
          <h4 className="mb-3">Informações</h4>
          <MDBRow className="mb-3">
            <MDBCol md="6">
              <p><strong>Categoria:</strong> {projeto.categoria}</p>
              <p><strong>Localidade:</strong> {projeto.localidade}</p>
            </MDBCol>
            <MDBCol md="6">
              <p><strong>Data de Início:</strong> {projeto.dataInicio}</p>
              <p><strong>Data de Fim:</strong> {projeto.dataFim}</p>
            </MDBCol>
          </MDBRow>
          <p><strong>Descrição:</strong> {projeto.descricao}</p>

          <hr className="my-4" />

          {/* Secção: Voluntários atribuídos */}
          <h4 className="mb-3">Voluntários Atribuídos</h4>
          {projeto.voluntariosAtribuidos.length > 0 ? (
            <>
              <MDBTable responsive hover bordered>
                <MDBTableHead light>
                  <tr>
                    <th>Nome</th>
                    <th>Disponibilidade</th>
                    <th>Email</th>
                    <th>Ação</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {projeto.voluntariosAtribuidos.map((vol, i) => (
                    <tr key={i}>
                      <td>{vol.nome}</td>
                      <td>{vol.disponibilidade}</td>
                      <td>{vol.email}</td>
                      <td>
                        <MDBBtn size="sm" color="danger">
                          <MDBIcon icon="trash" className="me-1" />
                          Remover
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>

              <div className="text-end mt-3">
                <MDBBtn color="primary" href={`/projeto/${projeto.id}/voluntarios`}>
                  <MDBIcon icon="user-plus" className="me-1" />
                  Ver Voluntários Compatíveis
                </MDBBtn>
              </div>
            </>
          ) : (
            <p className="text-muted">Nenhum voluntário atribuído a este projeto.</p>
          )}

          <hr className="my-4" />

          {/* Secção: Turnos */}
          <h4 className="mb-3">Turnos</h4>
          <p className="text-muted">Ainda não existem turnos criados para este projeto.</p>
          <MDBBtn color="secondary" disabled>
            <MDBIcon icon="calendar-plus" className="me-2" />
            Criar Turnos (em breve)
          </MDBBtn>

          <hr className="my-4" />

          {/* Secção: Ações administrativas */}
          <h4 className="mb-3">Ações</h4>
          <MDBRow>
            <MDBCol md="4" className="mb-3">
              <MDBBtn color="warning" className="w-100">
                <MDBIcon icon="pen" className="me-2" />
                Editar Projeto
              </MDBBtn>
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <MDBBtn color="danger" className="w-100">
                <MDBIcon icon="ban" className="me-2" />
                Encerrar Projeto
              </MDBBtn>
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <MDBBtn color="info" className="w-100">
                <MDBIcon icon="file-export" className="me-2" />
                Exportar Dados
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default ProjectDashboard;
