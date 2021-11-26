import React, { useEffect } from "react"
import "./style.scss"

import Logo from "../../Assets/logo.png"

import { Link } from "react-location"

import VolunteerCard from "../../Components/VolunteerCard/VolunteerCard"
import Footer from "../../Components/Footer/Footer"

import baseURL from "../../api/baseURL"

export default function Volunteer() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false)
  const [volunteers, setVolunteers] = React.useState([])

  useEffect(() => {
    fetch(baseURL + "/volunteers?isVerified=true")
      .then((data) => data.json())
      .then(({ data }) => setVolunteers(data))
      .catch((err) => console.log(err, "\n", err.response))
  }, [])

  return (
    <div className="volunteer__container">
      {/* @sectoin => topbar */}
      <div className="volunteer__container__topbar">
        <img
          className="volunteer__container__logo"
          src={Logo}
          alt="haminepal logo"
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="volunteer__container__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className="volunteer__container__landing__hiddenMenu__topbar">
          <img
            className="volunteer__container__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="volunteer__container__landing__hiddenMenu__items left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">News</Link>
          </li>
          <li>
            <Link to="/">Act of Kindness</Link>
          </li>
          <li>
            <Link to="/">Civil Rights Movements</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to="/login">Login/</Link> <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <ul className="volunteer__container__landing__hiddenMenu__items right">
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

      {/* @section => landing */}
      <div className="volunteer__container__landing">
        <h1>Volunteer</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>

        <Link to="/new-volunteer">Be a Volunteer</Link>
      </div>

      {/* @section => definition */}
      <div className="volunteer__container__definition">
        <h1 className="volunteer__container__definition__title">
          Our Volunteer
        </h1>
        <div className="volunteer__container__definition__content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
          architecto suscipit libero blanditiis sequi vitae nemo fuga, tempore
          voluptas aperiam modi obcaecati, voluptates dignissimos voluptatem
          dolores et sunt magni ipsa!
        </div>
      </div>

      {/* @section => cards */}
      <div className="volunteer__container__cards">
        {volunteers.map((volunteer) => (
          <VolunteerCard {...volunteer} key={volunteer._id} />
        ))}
      </div>

      <Footer />

      <h4>
        Made with ❤️ in <Link>Hash Technologies</Link>
      </h4>
    </div>
  )
}
