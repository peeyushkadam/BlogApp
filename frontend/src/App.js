import './App.css';
// import Post from './components/Post';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import { UserContextProvider } from './UserContext';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create' element={<CreatePostPage />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/edit/:id' element={<EditPostPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
