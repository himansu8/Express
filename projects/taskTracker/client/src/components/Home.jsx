import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <div className="home_div">
        <div className="top_bar">
          <h1> Welcome To Himansu Task Tracker</h1>
        </div>
        <div className="link_1">
        <Link to={'/signup'}>Sign Up</Link>
        <br />
        <br/>
        <Link to={'/login'}>Login</Link>
        </div><br/>
        <img className="image" src="https://asbtasktracker.com/wp-content/uploads/2022/01/tasktracker-logo-hor-green.png"/>
      </div>
    </>


  )
}

export default Home

