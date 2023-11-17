import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import Header from './header/Header';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      window.alert("Logged in successfully:" + user.email);

      // Redirect based on user type
      if (user.email === 'admin@example.com') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Login error:', error.message);
      window.alert("Error logging in: " + error.message);
    }
  };

  return (
    
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',backgroundImage: 'url("../images/background.png")', backgroundSize: 'cover', paddingTop: '60px'}}>
      <Header />

      <div class="login-container">

          <div class="email-label">
              
              <label htmlFor="email-address" >  </label>
              <input type="email" value={email} placeholder='me@gmail.com' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="password-label">
              
              <label htmlFor="password"></label>
              <input type="password" value={password} placeholder='mypassword' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div class="btn"> <button onClick={handleLogin}>Login</button> <button onClick={handleLogin}>Sign Up</button> </div>
      </div>
      </div>
  );
};

export default Login;
