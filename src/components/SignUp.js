import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  })


  const collectedData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://127.0.0.1:5000/register", {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    result = await result.json();
    console.log(result);
    localStorage.setItem('user',JSON.stringify(result));
    localStorage.setItem('token',JSON.stringify(result.auth));
      navigate('/')
  }
  return (
    <div className='register'>
      <h1 >Register</h1>
      <input className="inputbox" type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input className="inputbox" type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="inputbox" type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={collectedData} className='appbutton' type='button'>Sign Up</button>
    </div>
  )
}

export default SignUp
