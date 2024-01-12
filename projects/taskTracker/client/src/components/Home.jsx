import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <Link to={'/signup'}>Sign Up</Link>
      <br />
      <Link to={'/login'}>Login</Link>
    </>


  )
}

export default Home

