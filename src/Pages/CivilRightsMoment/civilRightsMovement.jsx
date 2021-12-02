import * as React from 'react';
import './style.scss';

import Footer from '../../Components/Footer/Footer';
import CivilRightTabs from '../../Components/CivilRightTabs';
import NavBar from '../../Components/NavBar/Nav';

export default function CivilRightsMovement() {
  return (
    <div className="civil_container">
      <NavBar />

      {/* @section => landing */}
      <div className="civil_container__landing">
        <h1>Civil Rights Moment</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>
      </div>

      <CivilRightTabs />

      <Footer />
    </div>
  );
}
