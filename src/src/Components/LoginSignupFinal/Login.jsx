import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './LoginSignUp.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import user_icon from '../Assets/person.png';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import MyCustomButton from '../MyCustomButton/MyCustomButton';
import { GoogleLogin } from '@react-oauth/google';


export default function Login() {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // State to manage signup success
  const [isPasswordContainer, setIsPasswordContainer] = useState(false); // Corrected variable name
  const [oauth, setOauth] = useState(null);

  const history = useNavigate(); // Initialize history

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
        // Login logic
        if (!email || !password) {
          console.error("Please enter both email and password");
          toast.error("Please enter both email and password");
          return;
        }

        const response = await axios.post('http://localhost:3001/user/loginhere', {
          email,
          password
        });
        console.log("Logging in...");
        localStorage.setItem("token", response.data.token);
        toast.success('Login successful');
        history("/main");

      } else {
        // Signup logic
        if (!username || !email || !password) {
          console.error("Please enter all fields");
          toast.error("All fields are required");
          return;
        }
        const response = await axios.post('http://localhost:3001/user/signup', {
          username,
          email,
          password
        });
        console.log("Signing up...");
        console.log(response.data);

        setSignupSuccess(true); // Set signup success to true
        toast.success('Signup successful');
      }
    } catch (error) {
      console.error(`${action} failed`);
    }
  };

  const handleForgetClick = async () => {
    setResetPasswordMode(true);
    setIsPasswordContainer(!isPasswordContainer);
  };

  const handleResetPassword = async () => {
    const frontendUrl = window.location.origin;

    toast.success('Reset link has been sent to you email address');
    await axios.post('http://localhost:3001/user/forgot-password-setting', { newEmail, frontendUrl })
      .then(res => {
        if (res.data.Status === "Success") {
          console.log("you are sending an request for password reset");
        }
      }).catch(err => console.log(err))
  };

  // UseEffect to monitor signupSuccess state
  useEffect(() => {
    if (signupSuccess) {
      // After successful signup, automatically set the action to "Login"
      setAction("Login");
    }
  }, [signupSuccess]);

  return (
    <>
      <form onSubmit={resetPasswordMode ? handleResetPassword : handleAuthentication}>
        <div className="main_back">
          <div class="container-main-page1">
            <div className="main">
              <div className={!isPasswordContainer ? "left-side" : ""}>
                <div class="content">

                </div>
              </div>

              {resetPasswordMode ? (
                <div className="password-reset-container">
                  <div>
                    <h2 className="text-action-main">Password Reset</h2>
                  </div>

                  <div className="passset">
                    <div className="input input_pass">
                      <div className="passtext"></div>
                      <img src={email_icon} alt="" />
                      <div className="input_container">
                        <input
                          type="email"
                          placeholder="Email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='submit-reset-button-page1'>
                    <button type="submit">Reset Password</button>
                  </div>
                </div>
              ) : (
                <div className="right-container">
                  <div className="action-text">
                    <div className="text-action-main">{action}</div>
                  </div>

                  {signupSuccess ? ( // If signup success is true, display the login section
                    <div></div>
                  ) : null}

                  {oauth ? (
                    <div>
                      <p className="confirm-text">Sign Up Successful By Google! Redirect to login-page for Login...</p>
                    </div>
                  ) : null}

                  <div className="right-inputs">
                    {action === "Login" ? (
                      <div></div>
                    ) : (
                      <div className="input">
                        <img src={user_icon} alt="" className="img" />
                        <input
                          type="text" placeholder="Name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    <div className="input">
                      <img src={email_icon} alt="" className="img" />
                      <input
                        type="email"
                        placeholder="Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input">
                      <img src={password_icon} alt="" className="img" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {action === "Login" ? (
                      <div className="forgot-password-text">
                        Lost Password? <span onClick={handleForgetClick}>Click Here!</span>
                      </div>
                    ) : null}

                    <div className="submit-container-buttons">
                      <div className="submit-container-left">
                        <div
                          className={action === "Login" ? "submit" : "submit gray"}
                          type="submit"
                          onClick={(e) => {
                            handleAuthentication(e);
                            setSignupSuccess(false); // Reset signup success on login action
                            setAction("Login");
                          }}
                        >
                          Login
                        </div>

                        <div
                          className={action === "Sign Up" ? "submit" : "submit gray"}
                          type="submit"
                          onClick={(e) => {
                            handleAuthentication(e);
                            setAction("Sign Up");
                            setUsername("");
                            setEmail("");
                            setPassword("");
                          }}
                        >
                          Sign Up
                        </div>
                      </div>
                      <div className="submit-container-right">
                        {/* {action === "Sign Up" && (<GoogleLogin
                        onSuccess={credentialResponse => {
                          console.log(credentialResponse);
                          const credentialData = jwtDecode(credentialResponse.credential);
                          console.log(credentialData);
                          handleGoogle(credentialData);
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                      />)}   */}
                      </div>
                    </div>
                  </div>
                </div>

              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
