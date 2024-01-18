import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Privateroutes from './components/Privateroutes';
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask';
import EditTask from './components/EditTask';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);


  const showAlert = (payload) => {
    setAlert({
      type: payload.type,
      msg: payload.msg
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login  alert={alert} showAlert={showAlert}/>} />
      <Route path='/signup' element={<SignUp alert={alert} showAlert={showAlert}/>} />


      <Route element={<Privateroutes />}>

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addtask' element={<AddTask />} />
        <Route path='/task/:taskid' element={<ViewTask />} />
        <Route path='/task/edit' element={<EditTask />} />




      </Route>
    </Routes>

  );
}

export default App;
