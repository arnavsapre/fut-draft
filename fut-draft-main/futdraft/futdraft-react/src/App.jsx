import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Database from './pages/Database'
import Packs from './pages/Packs'
import DraftSim from './pages/DraftSim'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/database" element={<Database />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/draft" element={<DraftSim />} />
      </Routes>
    </>
  )
}

export default App
