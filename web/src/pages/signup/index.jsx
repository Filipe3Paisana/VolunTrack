import React, { useState } from 'react';
import './signup.css';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
} from 'mdb-react-ui-kit';

function App() {
    const [categoria, setCategoria] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        data_nascimento: '',
        password: '',
        disponibilidade: '',
        competencias: '',
        categoria: '',
        localidade: '',
    });
    
    // Definir as competências por categoria
    const competenciasOptions = {
        'Saúde': ['Médico', 'Enfermeiro', 'Psicólogo', 'Socorrista'],
        'Socorro e Emergência': ['Bombeiro', 'Paramédico', 'Resgatista'],
        'Formação/Ensino': ['Professor', 'Instrutor', 'Educador'],
        'Apoio Social': ['Assistente Social', 'Terapeuta', 'Voluntário'],
        'Âmbito Local': ['Coordenador', 'Gestor de Projetos', 'Organizador Comunitário']
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.categoria = categoria;

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao conectar com o servidor.');
        }
    };

    return (
        <MDBContainer fluid className='p-4 background-radial-gradient full-height-container'>
            <MDBRow>
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        Cruz Vermelha <br />
                        <span>VolunTrack</span>
                    </h1>
                </MDBCol>

                <MDBCol md='6' className='position-relative'>
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className='my-5 bg-glass'>
                        <MDBCardBody className='p-5'>
                            <form onSubmit={handleSubmit}>
                            
                    
                            <MDBInput wrapperClass='mb-4' label='Name' id='nome' type='name' onChange={handleChange}/>
                            <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' onChange={handleChange}/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' onChange={handleChange}/>
                            <MDBRow>
                                <MDBCol col='6'>
                                <MDBInput wrapperClass='mb-4' label='Phone number' id='telefone' type='tel' onChange={handleChange}/>
                                </MDBCol>

                                <MDBCol col='6'>
                                <MDBInput wrapperClass='mb-4' label='Date of birth' id='data_nascimento' type='date' onChange={handleChange}/>
                                </MDBCol>
                            </MDBRow>
                            
                            {/* Disponibilidade durante o dia Dropdown */}
                            <div className='mb-4'>
                                <select className='form-select' id='disponibilidade' onChange={handleChange}>
                                    <option value='' disabled selected>Disponibilidade</option>
                                    <option value='Manhã'>Manhã</option>
                                    <option value='Tarde'>Tarde</option>
                                    <option value='Noite'>Noite</option>
                                </select>
                            </div>


                            {/* Categoria Dropdown */}
                            <div className='mb-4'>
                                <select 
                                    className='form-select' 
                                    id='categoria' 
                                    value={categoria} 
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value='' disabled>Categoria</option>
                                    <option value='Saúde'>Saúde</option>
                                    <option value='Socorro e Emergência'>Socorro e Emergência</option>
                                    <option value='Formação/Ensino'>Formação/Ensino</option>
                                    <option value='Apoio Social'>Apoio Social</option>
                                    <option value='Âmbito Local'>Âmbito Local</option>
                                </select>
                            </div>

                            {/* Competências Dropdown */}
                            <div className='mb-4'>
                                <select className='form-select' id='competencias' onChange={handleChange}>
                                    <option value='' disabled selected>Competência</option>
                                    {categoria && competenciasOptions[categoria] && competenciasOptions[categoria].map((comp) => (
                                        <option key={comp} value={comp}>{comp}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Localidade Dropdown */}
                            <div className='mb-4'>
                                <select className='form-select' id='localidade' onChange={handleChange}>
                                    <option value='' disabled selected >Localidade</option>
                                    <option value='Aveiro'>Aveiro</option>
                                    <option value='Beja'>Beja</option>
                                    <option value='Braga'>Braga</option>
                                    <option value='Bragança'>Bragança</option>
                                    <option value='Castelo Branco'>Castelo Branco</option>
                                    <option value='Coimbra'>Coimbra</option>
                                    <option value='Évora'>Évora</option>
                                    <option value='Faro'>Faro</option>
                                    <option value='Guarda'>Guarda</option>
                                    <option value='Leiria'>Leiria</option>
                                    <option value='Lisboa'>Lisboa</option>
                                    <option value='Portalegre'>Portalegre</option>
                                    <option value='Porto'>Porto</option>
                                    <option value='Santarém'>Santarém</option>
                                    <option value='Setúbal'>Setúbal</option>
                                    <option value='Viana do Castelo'>Viana do Castelo</option>
                                    <option value='Vila Real'>Vila Real</option>
                                    <option value='Viseu'>Viseu</option>
                                    <option value='Açores'>Açores</option>
                                    <option value='Madeira'>Madeira</option>
                                </select>
                            </div>

                            <MDBBtn type='submit' className='w-100 mb-4' size='md' style={{ backgroundColor: 'hsl(0, 90%, 50%)', color: 'white' }}>Sign up</MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default App;
