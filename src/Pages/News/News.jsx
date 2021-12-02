import React from "react"
import "./style.scss"

import Footer from "../../Components/Footer/Footer"
import NewsTabs from "../../Components/NewsTab/NewsTabs"

import Nav from "../../Components/NavBar/Nav"

export default function News() {
  return (
    <div className="news">
      <Nav />
      {/* @section=>Landing */}
      <div className="news__container_landing ">
        <h1>News</h1>
        <p>Hami Nepal News</p>
      </div>
      <h5 style={{ textAlign: "center", margin: "50px 0px 50px 0px" }}>
        Get all of our latest news, blogs and analysis, updated daily.
      </h5>

      {/* @section=>news cards */}
      <NewsTabs />

      <Footer />
    </div>
  )
}
