import React from "react";
import "./style.scss";

import Logo from "../../Assets/logo.png";
import PropTypes from "prop-types";
import { Link } from "react-location";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Footer from "../../Components/Footer/Footer";
// import { useState, useEffect } from "react";
// import baseURL from "../../api/baseURL";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Causes() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='causes__container'>
      {/* @sectoin => topbar */}
      <div className='causes__container__topbar'>
        <img
          className='causes__container__logo'
          src={Logo}
          alt='haminepal logo'
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className='ri-menu-line'></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className='causes__container__landing__hiddenMenu'
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className='causes__container__landing__hiddenMenu__topbar'>
          <img
            className='causes__container__landing__topbar__logo'
            src={Logo}
            alt='haminepal logo'
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className='ri-close-line'></i>
          </button>
        </div>
        <ul className='causes__container__landing__hiddenMenu__items left'>
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
            <Link to='/contact'>Contact Us</Link>
          </li>
          <div className='divider'></div>
          <li>
            <Link to='/login'>Login/</Link> <Link to='/signup'>Signup</Link>
          </li>
        </ul>
        <ul className='causes__container__landing__hiddenMenu__items right'>
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

      {/* @section => landing */}
      <div className='causes__container__landing'>
        <h1>Giving Birthday treat to Panda</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>
      </div>
      {/* tabs-area-start */}
      <div className='causesTabs__container'>
        <Box sx={{ width: "25%" }}>
          <div className='causesTabs__meroTabs'>
            <Box sx={{ borderBottom: 2, borderColor: "#e74c3c" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab label='Fund Spent' />
                <Tab label='Fund Received' />
              </Tabs>
            </Box>
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
}
