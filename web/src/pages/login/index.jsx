import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                navigate('/profile');
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor.');
        }
    };

    return (
        <MDBContainer fluid className='p-4 background-radial-gradient full-height-container'>
            <MDBRow>
                <MDBCol md='6' className='text-left text-md-start d-flex flex-column justify-content-center'>
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
                                <p className='w-100 mb-4' size='md' style={{ color:'red', fontSize:"2rem"}} > Login</p>
                                <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' onChange={handleChange} required />
                                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' onChange={handleChange} required />
                                <MDBBtn type='submit' className='w-100 mb-4' size='md' style={{ backgroundColor: 'hsl(0, 90%, 50%)', color: 'white' }}>Login</MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
