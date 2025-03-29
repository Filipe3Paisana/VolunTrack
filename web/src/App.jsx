
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup'
import CreateProjectPage from './pages/project_page'
import MatchingVolunteersPage from './pages/volutario_select'
import Perfil from './pages/perfil';
import { AuthProvider } from './context/AuthContext'
import ProjectDashboard from './pages/project_dashboard';
import Login from './pages/login';
import CoordinatorHome from './pages/coordinator_home'

const App = () => { 
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create_project" element={<CreateProjectPage />} />
          <Route path="/project_dashboard" element={<ProjectDashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/voluntario_list" element={<MatchingVolunteersPage />} />
          <Route path="/coordinator_home" element={<CoordinatorHome />} />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
