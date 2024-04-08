import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './LoginSignUp.css';
import { useNavigate } from 'react-router-dom';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import  email_icon  from '../Assets/email.png';

export default function Login() {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [signup,setSignUp]=useState(false);
  // const [textFiledLogin,setTextFiledlogin]=useState("");
  // const [textFiledSignUp,setTextFiledSignUp]=useState("");
  
  const history = useNavigate();
  
  useEffect(() => {
    return () => {
     setUsername('');
     setPassword('');
     setEmail('');
    };
  }, []);

  
  const handleAuthentication = async () => {
    try {
      
      if (action === "Login") {
        if (!email || !password) {
          console.error("Please enter both email and password");
          // setTextFiledlogin("Please enter both email and password");
          return;
        }
  
        const response = await axios.post('http://localhost:3001/login/login', {
          email,
          password
        });
  
        console.log(response.data.message);
        history("/Home");
      } else {
        if (!username || !email || !password) {
          console.error("Please enter all fields"); 
          // setTextFiledSignUp("Please enter all fields");
          return;
        }
  
        const response = await axios.post('http://localhost:3001/signup/sign', {
          username,
          email,
          password
        });
  
        console.log(response.data);
        setSignUp(true);
        // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error(`${action} failed`);
    }
  };
  

  const handleForgetClick = () => {
    setResetPasswordMode(true);
  };

  const handleResetPassword = async () => {
    try {
      // Implement reset password logic using newPassword state
      try {
        await axios.post('http://localhost:3001/api/reset-password', { email , newPassword});
        alert('A password reset link has been sent to your email.');
      } catch (error) {
        console.error(error);
        alert('An error occurred while processing your request.');
      }

      console.log('Password changed successfully');
      // Reset newPassword state after successful password change
      setNewPassword('');
    // Exit reset password mode
      setResetPasswordMode(false);
    } catch (error) {
      console.error('Reset password failed');
    }
  };

  return (
    <>
    <form >
      <div className="main_back">
        <div className="main">
          <div className="side"></div>

          {resetPasswordMode ? (
            <div className="password-reset-container">
            <h2>Password Reset</h2>
            
            <div className="passset">
              <div className="input input_email">
                <div className="emailtext"></div>
                <img src={email_icon} alt="" />
                <div className="input_container">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="input input_pass">
                <div className="passtext"></div>
                <img src={password_icon} alt="" />
                <div className="input_container">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={handleResetPassword}>Reset Password</button>
              <br></br><br></br>
            </div>
          </div>
          
          ) : (
            <div className="container">
              <img src="" alt="" />
              <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
              </div>
              
              {/* {textFiledSignUp ? <div><p className="sign-text">Please enter all fields</p></div>:<div></div> }
              {textFiledLogin ? <div><p className="sign-text">Please enter both email and password</p></div>:<div></div> }*/}
              {/* {action === "Login" ? <p className="sign-text">{textFiledSignUp}</p>:<p className="sign-text">{textFiledLogin}</p>}*/}
              {signup? <div><p className="sign-text">Sign Up Successful! Redirect to login-page for Login...</p></div> : <div></div>}  

              <div className="inputs">
                {action === "Login" ? (
                  <div></div>
                ) : (
                  <div className="input">
                    <img src={user_icon} alt="" />
                    <input
                      type="text"
                      placeholder="Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="input">
                  <img src={email_icon} alt="" />
                  <input
                    type="email"
                    placeholder="Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input">
                  <img src={password_icon} alt="" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {action === "Login" ? (
                  <div className="forgot-passward">
                    Lost Password? <span onClick={handleForgetClick}>Click Here!</span>
                  </div>
                ) : null}

                <div className="submit-container">

                <div
                    className={action === "Login" ? "submit" : "submit gray"}
                    onClick={() => {
                      setSignUp(false);
                      setAction("Login");
                      handleAuthentication();
                    }}
                   >
                      Login
                  </div>

                  <div
                    className={action === "Sign Up" ? "submit" : "submit gray"}
                    onClick={() => {
                     
                      setAction("Sign Up");
                      setUsername("");
                      setEmail("");
                      setPassword("");
                      handleAuthentication();
                    }}
                  >
                   Sign Up
                  </div>         
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </form>
    </>
  );
}