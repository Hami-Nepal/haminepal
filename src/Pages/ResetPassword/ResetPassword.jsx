import React from "react";
import "./resetpassword.scss";
import NavSection from "../../Components/NavBar/Nav";
import Footer from "../../Components/Footer/Footer";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import axios from "axios";
// import baseURL from "../../api/baseURL";

export default function ForgotPassword() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [modalopen, setModalOpen] = React.useState(false);
  const handleSubmit = (e) => {
    setSending(true);
    // e.preventDefault();
    // axios({
    //   method: "POST",
    //   url: baseURL + "/volunteers/forgotPassword",
    //   data: {
    //     email: email,
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function ({ response }) {
    //     setError(response.data.message);
    //     setSending(false);
    //   });

    // setTimeout(() => {
    //   setSuccess(true);
    //   setModalOpen(true);
    //   setSending(false);
    // }, 3000);
  };
  return (
    <>
      <NavSection />
      <div className='reset__password'>
        <h2>Reset Password</h2>
        <div className='reset__Password__container'>
          <span>Please enter your new Password</span>
          <input
            type='text'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='text'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {sending ? "Sending..." : "Reset"}
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
              <p>Password changed Successfully</p>
              <button
                className='btn__modal'
                onClick={() => setModalOpen(false)}
              >
                OK
              </button>
            </Box>
          </Modal>
        )}
        {error && <span className='reset__password__error'>{error}</span>}
      </div>
      <Footer />
    </>
  );
}
