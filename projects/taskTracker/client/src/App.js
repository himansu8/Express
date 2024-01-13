import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Privateroutes from './components/Privateroutes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />


<Route element={<Privateroutes/>}>

<Route path='/dashboard' element={<Dashboard />} />

</Route>
    </Routes>

  );
}

export default App;
