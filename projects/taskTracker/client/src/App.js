import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>

  );
}

export default App;
