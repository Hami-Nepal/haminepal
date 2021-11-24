import React from "react"
import "./style.scss"

import Logo from "../../Assets/logo.png"

import { Link } from "react-location"

import Footer from "../../Components/Footer/Footer"
import NewsTabs from "../../Components/NewsTab/NewsTabs"
export default function News() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false)
  const [news, setNews] = React.useState([])
  console.log(news)

  React.useEffect(() => {
    fetch("https://api.haminepal.org/api/v1/news")
      .then((data) => data.json())
      .then((data) => setNews(data.data))
      .catch((err) => console.log(err, "\n", err.response))
  }, [])

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
            <Link to="/">News</Link>
          </li>
          <li>
            <Link to="/">Act of Kindness</Link>
          </li>
          <li>
            <Link to="/">Civil Rights Movements</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to="/">Login/</Link> <Link to="/">Signup</Link>
          </li>
        </ul>
        <ul className="news__landing__hiddenMenu__items right">
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Cause</Link>
          </li>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/">Transparency</Link>
          </li>
          <li>
            <Link to="/">ourWorks</Link>
          </li>
        </ul>
      </div>

      {/* @section=>Landing */}
      <div className="news__container_landing ">
        <h1>News</h1>
        <p>Hami Nepal News</p>
      </div>

      {/* @section=>news cards */}
      <div className="news_container_cards">
        {news.map((news) => (
          <NewsTabs news={news} key={news._id} />
        ))}
      </div>

      <Footer />
    </div>
  )
}
