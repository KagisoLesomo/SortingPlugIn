import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import Header from './header/Header';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const auth = getAuth();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Simulate a delay before redirecting (e.g., 2 seconds)
      setTimeout(() => {
        const user = auth.currentUser;
        if (user.email === 'admin@example.com') {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    setError(null); // Clear the error message when the user starts typing
  };

  return (
    <div>
      <Header />
      <div className='login-page'>
        <h1 className='h1'>Login Page:</h1>
        <div className='form'>
          <div>
            <label htmlFor="email-address"><b>Email address: </b></label>
            <input className='input' type="email" value={email} placeholder='me@gmail.com' onChange={(e) => setEmail(e.target.value)} onFocus={handleInputChange} />
          </div>
          <div>
            <label htmlFor="password"><b>Password: </b></label>
            <input className='input' type="password" value={password} placeholder='mypassword' onChange={(e) => setPassword(e.target.value)} onFocus={handleInputChange} />
          </div>
        </div>

        {isLoading && (
          <div className="loader-overlay">
            <div className="loader">
              <ClipLoader size={50} color="#36D7B7" />
              <div>Logging in...</div>
            </div>
          </div>
        )}

        <button className='button' onClick={handleLogin} disabled={isLoading}>
          LOGIN
        </button>

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
