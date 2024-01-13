import { Outlet, Navigate } from "react-router-dom"

function Privateroutes() {
    let isToken= localStorage.getItem('token')
  return (

    <>
        <h1>Privateroutes</h1>
        {isToken ? <Outlet/> : <Navigate to='/login'/>}

    </>
  )
}

export default Privateroutes