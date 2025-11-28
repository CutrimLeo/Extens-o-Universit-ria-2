import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Ajuste os imports abaixo para os caminhos reais das suas pages
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
// Substitui import de ./pages/NotFound (arquivo ausente) por componente inline
const NotFound = () => (
  <div style={{ padding: 24 }}>
    <h2>Página não encontrada</h2>
    <p>A rota requisitada não existe.</p>
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{padding:20}}>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* rota de exemplo para redirecionar /app para dashboard */}
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          {/* rota coringa */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
