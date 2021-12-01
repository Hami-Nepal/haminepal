import React, { useState } from 'react';
import { useNavigate } from 'react-location';
import './style.scss';

import Logo from '../../Assets/logo.png';
import Switch from '@mui/material/Switch';
import { Link } from 'react-location';
import { Button } from '@mui/material';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { isEmail } from 'validator';
import baseURL from '../../api/baseURL';

export default function Login() {
  const navigate = useNavigate();

  const emailInput = React.useRef();
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [successful, setSuccessful] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [userLogin, setUserLogin] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(localStorage.getItem('user') || localStorage.getItem('vinfo'))
  );

  const handleVLogin = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessful(false);
    setSending(true);

    axios({
      method: 'POST',
      url: userLogin
        ? baseURL + '/users/login'
        : baseURL + '/volunteers/volunteerlogin',
      data: {
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        //handle success
        if (response.data.token) {
          if (userLogin) {
            localStorage.setItem('user', JSON.stringify(response.data.token));
          } else {
            localStorage.setItem('vinfo', JSON.stringify(response.data.token));
            console.log(response.data);
            const profileURL = '/volunteer-profile/' + response.data.id;
            navigate({ to: profileURL });
          }
        }
        setSending(false);
        setSuccessful(true);
        setError('');
        setIsLoggedIn(true);
      })
      .catch(function (err) {
        // handle error
        setError(err.response.data.message);
        setSending(false);
        setSuccessful(false);
        console.log(err);
      });
  };

  return (
    <div className="login__container">
      {/* @sectoin => topbar */}
      <div className="login__container__topbar">
        <img
          className="login__container__logo"
          src={Logo}
          alt="haminepal logo"
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="login__container__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? 'flex' : 'none',
        }}
      >
        <div className="login__container__landing__hiddenMenu__topbar">
          <img
            className="login__container__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="login__container__landing__hiddenMenu__items left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/">Act of Kindness</Link>
          </li>
          <li>
            <Link to="/civil-rights-movement">Civil Rights Movements</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <div className="divider"></div>
          <li>
            {isLoggedIn ? (
              <Link
                to="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link to="/signup">Signup /</Link>
                <Link to="/login"> Login</Link>
              </>
            )}
          </li>
        </ul>
        <ul className="login__container__landing__hiddenMenu__items right">
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
            <Link to="/transparency">Transparency</Link>
          </li>
          <li>
            <Link to="/volunteer">Volunteers</Link>
          </li>
        </ul>
      </div>

      {/* @section => form */}
      <div className="login__container__form">
        {/* @section => form container */}
        <div className="login__container__form__inputs">
          <div className="login__container__form__inputs__input left">
            <div
              className="donate__container__form__switch"
              style={{ fontSize: '20px' }}
            >
              Volunteer
              <Switch
                checked={userLogin}
                onClick={() => setUserLogin(!userLogin)}
              />{' '}
              User
            </div>
            <h1>{userLogin ? 'User' : 'Volunteer'} Login</h1>
            <div className="divider"></div>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              ref={emailInput}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                if (!isEmail(e.target.value)) {
                  emailInput.current.style.borderColor = 'red';
                  emailInput.current.style.borderWidth = '2px';
                } else {
                  emailInput.current.style.borderColor = 'black';
                  emailInput.current.style.borderWidth = '1px';
                }
              }}
            />
            <input
              className="full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button onClick={handleVLogin}>
              {sending
                ? 'Sending...'
                : userLogin
                ? 'User Login'
                : 'Volunteer Login'}
            </Button>

            {error && (
              <div className="form-group">
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{ color: 'red', marginTop: '20px' }}
                >
                  {error}
                </div>
              </div>
            )}
            {successful && (
              <div className="form-group">
                <div
                  className="alert alert-success"
                  role="alert"
                  style={{ color: 'green' }}
                >
                  <span>Successfully loggedIn</span>
                </div>
              </div>
            )}
          </div>

          <div className="login__container__form__inputs__input right">
            <img
              src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
              alt="banner"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
