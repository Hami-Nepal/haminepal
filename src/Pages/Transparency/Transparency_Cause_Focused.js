import React from "react";
import "./style.scss";
// import { TransparencyDetailData as data } from "./TransparencyDetailData";

//Model

import Modal from "@mui/material/Modal";

import Logo from "../../Assets/logo.png";
import PropTypes from "prop-types";
import { Link } from "react-location";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import baseURL from "../../api/baseURL";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
};

export default function Causes() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  const [causeTitle, setCauseTitle] = useState("");
  const [causeDesc, setDesc] = useState("");
  const [data, setData] = useState([]);
  const [donations, setDonations] = useState([]);

  //model
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fundReceived, setFundReceived] = useState(false);

  const fundcardStyle = {
    borderRight: "3px solid #ececec",
    borderBottom: "3px solid #ececec",
  };

  useEffect(() => {
    fetch(baseURL + "/causes/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => {
        setCauseTitle(data.cause.name);
        setDesc(data.cause.description);
      })
      .catch(({ response }) => console.log(response));
  }, []);

  useEffect(() => {
    fetch(baseURL + `/transparency?cause_name=${causeTitle}`)
      .then((data) => data.json())
      .then(({ data }) => {
        setData(data);
        // console.log(slug);
      })
      .catch(({ response }) => console.log(response));
  }, [causeTitle]);

  useEffect(() => {
    fetch(
      baseURL +
        "/donations?category=cause&cause=" +
        window.location.pathname.split("/").pop()
    )
      .then((data) => data.json())
      .then(({ data }) => {
        setDonations(data);
        // console.log(slug);
      })
      .catch(({ response }) => console.log(response));
  }, []);

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
            <Link to='/news'>News</Link>
          </li>
          <li>
            <Link to='/'>Act of Kindness</Link>
          </li>
          <li>
            <Link to='/civil-rights-movement'>Civil Rights Movements</Link>
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
        <h1>{causeTitle}</h1>

        <p>{causeDesc}</p>
      </div>
      {/* tabs-area-start */}
      <div className='causesTabs__container'>
        <Box>
          <div className='causesTabs__meroTabs'>
            <Button
              className='btn__fund'
              onClick={() => setFundReceived(false)}
            >
              Fund Spent
            </Button>
            <Button className='btn__fund' onClick={() => setFundReceived(true)}>
              Fund Received
            </Button>
          </div>
        </Box>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <div
          className='tab-pane fade show active'
          id='pills-fundreceived'
          role='tabpanel'
          aria-labelledby='pills-fundreceived-tab'
        >
          <h6 className='fw-bold' style={{ color: "grey" }}>
            Latest History
          </h6>
          <br />
          {!fundReceived
            ? data.map((row) => {
                return (
                  <div
                    style={fundcardStyle}
                    key={row._id}
                    className='d-flex justify-content-between px-4 mb-3'
                  >
                    <div className='d-flex flex-column'>
                      <h6>
                        <b>{row.name}</b>
                      </h6>
                      <p>{row.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <h6 className='m-0' style={{ color: "green" }}>
                        <b>Rs. {row.amount}</b>
                      </h6>
                      <button class='btn mb1 b10' onClick={handleOpen}>
                        Bill
                      </button>
                    </div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'
                    >
                      <Box sx={style}>
                        <img src={row.photo} alt='bill photo' />
                      </Box>
                    </Modal>
                  </div>
                );
              })
            : donations.map((donation) => {
                return (
                  <div
                    style={fundcardStyle}
                    key={donation._id}
                    className='d-flex justify-content-between px-4 mb-3'
                  >
                    <div className='d-flex flex-column'>
                      <h6>
                        <b>
                          {donation.first_name} {donation.last_name}
                        </b>
                      </h6>
                      <p>{donation.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <h6 className='m-0' style={{ color: "green" }}>
                        <b>Rs. {donation.donation_amount}</b>
                      </h6>
                    </div>
                  </div>
                );
              })}
          <h6 className='fw-bold text-end my-2' style={{ color: "grey" }}>
            Show All
          </h6>
        </div>
      </div>
      <Footer />
    </div>
  );
}
