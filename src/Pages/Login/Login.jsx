import React, { useState } from 'react';
import './style.scss';

import Logo from '../../Assets/logo.png';

import { Link } from "react-location";
import { Button } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { isEmail } from "validator";

export default function Login() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessful(false);

    axios({
      method: "POST",
      url: "https://api.haminepal.org/api/v1/users/login",
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
          display: isActiveMenu ? 'flex' : 'none',
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
            <Link to="/contact">Contact Us</Link>
          </li>
          <div className='divider'></div>
          <li>
            <Link to="/login">Login/</Link> <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <ul className='login__container__landing__hiddenMenu__items right'>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/causes">Cause</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to='/'>Transparency</Link>
          </li>
          <li>
            <Link to="/volunteer">Volunteer</Link>
          </li>
        </ul>
      </div>

      {/* @section => form */}
      <div className='login__container__form'>
        {/* @section => form container */}
        <div className='login__container__form__inputs'>
          {!successful && (
            <div className='login__container__form__inputs__input left'>
              <h1>Login</h1>
              <div className='divider'></div>
              <input
                className='full'
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!isEmail(email)) {
                    setError("Please enter valid email");
                  } else {
                    setError("");
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
                {sending ? "Sending..." : "Login"}
              </Button>
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
