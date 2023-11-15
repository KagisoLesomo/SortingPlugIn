import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'
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
      navigate("/");
    } catch (error) {
      console.error('Login error:', error.message);
      window.alert("Error logging in: " + error.message);
    }
  };

  const handleAdminRedirect = () => {
    // Redirect to admin.js or the admin route
    navigate("/admin");
  };

  return (
    <div>
        <Header />

        <h1>Login:</h1>

      <div>
      <label htmlFor="email-address" className='email-label'>
                                    Email address
                                </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password" className='password-label'>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>

      {/* Button to redirect to admin page */}
      <button onClick={handleAdminRedirect}>Admin</button>

      <p className="text-sm text-white text-center">
        No account yet?{' '}
        <NavLink to="/signup">
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
