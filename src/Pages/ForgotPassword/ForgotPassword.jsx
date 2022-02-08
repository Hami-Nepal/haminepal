import React from "react";
import "./forgotPassword.scss";
import NavSection from "../../Components/NavBar/Nav";
import Footer from "../../Components/Footer/Footer";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import baseURL from "../../api/baseURL";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [modalopen, setModalOpen] = React.useState(false);
  const handleSubmit = (e) => {
    setSending(true);
    e.preventDefault();
    axios({
      method: "POST",
      url: baseURL + "/volunteers/forgotPassword",
      data: {
        email: email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function ({ response }) {
        setError(response.data.message);
        setSending(false);
      });

    // setTimeout(() => {
    //   setSuccess(true);
    //   setModalOpen(true);
    //   setSending(false);
    //   setEmail("");
    // }, 3000);
  };
  return (
    <>
      <NavSection />
      <div className='forgot__password'>
        <h2>Forgot Password ?</h2>
        <div className='forgot__Password__container'>
          <span>
            Please Enter your email and we 'll send you the password reset link.
          </span>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {sending ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
        {success && (
          <Modal
            open={modalopen}
            onClose={() => setModalOpen(false)}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
          >
            <Box className='Modal__box'>
              <h2>Successful !!</h2>
              <p>
                A password change request link has been sent to {email}. Please
                click on link to reset your password.
              </p>
              <button
                className='btn__modal'
                onClick={() => setModalOpen(false)}
              >
                OK
              </button>
            </Box>
          </Modal>
        )}
        {error && <span className='forgot__password__error'>{error}</span>}
      </div>
      <Footer />
    </>
  );
}
