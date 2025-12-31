import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './layout/sidebar'
import Login from './pages/login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />} >
        <Route index element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
