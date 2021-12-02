import React from 'react';
import './style.scss';

import CausesTabs from '../../Components/CausesTabs/CausesTabs';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/Nav';

export default function Causes() {
  return (
    <div className="causes__container">
      <NavBar />

      {/* @section => landing */}
      <div className="causes__container__landing">
        <h1>Cause</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>
      </div>

      <CausesTabs />

      <Footer />
    </div>
  );
}
