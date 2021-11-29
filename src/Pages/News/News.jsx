import React from "react"
import "./style.scss"

import Logo from "../../Assets/logo.png"

import { Link } from "react-location"

import Footer from "../../Components/Footer/Footer"
import NewsTabs from "../../Components/NewsTab/NewsTabs"
export default function News() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false)

  return (
    <div className="news">
      {/* @sectoin => topbar */}
      <div className="news__topbar">
        <img className="news__logo" src={Logo} alt="haminepal logo" />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="news__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className="news__landing__hiddenMenu__topbar">
          <img
            className="news__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="news__landing__hiddenMenu__items left">
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
            <Link to="/login">Login/</Link> <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <ul className="news__landing__hiddenMenu__items right">
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
            <Link to="/">Transparency</Link>
          </li>
          <li>
            <Link to="/our-work">ourWorks</Link>
          </li>
        </ul>
      </div>

      {/* @section=>Landing */}
      <div className="news__container_landing ">
        <h1>News</h1>
        <p>Hami Nepal News</p>
      </div>
      <h5 style={{ textAlign: "center", margin: "50px 0px 50px 0px" }}>
        Get all of our latest global human rights news, blogs and analysis,
        updated daily.
      </h5>

      {/* @section=>news cards */}
      <NewsTabs />

      <Footer />
    </div>
  )
}
