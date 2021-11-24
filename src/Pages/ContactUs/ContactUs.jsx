import React from "react"
import "./style.scss"
import { useEffect } from "react"
import Logo from "../../Assets/logo.png"

import { Link } from "react-location"
import Iframe from "react-iframe"
import Footer from "../../Components/Footer/Footer"

import emailjs from "emailjs-com"
import { useForm } from "react-hook-form"

// /**
//  * @dev add messanger chat bot
//  */
export default function ContactUs() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false)
  const [sucessMessage, setSucessMessage] = React.useState("")
  const[sending,setSending]=React.useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSucessMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [sucessMessage]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const serviceID = "service_csaylw9"
  const templatedID = "template_ylwv55j"
  const userID = "user_rvYNwEQQRyZaCjPfjPCkG"

  const onSubmit = (data, r) => {
    setSending(true)
    sendEmail(
      serviceID,
      templatedID,
      {
        name: data.name,
        email: data.email,
        description: data.description,
      },
      userID
    )
    r.target.reset()
  }

  const sendEmail = (serviceID, templatedID, variables, userID) => {
    emailjs
      .send(serviceID, templatedID, variables, userID)
      .then(() => {
        
        setSucessMessage("Thank your for contacting us!!")
        setSending(false)
        window.setTimeout(function(){location.reload()},4000)
      })
      .catch((err) => alert(`Something Went Wrong`))
  }

  return (
    <div className="contactUs__container">
      {/* @sectoin => topbar */}
      <div className="contactUs__container__topbar">
        <img
          className="contactUs__container__logo"
          src={Logo}
          alt="haminepal logo"
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="contactUs__container__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className="contactUs__container__landing__hiddenMenu__topbar">
          <img
            className="contactUs__container__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="contactUs__container__landing__hiddenMenu__items left">
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
            <Link to="/login">Login/</Link> <Link to="/Signup">Signup</Link>
          </li>
        </ul>
        <ul className="contactUs__container__landing__hiddenMenu__items right">
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

      {/* @section => form */}
      <div className="contactUs__container__form">
        <h1>Contact Us</h1>
        <div className="divider"></div>

        {/* @section => form container */}
        <div className="contactUs__container__form__inputs">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contactUs__container__form__inputs__input left">
              <input
                autoFocus
                placeholder="Full Name"
                id="name"
                type="text"
                name="name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name", {
                  required: "Please enter your name",
                  maxLength: {
                    value: 50,
                    message:
                      "Please enter a name with fewer than 50 characters",
                  },
                })}
              />
              <div className="error-message">
                {errors.name && errors.name.message}
              </div>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                name="email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: "invalid Email",
                  },
                })}
              />
              <div className="error-message">
                {errors.email && errors.email.message}
              </div>
              <textarea
                name="description"
                placeholder="Message"
                id="description"
                cols="30"
                rows="10"
                aria-invalid={errors.description ? "true" : "false"}
                {...register("description", {
                  required: "Write some message",
                })}
              ></textarea>
              <div className="error-message">
                {errors.description && errors.description.message}
              </div>

              <button className="btn-submit" >{sending?"sending...":"Submit"}</button>
            </div>
          </form>

          <div className="contactUs__container__form__inputs__input right">
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56504.95209466454!2d85.29435527910155!3d27.730883699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e402e28da1%3A0xa5f874e6acdd4479!2sHami%20Nepal!5e0!3m2!1sen!2snp!4v1637297091696!5m2!1sen!2snp"
              width="100%"
              height="450px"
              className="maps"
              display="initial"
              position="relative"
            />
          </div>
        </div>
      </div>
            {/* Mail send Sucess Message */}
            <div className="sucess-message">{sucessMessage}</div>
      <Footer />
    </div>
  )
}
