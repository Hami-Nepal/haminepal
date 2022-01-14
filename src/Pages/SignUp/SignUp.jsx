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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const [successful, setSuccessful] = useState("");
  const [modalopen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const matchPassword = () => {
    if (!firstName) {
      setError("Please Enter your First Name");
      return false;
    }
    if (!lastName) {
      setError("Please Enter your Last Name");
      return false;
    }
    if (!email || !isEmail(email)) {
      setError("Please Enter a valid Email");
      return false;
    }
    if (!password) {
      setError("Please Enter Password ");
      return false;
    }
    if (password !== confrimPassword) {
      setError("Passwords did not match!!");
      return false;
    }
    return true;
  };

  const register = (e) => {
    e.preventDefault();
    setSending(true);

    if (matchPassword()) {
      setError("");
      axios
        .post(baseURL + "/users/signup", {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        })
        .then((response) => {
          //handle success
          setSuccessful(response.data.msg);
          setModalOpen(true);
          setSending(false);
          setFirstName("");
          setLastName("");
          setPassword("");
          setConfrimPassword("");
          setEmail("");
        })
        .catch((err) => {
          //handle error
          // console.log(err.response);
          setError(err.response.data.msg);
          setSending(false);
        });
    } else {
      setSending(false);
    }
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
          <div className='signup__container__form__inputs__input left'>
            <div>
              <input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type='text'
                placeholder='Last Name'
                value={lastName}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className='full'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                className='full'
                type='password'
                placeholder='Confirm Password'
                value={confrimPassword}
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
            {successful !== "" && (
              <Modal
                open={modalopen}
                onClose={() => setModalOpen(false)}
                aria-labelledby='child-modal-title'
                aria-describedby='child-modal-description'
              >
                <Box className='Modal__box'>
                  <h2>Successfull!!</h2>
                  <div className='alert alert-success' role='alert'>
                    <span>{successful}</span>
                  </div>
                  <button
                    className='btn__modal'
                    onClick={() => setModalOpen(false)}
                  >
                    OK
                  </button>
                </Box>
              </Modal>
            )}
          </div>
          <div className='signup__container__form__inputs__input right'>
            <img src={RegisterPicture} alt='banner' />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
