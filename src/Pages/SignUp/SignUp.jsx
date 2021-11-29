<<<<<<< HEAD
import React, { useState } from "react";
import "./style.scss";
=======
import React, { useState } from 'react';
import './style.scss';
>>>>>>> 9e9f722a07822ba77aeedb981941db166c6a814f

import Logo from "../../Assets/logo.png";

import { Link } from "react-location";
import { Button } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { isEmail } from "validator";

export default function SignUp() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const register = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessful(false);

    // const formData = new FormData();
    // formData.append("firstname", firstName);
    // formData.append("lastname", lastName);
    // formData.append("email", email);
    // formData.append("password", password);

    axios
<<<<<<< HEAD
      .post("http://localhost:5000/api/v1/users/signup", {
=======
      .post("https://api.haminepal.org/api/v1/users/signup", {
>>>>>>> 9e9f722a07822ba77aeedb981941db166c6a814f
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        //handle success
        alert("Registered successfully");
        setSending(false);
        setSuccessful(true);
      })
      .catch((err) => {
        //handle error
        // console.log(err.response);
        setError(err.response.data.msg);
        setSending(false);
      });
  };

  return (
    <div className='signup__container'>
      {/* @sectoin => topbar */}
      <div className='signup__container__topbar'>
        <img
          className='signup__container__logo'
          src={Logo}
          alt='haminepal logo'
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className='ri-menu-line'></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className='signup__container__landing__hiddenMenu'
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className='signup__container__landing__hiddenMenu__topbar'>
          <img
            className='signup__container__landing__topbar__logo'
            src={Logo}
            alt='haminepal logo'
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className='ri-close-line'></i>
          </button>
        </div>
        <ul className='signup__container__landing__hiddenMenu__items left'>
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
            <Link to='/'>Login/</Link> <Link to='/'>Signup</Link>
          </li>
        </ul>
        <ul className='signup__container__landing__hiddenMenu__items right'>
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
      <div className='signup__container__form'>
        <h1>Signup</h1>
        <div className='divider'></div>

        {/* @section => form container */}
        <div className='signup__container__form__inputs'>
          {!successful && (
            <div className='signup__container__form__inputs__input left'>
              <div>
                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  autoFocus
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div>
                <input
                  className='full'
                  type='email'
                  placeholder='Email Address'
                  value={email}
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!isEmail(email)) {
                      setError("Please enter valid email");
                    } else {
                      setError("");
                    }
                  }}
                />
              </div>

              <div>
                <input
                  className='full'
                  type='password'
                  placeholder='Password'
                  value={password}
                  autoFocus
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  className='full'
                  type='password'
                  placeholder='Confirm Password'
                  value={confrimPassword}
                  autoFocus
                  onChange={(e) => {
                    setConfrimPassword(e.target.value);
                  }}
                />
              </div>
              <Button onClick={register}>
                {sending ? "Sending..." : "Register"}
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
                    <span>Successfully resgitered</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className='signup__container__form__inputs__input right'>
            <img
              src='https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80'
              alt='banner'
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
