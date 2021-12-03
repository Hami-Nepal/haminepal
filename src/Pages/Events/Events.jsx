import React from 'react';
import './style.scss';

import { Link } from 'react-location';

import Footer from '../../Components/Footer/Footer';
import EventTabs from '../../Components/EventsTabs/EventsTabs';
import NavBar from '../../Components/NavBar/Nav';

export default function Events() {
  return (
    <div className="events__container">
      <NavBar />

      {/* @section => landing */}
      <div className="events__container__landing">
        <h1>Events</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>

        <Link to="/new-event">Create a Event</Link>
      </div>

      <EventTabs />

      <Footer />
    </div>
  );
}
