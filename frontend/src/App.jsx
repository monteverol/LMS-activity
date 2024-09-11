import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/login'
import Home from './pages/admin/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<LogIn />} />
        <Route path="/admin/home" element={<Home />} />
        {/* END OF ADMIN ROUTES */}

        {/* USER ROUTES */}
        <Route path="/user" element={<LogIn />} />
        {/* END OF USER ROUTES */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
