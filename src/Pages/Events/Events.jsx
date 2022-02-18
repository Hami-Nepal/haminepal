import React from "react";
import "./style.scss";

import { Link } from "react-location";

import Footer from "../../Components/Footer/Footer";
import EventTabs from "../../Components/EventsTabs/EventsTabs";
import NavBar from "../../Components/NavBar/Nav";
export default function Events() {
  const token = localStorage.getItem("vinfo") || localStorage.getItem("user");
  return (
    <div className='events__container'>
      <NavBar />

      {/* @section => landing */}
      <div className='events__container__landing'>
        <h1>Events</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>
        {token === null ? (
          <Link to='/login'>Signin to create Events around you</Link>
        ) : (
          <Link to='/new-event'>Create an Event</Link>
        )}
      </div>

      <EventTabs />

      <Footer />
    </div>
  );
}
