import React from 'react';
import './style.scss';

import Alert from '@mui/material/Alert';
import Iframe from 'react-iframe';
import Footer from '../../Components/Footer/Footer';

import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import NavBar from '../../Components/NavBar/Nav';

// /**
//  * @dev add messanger chat bot
//  */
export default function ContactUs() {
  const [sucessMessage, setSucessMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm('');

  const serviceID = 'service_csaylw9';
  const templatedID = 'template_ylwv55j';
  const userID = 'user_rvYNwEQQRyZaCjPfjPCkG';

  const onSubmit = (data, r) => {
    setSending(true);
    setSucessMessage('');

    sendEmail(
      serviceID,
      templatedID,
      {
        name: data.name,
        email: data.email,
        description: data.description,
      },
      userID
    );
    r.target.reset();
  };

  const sendEmail = (serviceID, templatedID, variables, userID) => {
    console.log(variables);
    emailjs
      .send(serviceID, templatedID, variables, userID)
      .then(() => {
        setSucessMessage(
          <Alert severity="success" varient="filled" sx={{ fontSize: 18 }}>
            Thank you for contacting us...
          </Alert>
        );
        setSending(false);
        window.location.reload(false);
      })
      .catch((err) => alert(`Something Went Wrong`));
  };

  return (
    <div className="contactUs__container">
      <NavBar />

      {/* @section => form */}
      {/* Mail send Sucess Message */}
      <div className="contactUs__container__form">
        <div className="sucess-message">
          <h2>{sucessMessage}</h2>
        </div>
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
                aria-invalid={errors.name ? 'true' : 'false'}
                {...register('name', {
                  required: 'Please enter your name',
                  maxLength: {
                    value: 50,
                    message:
                      'Please enter a name with fewer than 50 characters',
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
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: 'invalid Email',
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
                aria-invalid={errors.description ? 'true' : 'false'}
                {...register('description', {
                  required: 'Write some message',
                })}
              ></textarea>
              <div className="error-message">
                {errors.description && errors.description.message}
              </div>

              <button className="btn-submit">
                {sending ? 'sending...' : 'Submit'}
              </button>
            </div>
          </form>

          <div className="contactUs__container__form__inputs__input right">
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56504.95209466454!2d85.29435527910155!3d27.730883699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e402e28da1%3A0xa5f874e6acdd4479!2sHami%20Nepal!5e0!3m2!1sen!2snp!4v1637297091696!5m2!1sen!2snp"
              width="100%"
              height="400px"
              className="maps"
              display="initial"
              position="relative"
            />
          </div>
        </div>
      </div>
      {/* Mail send Sucess Message */}
      <Footer />
    </div>
  );
}
