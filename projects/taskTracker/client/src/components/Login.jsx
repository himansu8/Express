import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function Login({ alert, showAlert }) {
  let navigate = useNavigate();
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
      if (!userData.email.trim() || !userData.password.trim()) {

        // showAlert({
        //   type: "error",
        //   msg: "Please pass email and password"
        // })
        window.alert("Please pass email and password")

        return;
      }
      //console.log(userData)
      let res = await axios.post('/api/user/login', userData)
      // console.log(res.data)
      localStorage.setItem("token", JSON.stringify({ token: res.data.token }))
      navigate('/dashboard');
    }

    catch (error) {
      let errorString = "";
      //handling express validator errors
      if (error.response.data.errors) {
        error.response.data.errors.forEach((ele) => {
          errorString += `${ele.msg} `
        })
        // showAlert({
        //   type: "error",
        //   msg: errorString
        // })
        window.alert(errorString)

      }
      else {
        //Custom errors
        errorString = error.response.data.error;
        // showAlert({
        //   type: "error",
        //   msg: errorString
        // })
        window.alert(errorString)

      }
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
        {alert ? <p className={`alert-${alert.type}`} >{alert.msg}</p> : ""}
        <div>
          <label><b>Username</b></label>
          <br />
          <input type="text" placeholder="Enter Username" name="email" onChange={onChangeHandler} value={email} />
          <br />
          <label><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="password" onChange={onChangeHandler} value={password} />
          <br />
          <button type="submit" onClick={onClick}>Login</button>
          <br />
          <button type="button" onClick={onClear}>Cancel</button>
        </div>
      </form>

    </>
  )
}

export default Login