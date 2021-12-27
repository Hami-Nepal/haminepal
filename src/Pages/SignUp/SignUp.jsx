import React, { useState } from "react";
import { Link } from "react-location";
import "./style.scss";
import { Button } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { isEmail } from "validator";
import baseURL from "../../api/baseURL";
import NavBar from "../../Components/NavBar/Nav";
import RegisterPicture from "../../Assets/register.png";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const register = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessful(false);

    // const formData = new FormData();
    // formData.append("firstname", firstName);
    // formData.append("lastname", lastName);
    // formData.append("email", email);
    // formData.append("password", password);

    axios
      .post(baseURL + "/users/signup", {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        //handle success
        alert("Registered successfully");
        setSending(false);
        setSuccessful(true);
      })
      .catch((err) => {
        //handle error
        // console.log(err.response);
        setError(err.response.data.msg);
        setSending(false);
      });
  };

  return (
    <div className='signup__container'>
      <NavBar />

      {/* @section => form */}
      <div className='signup__container__form'>
        <h1>User Signup</h1>
        <div className='divider'></div>

        {/* @section => form container */}
        <div className='signup__container__form__inputs'>
          {!successful && (
            <div className='signup__container__form__inputs__input left'>
              <div>
                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  autoFocus
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  className='full'
                  type='email'
                  placeholder='Email Address'
                  value={email}
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!isEmail(email)) {
                      setError("Please enter valid email");
                    } else {
                      setError("");
                    }
                  }}
                />
              </div>
              <div>
                <input
                  className='full'
                  type='password'
                  placeholder='Password'
                  value={password}
                  autoFocus
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  className='full'
                  type='password'
                  placeholder='Confirm Password'
                  value={confrimPassword}
                  autoFocus
                  onChange={(e) => {
                    setConfrimPassword(e.target.value);
                  }}
                />
              </div>
              <Button onClick={register}>
                {sending ? "Sending..." : "Register"}
              </Button>{" "}
              <Link to='/new-volunteer'>
                <h6>Or Signup as a Volunteer?</h6>
              </Link>
              {error && (
                <div className='form-group'>
                  <div
                    className='alert alert-danger'
                    role='alert'
                    style={{ color: "red", marginTop: "20px" }}
                  >
                    {error}
                  </div>
                </div>
              )}
              {successful && (
                <div className='form-group'>
                  <div
                    className='alert alert-success'
                    role='alert'
                    style={{ color: "green" }}
                  >
                    <span>Successfully resgitered</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className='signup__container__form__inputs__input right'>
            <img src={RegisterPicture} alt='banner' />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
