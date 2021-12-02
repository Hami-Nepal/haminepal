import * as React from "react"
import "./style.scss"

import Logo from "../../Assets/logo.png"

import Nav from "../../Components/NavBar/Nav"
import Footer from "../../Components/Footer/Footer"
import CivilRightTabs from "../../Components/CivilRightTabs"

export default function CivilRightsMovement() {
  return (
    <div className="civil_container">
      {/* @sectoin => topbar */}
      <Nav />

      {/* @section => landing */}
      <div className="civil_container__landing">
        <h1>Civil Rights Moment</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>
      </div>

      <CivilRightTabs />

      <Footer />
    </div>
  )
}
