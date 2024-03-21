import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  let auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear('user');
    navigate('/signup')
  }
  return (
    <div>
    <img  alt='logo' className="logo" src='https://yt3.googleusercontent.com/ytc/APkrFKZ2MZZcwiRZwDCd719cQbBhD7lt4pHypApsByXZCA=s900-c-k-c0x00ffffff-no-rj'/>
      {auth ? <ul className='nav-ui'>
        <li><Link to='/' >Product</Link></li>
        <li><Link to='/add' >Add Product</Link></li>
        <li><Link to='/update' >Update Product</Link></li>
        <li><Link to='/profile' >Profile</Link></li>
        <li><Link onClick={logout} to='/signup' >Logout ({JSON.parse(auth).name})</Link></li> 
      </ul> :
        <ul className='nav-ui nav-right'>
          <li><Link to='/signup' >SignUp</Link></li>
          <li><Link to='/login' >Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav
