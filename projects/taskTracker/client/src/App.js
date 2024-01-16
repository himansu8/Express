import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Privateroutes from './components/Privateroutes';
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />


<Route element={<Privateroutes/>}>

<Route path='/dashboard' element={<Dashboard />} />
<Route path='/addtask' element={<AddTask />} />
<Route path='/task/:taskid' element={<ViewTask />} />



</Route>
    </Routes>

  );
}

export default App;
