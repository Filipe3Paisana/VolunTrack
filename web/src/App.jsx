
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react';
import Signup from './pages/signup';
import Perfil from './pages/perfil';
import CreateProjectPage from './pages/project_page'
import MatchingVolunteersPage from './pages/volutario_select'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/project" element={<CreateProjectPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/voluntario_list" element={<MatchingVolunteersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
