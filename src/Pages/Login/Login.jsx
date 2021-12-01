import React, { useState } from "react";
import "./style.scss";

import Logo from "../../Assets/logo.png";
import Switch from "@mui/material/Switch";
import { Link } from "react-location";
import { Button } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { isEmail } from "validator";
import baseURL from "../../api/baseURL";

export default function Login() {
  const emailInput = React.useRef();
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [userLogin, setUserLogin] = React.useState(false);

  const handleVLogin = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessful(false);

    axios({
      method: "POST",
      url: baseURL + "/volunteers/volunteerlogin",
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("vinfo", JSON.stringify(response.data.token));
        }
        alert("loggged In");
        setSending(false);
        setSuccessful(true);
      })
      .catch(function (err) {
        // handle error
        setError(err.response.data.message);
        setSending(false);
        console.log(err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessful(false);

    axios({
      method: "POST",
      url: baseURL + "/users/login",
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        //handle success
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        alert("loggged In");
        setSending(false);
        setSuccessful(true);
        return response.data;
      })
      .catch(function (err) {
        //handle error
        setError(err.response.data.msg);
        setSending(false);
      });
  };

  return (
    <div className='login__container'>
      {/* @sectoin => topbar */}
      <div className='login__container__topbar'>
        <img
          className='login__container__logo'
          src={Logo}
          alt='haminepal logo'
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className='ri-menu-line'></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className='login__container__landing__hiddenMenu'
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className='login__container__landing__hiddenMenu__topbar'>
          <img
            className='login__container__landing__topbar__logo'
            src={Logo}
            alt='haminepal logo'
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className='ri-close-line'></i>
          </button>
        </div>
        <ul className='login__container__landing__hiddenMenu__items left'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/'>News</Link>
          </li>
          <li>
            <Link to='/'>Act of Kindness</Link>
          </li>
          <li>
            <Link to='/'>Civil Rights Movements</Link>
          </li>
          <li>
            <Link to='/'>Contact Us</Link>
          </li>
          <div className='divider'></div>
          <li>
            <Link to='/'>Login/</Link> <Link to='/'>login</Link>
          </li>
        </ul>
        <ul className='login__container__landing__hiddenMenu__items right'>
          <li>
            <Link to='/'>About Us</Link>
          </li>
          <li>
            <Link to='/'>Cause</Link>
          </li>
          <li>
            <Link to='/'>Events</Link>
          </li>
          <li>
            <Link to='/'>Transparency</Link>
          </li>
          <li>
            <Link to='/'>Volunteers</Link>
          </li>
        </ul>
      </div>

      {/* @section => form */}
      <div className='login__container__form'>
        {/* @section => form container */}
        <div className='login__container__form__inputs'>
          {!successful && (
            <div className='login__container__form__inputs__input left'>
              <div
                className='donate__container__form__switch'
                style={{ fontSize: "20px" }}
              >
                <Switch
                  checked={userLogin}
                  onClick={() => setUserLogin(!userLogin)}
                />{" "}
                {!userLogin ? "User Login" : "Volunteer Login"}
              </div>
              {!userLogin ? (
                <>
                  <h1>Volunteer Login</h1>
                  <div className='divider'></div>
                  <input
                    type='email'
                    placeholder='Email Address'
                    required
                    value={email}
                    ref={emailInput}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      if (!isEmail(e.target.value)) {
                        emailInput.current.style.borderColor = "red";
                        emailInput.current.style.borderWidth = "2px";
                      } else {
                        emailInput.current.style.borderColor = "black";
                        emailInput.current.style.borderWidth = "1px";
                      }
                    }}
                  />
                  <input
                    className='full'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Button onClick={handleVLogin}>
                    {sending ? "Sending..." : "volunter Login"}
                  </Button>
                </>
              ) : (
                <>
                  <h1>User Login</h1>
                  <div className='divider'></div>
                  <input
                    type='email'
                    placeholder='Email Address'
                    required
                    value={email}
                    ref={emailInput}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      if (!isEmail(e.target.value)) {
                        emailInput.current.style.borderColor = "red";
                        emailInput.current.style.borderWidth = "2px";
                      } else {
                        emailInput.current.style.borderColor = "black";
                        emailInput.current.style.borderWidth = "1px";
                      }
                    }}
                  />
                  <input
                    className='full'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Button onClick={handleLogin}>
                    {sending ? "Sending..." : "User Login"}
                  </Button>
                </>
              )}
              {error && (
                <div className='form-group'>
                  <div
                    className='alert alert-danger'
                    role='alert'
                    style={{ color: "red", marginTop: "20px" }}
                  >
                    {error}
                  </div>
                </div>
              )}
              {successful && (
                <div className='form-group'>
                  <div
                    className='alert alert-success'
                    role='alert'
                    style={{ color: "green" }}
                  >
                    <span>Successfully loggedIn</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className='login__container__form__inputs__input right'>
            <img
              src='https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80'
              alt='banner'
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
