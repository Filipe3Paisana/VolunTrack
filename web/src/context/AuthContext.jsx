import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile(token);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/profile', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log("User data:", data); // Verifique os dados aqui
                setUser(data);  // Atualiza o estado com os dados do usuário
            } else {
                logout();
            }
        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
            logout();
        }
    };
    

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
