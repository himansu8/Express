import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <div className="home-container">
        <div className="top-bar">
          <h1> Welcome To Himansu Task Tracker</h1>
        </div>
        <div className="link-section">
          <Link to={'/signup'}>Sign Up</Link>
          <br />
          <br />
          <Link to={'/login'}>Login</Link>
        </div>
        <br />
        <img className="logo-image" src="https://asbtasktracker.com/wp-content/uploads/2022/01/tasktracker-logo-hor-green.png" />

        <footer className="footer">
          <p>&copy; 2024 Himansu Task Tracker. All Rights Reserved.</p>
        </footer>
      </div>
    </>


  )
}

export default Home

