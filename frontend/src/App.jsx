import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/login'
import AdminHome from './pages/admin/admin_home';
import UserHome from './pages/user/user_home';
import Profile from './pages/user/profile';
import BookDetail from './pages/admin/book_detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN ROUTES */}
        
        <Route path="/admin" element={<LogIn />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/book-detail/:bookId" element={<BookDetail />} />
        
        {/* END OF ADMIN ROUTES */}

        {/* USER ROUTES */}
        
        <Route path="/user" element={<LogIn />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/book-detail/:bookId" element={<BookDetail />} />
        
        {/* END OF USER ROUTES */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
