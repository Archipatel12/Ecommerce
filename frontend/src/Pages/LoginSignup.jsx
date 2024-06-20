import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    console.log("login", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  }

  const signup = async () => {
    console.log("signup", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="login-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "signup" && (
            <input name="username" value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />
          )}
          <input name="email" value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name="password" value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
          <button onClick={() => { state === "login" ? login() : signup() }}>Continue</button>
          {state === "signup"
            ? <p className="loginsignup-login">
              Already Have An Account?<span onClick={() => { setState("login") }}>Login Here</span>
            </p> : <p className="loginsignup-login">
              Create An Account?<span onClick={() => { setState("signup") }}> Click Here</span>
            </p>}
        </div>
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By Continuing I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
