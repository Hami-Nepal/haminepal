import * as React from "react"
import "./style.scss"

import Logo from "../../Assets/logo.png"

import { Link } from "react-location"

import Footer from "../../Components/Footer/Footer"
// import CivilRightTabs from "../../Components/CivilRightTabs"

export default function CivilRightsMovement() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false)

  return (
    <div className="civil_container">
      {/* @sectoin => topbar */}
      <div className="civil_container__topbar">
        <img
          className="civil_container__logo"
          src={Logo}
          alt="haminepal logo"
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="civil_container__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className="civil_container__landing__hiddenMenu__topbar">
          <img
            className="civil_container__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="civil_container__landing__hiddenMenu__items left">
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
        <ul className="civil_container__landing__hiddenMenu__items right">
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
            <Link to="/volunteer">Volunteer</Link>
          </li>
        </ul>
      </div>

      {/* @section => landing */}
      <div className="civil_container__landing">
        {/* <h1>Civil Rights Moment</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p> */}
      </div>
      <div
        style={{
          margin: "50px 1rem 50px 1rem",
        }}
      >
        <h1>Civil Rights Moment</h1>
        <p
          style={{
            textAlign: "justify",
            fontSize: "1.3rem",
            letterSpacing: "0.1rem",
            marginTop: "10px",
          }}
        >
          The civil rights movement was a struggle for social justice that took
          place mainly during the 1950s and 1960s for Black Americans to gain
          equal rights under the law in the United States. The Civil War had
          officially abolished slavery, but it didn’t end discrimination against
          Black people—they continued to endure the devastating effects of
          racism, especially in the South. By the mid-20th century, Black
          Americans had had more than enough of prejudice and violence against
          them. They, along with many white Americans, mobilized and began an
          unprecedented fight for equality that spanned two decades.
        </p>
      </div>

      {/* <CivilRightTabs /> */}

      <Footer />
    </div>
  )
}
