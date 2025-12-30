import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './layout/sidebar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
