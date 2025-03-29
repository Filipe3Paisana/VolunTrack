
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react';
import Signup from './pages/Signup/Signup';
import Perfil from './pages/Perfil/Perfil';
import CreateProjectPage from './pages/project_page/project'
import MatchingVolunteersPage from './pages/volutario_select/volutario_list'

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
