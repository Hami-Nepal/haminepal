import React, { useState } from "react";

import "./style.scss";

import Logo from "../../Assets/logo.png";

import { Link } from "react-location";

const Nav = () => {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(localStorage.getItem("user") || localStorage.getItem("vinfo"))
  );

  return (
    <div className='nav_container'>
      <div className='nav_container__topbar'>
        <a href='/'>
          <img
            className='nav_container__logo'
            src={Logo}
            alt='haminepal logo'
          />
        </a>

        <button onClick={() => setIsActiveMenu(true)}>
          <i className='ri-menu-line'></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className='nav_container__landing__hiddenMenu'
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className='nav_container__landing__hiddenMenu__topbar'>
          <a href='/'>
            <img
              className='nav_container__landing__topbar__logo'
              src={Logo}
              alt='haminepal logo'
            />
          </a>

          <button onClick={() => setIsActiveMenu(false)}>
            <i className='ri-close-line'></i>
          </button>
        </div>
        <ul
          className='nav_container__landing__hiddenMenu__items left'
          style={{ marginBottom: 0, marginTop: "-1rem" }}
        >
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/news'>News</Link>
          </li>
          <li>
            <Link to='/act-of-kindness'>Act of Kindness</Link>
          </li>
          <li>
            <Link to='/civil-rights-movement'>Civil Right Movements</Link>
          </li>
          <li>
            <Link to='/contact'>Contact Us</Link>
          </li>
          <div className='divider'></div>
          <li>
            {isLoggedIn ? (
              <Link
                to='/'
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link to='/signup'>Signup /</Link>
                <Link to='/login'> Login</Link>
              </>
            )}
          </li>
        </ul>
        <ul className='nav_container__landing__hiddenMenu__items right'>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/causes'>Cause</Link>
          </li>
          <li>
            <Link to='/events'>Events</Link>
          </li>
          <li>
            <Link to='/transparency'>Transparency</Link>
          </li>
          <li>
            <Link to='/volunteer'>Volunteer</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
