import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup/signup'
import CreateProjectPage from './pages/project_page/project'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/project" element={<CreateProjectPage />} />
      </Routes>
    </Router>

  )
}

export default App
