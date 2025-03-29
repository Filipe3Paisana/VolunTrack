
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import CreateProjectPage from './pages/project_page/project'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Perfil from './pages/Perfil/Perfil';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/project" element={<CreateProjectPage />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
};

export default App;
