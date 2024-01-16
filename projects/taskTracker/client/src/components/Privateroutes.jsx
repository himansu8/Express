import { Outlet, Navigate } from "react-router-dom"

function Privateroutes() {
    let isToken= localStorage.getItem('token')
  return (

    <>
       
        {isToken ? <Outlet/> : <Navigate to='/login'/>}

    </>
  )
}

export default Privateroutes