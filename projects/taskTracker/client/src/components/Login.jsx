import React, { useState } from "react"
import axios from "axios";


function Login() {

  let [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = userData;
  function onChangeHandler(e) {
    //console.log(e.target.value)
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  async function onClick(e) {
    try {
      e.preventDefault();
      console.log(userData)
      let res = await axios.post('/api/user/login', userData)
      console.log(res.data)
      localStorage.setItem("token", JSON.stringify({ token: res.data.token }))
    }
    catch (error) {
      console.log(error)
    }

  }
  function onClear(e) {
    e.preventDefault();
    setUserData({
      email: '',
      password: '',
    });
  }


  return (
    <>

      <form>
        <div>
          <label><b>Username</b></label>
          <br />
          <input type="text" placeholder="Enter Username" name="email" onChange={onChangeHandler} value={email}/>
          <br />
          <label><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="password" onChange={onChangeHandler} value={password} />
          <br />
          <button type="submit" onClick={onClick}>Login</button>
          <br />
          <button type="button"  onClick={onClear}>Cancel</button>
        </div>
      </form>

    </>
  )
}

export default Login