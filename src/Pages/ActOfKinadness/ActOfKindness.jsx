import React from "react"

import "./style.scss"

import Nav from "../../Components/NavBar/Nav"
import Footer from "../../Components/Footer/Footer"
import KindnessCardPage from "../../Components/KindnessCard/KindnessCardPage"

const ActOfKindness = () => {
  return (
    <>
      <Nav />
      <div className="kindness_container">
        <div className="kindness_container__landing">
          <div className="slogan">
            <p>CHANGING THE WORLD ONE RANDOM ACT OF KINDNESS AT A TIME</p>
          </div>
        </div>
      </div>
      <KindnessCardPage />
      <Footer />
    </>
  )
}
export default ActOfKindness
