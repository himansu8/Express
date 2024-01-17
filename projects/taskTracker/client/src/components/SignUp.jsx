import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


//let { firstName, lastName, email, phone, password } = req.body

function SignUp() {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""

  })
  const { firstName, lastName, email, phone, password } = formData;


  function onChangeHandler(e) {
    //console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  async function onClick(e) {
    try {
      e.preventDefault();
      console.log(formData)
      let res = await axios.post('/api/user/signup', formData)
      console.log(res.data)
      navigate('/login');

    }
    catch (error) {
      console.log(error)
    }

  }
  function onClear(e) {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: ""
    });
  }


  return (
    <>
<div className="signup-main">
<div className="signup">
      <form>
        
          <label>
            <b>FirstName</b><br />
            <input type="text" placeholder="Enter firstName" name="firstName" onChange={onChangeHandler} value={firstName} />
          </label>
          <br />
          <label>
            <b>LastName</b><br />
            <input type="text" placeholder="Enter lastName" name="lastName" onChange={onChangeHandler} value={lastName} />
          </label>
          <br />
          <label>
            <b>Email</b><br />
            <input type="email" placeholder="Enter email" name="email" onChange={onChangeHandler} value={email} />
          </label>
          <br />
          <label>
            <b>Phone Number</b><br />
            <input type="text" placeholder="Enter phone" name="phone" onChange={onChangeHandler} value={phone} />
          </label>
          <br />
          <label>
            <b>Password</b><br />
            <input type="password" placeholder="Enter Password" name="password" onChange={onChangeHandler} value={password} />
          </label><br />
          <br />
          <button type="submit" onClick={onClick}>Submit</button>
          <br />
          <button type="button" onClick={onClear}>Cancel</button>
        

      </form>
      </div>
      <div className="signup_img">
        <img className="signup_img1" src="https://thumbs.dreamstime.com/b/sign-up-member-icon-isolated-glassy-blue-round-button-abstract-illustration-sign-up-member-icon-glassy-blue-round-button-103857638.jpg" width={"600px"} height={"600px"}/>
      </div>
      </div>
    </>
  )
}

export default SignUp