import React from 'react';
import './style.scss';

import Event from '../../Assets/event.jpg';
import { Button } from '@mui/material';

import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/Nav';

export default function CreateEvent() {
  return (
    <div className="createEvent__container">
      <NavBar />

      {/* @section => form */}
      <div className="createEvent__container__form">
        <h1>Create Event</h1>
        <div className="divider"></div>

        {/* @section => form container */}
        <div className="createEvent__container__form__inputs">
          <div className="createEvent__container__form__inputs__input left">
            <div>
              <input type="text" placeholder="Event Name" />
              <input type="text" placeholder="Event Type" />
            </div>

            <div>
              <input type="text" placeholder="Balance" />
              <input type="text" placeholder="Country" />
            </div>

            <div>
              <input type="text" placeholder="State" />
              <input type="text" placeholder="City" />
            </div>
            <div>
              <input type="text" placeholder="Street Address" />
            </div>
            <div>
              <textarea type="text" placeholder="Challenges"></textarea>
            </div>
            <div>
              <textarea type="text" placeholder="Difficulties"></textarea>
            </div>
            <div>
              <textarea type="text" placeholder="Description"></textarea>
            </div>
            <div>
              <textarea type="text" placeholder="Summary"></textarea>
            </div>

            <input type="file" multiple />

            <Button>Register</Button>
          </div>

          <div className="createEvent__container__form__inputs__input right">
            <img src={Event} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
