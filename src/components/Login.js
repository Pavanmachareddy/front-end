import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    },[])
    const handleLogin = async () => {
        console.warn("email,password", email, password);
        let result = await fetch("http://127.0.0.1:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-type": "application/json"
            }
        });
        
        result = await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.name));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert("please enter the correct details")
        }
    }
    return (
        <div className='login'>
            <input type="text" className='inputbox' placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className='inputbox' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className='appbutton' type='button'>Login</button>
        </div>
    )
}

export default Login

