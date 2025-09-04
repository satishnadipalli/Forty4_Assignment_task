import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UserForm from './pages/UserForm.jsx'
import UserDetail from './pages/UserDetail.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Dashboard />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/:id/edit" element={<UserForm edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
