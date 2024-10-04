import React, { useState, useEffect } from 'react';
import './login.css';
import video3 from '../../components/Videos/v4.mp4';
import { useHistory } from 'react-router-dom';
// import users from './data/users.json';
// import fs from 'fs';
import axios from 'axios';

export default function Login(props) {
   // const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', email: '' });
   const [formData, setFormData] = useState({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      forgotPasswordUsername: '',
      forgotPasswordEmail: '',
    });
   const history = useHistory();
   const [isLogin, setIsLogin] = useState(true);
   const [forgotPassword, setForgotPassword] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
   const { handleLogin } = props;
   const { handleLoginStatusChange } = props;
   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   
   useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      const storedRememberMe = localStorage.getItem('rememberMe');
      if (storedUsername && storedRememberMe === 'true') {
         setFormData({ username: storedUsername, password: '' }); // Only retrieve username, not password
         setIsLogin(true);
         setRememberMe(true);
         props.handleLoginStatusChange(true);
         props.handleLogin();
      }
   }, []);
   

   const handleUpdatePassword = async (e) => {
      e.preventDefault();
  
      try {
        const { forgotPasswordUsername, forgotPasswordEmail } = formData;
        const response = await axios.put('http://localhost:5000/api/forgot-password', {
          username: forgotPasswordUsername,
          email: forgotPasswordEmail,
        });
  
        if (response.status === 200) {
          const newPassword = window.prompt('Enter new password:');
          if (newPassword) {
            await axios.put('http://localhost:5000/api/update-password', {
              username: forgotPasswordUsername,
              email: forgotPasswordEmail,
              newPassword: newPassword,
            });
            alert('Password updated successfully!');
            setForgotPassword(false);
          }
        } else {
          alert('Invalid username or email');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        alert('Invalid username or email');
      }
    };
  


   const handleSubmit = async (e) => {
      e.preventDefault();

      if (isLogin) {
         // Handle Login
         try {
            const response = await axios.post('http://localhost:5000/api/login', {
               username: formData.username,
               password: formData.password,
            });
            if (response.status === 200) {
               if (rememberMe) {
                  localStorage.setItem('username', formData.username);
                  localStorage.setItem('password', formData.password);
                  localStorage.setItem('rememberMe', 'true');
               } else {
                  localStorage.removeItem('username');
                  localStorage.removeItem('password');
                  localStorage.removeItem('rememberMe');
               }
            }

            // Successful login
            if (response.status === 200) {
               localStorage.setItem('username', formData.username);
               history.goBack();
               handleLoginStatusChange(true);
               handleLogin();
            } else {
               alert('Invalid username or password');
            }
         } catch (error) {
            if (error.response) {
               // Handle specific error responses from the server
               if (error.response.status === 404) {
                  alert('User not found');
               } else if (error.response.status === 401) {
                  alert('Invalid password');
               } else {
                  alert('An error occurred while logging in');
               }
            }
         }


      } else {
         // Handle Signup
         if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
         }

         try {
            const newUser = {
               username: formData.username,
               password: formData.password,
               email: formData.email,
            };

            await axios.post('http://localhost:5000/api/signup', newUser);

            // Successful signup
            localStorage.setItem('username', newUser.username);
            history.goBack();
            handleLoginStatusChange(true);
            handleLogin();
         } catch (error) {
            if (error.response && error.response.status === 400) {
               alert(error.response.data.error);
            } else {
               console.log('Error signing up:', error);
            }
         }
      }
   };
   const toggleForm = () => {
      setIsLogin(!isLogin);
      setForgotPassword(false);
      setFormData({ username: '', password: '', confirmPassword: '', email: '' });
   };
   const toggleForm2 = () => {
      setForgotPassword(false);
      setFormData({ username: '', password: '', confirmPassword: '', email: '' });
   };

   return (
      <div className="py-3">
      <video src={video3} autoPlay loop muted className="my-0" style={{ margin: '0px', paddingTop: '0px' }} />
      <div className="wrapper mx-auto" style={{ marginTop: '130px' }}>
        <div className="title">{isLogin && !forgotPassword ? 'Login Form' : forgotPassword ? 'Forgot Password' : 'Signup Form'}</div>
        {!forgotPassword ? (
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="field">
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                <label>Email ID</label>
              </div>
            )}
            <div className="field">
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
              <label>Username</label>
            </div>
            <div className="field">
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              <label>Password</label>
            </div>
            {isLogin && (
              <div className="field pt-0 mt-3 ms-3">
              Forgot Password?{' '}
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                style={{
                  textDecoration: 'none',
                  border: 'none',
                  color: 'red',
                  fontSize: '15px',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                Reset Here
              </button>
            </div>
            )}
            {!isLogin && (
              <div className="field">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <label>Confirm Password</label>
              </div>
            )}
            <div style={{ marginTop: isLogin ? '5px' : '30px' }} className="field">
              <input type="submit" value={isLogin ? 'Login' : 'Signup'} />
            </div>
            <div className="signup-link mb-0 pb-0">
              {isLogin ? (
                <>
                  Not a member?{' '}
                  <button
                    onClick={toggleForm}
                    style={{
                      textDecoration: 'none',
                      border: 'none',
                      color: 'blue',
                      fontSize: '15px',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Signup now
                  </button>
                </>
              ) : (
                <>
                  Already a member?{' '}
                  <button
                    onClick={toggleForm}
                    style={{
                      textDecoration: 'none',
                      border: 'none',
                      color: 'blue',
                      fontSize: '15px',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Login now
                  </button>
                </>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handleUpdatePassword}>
            <div className="field">
              <input
                type="text"
                name="forgotPasswordUsername"
                value={formData.forgotPasswordUsername}
                onChange={handleInputChange}
                required
              />
              <label>Username</label>
            </div>
            <div className="field">
              <input
                type="email"
                name="forgotPasswordEmail"
                value={formData.forgotPasswordEmail}
                onChange={handleInputChange}
                required
              />
              <label>Email</label>
            </div>
            <div className="field pt-0 mt-3 ms-3">
                <span style={{fontSize:"15px"}}>Go Back to Login ?{' '}</span>
                <button
                  type="button"
                  onClick={toggleForm2}
                  style={{
                    textDecoration: 'none',
                    border: 'none',
                    color: 'blue',
                    fontSize: '15px',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Login Page
                </button>
              </div>
            <div className="field mt-1">
              <input type="submit" value="Update Password" />
            </div>
          </form>
        )}
      </div>
    </div>
   );
}