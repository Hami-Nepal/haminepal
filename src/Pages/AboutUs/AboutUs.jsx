import React from 'react';
import './style.scss';

import AboutUsTabs from '../../Components/AboutUsTabs/AboutUsTabs';

import Footer from '../../Components/Footer/Footer';

import NavBar from '../../Components/NavBar/Nav';

export default function AboutUs() {
  return (
    <div className="aboutUs__container">
      <NavBar />

      {/* @section => landing */}
      <div className="aboutUs__container__landing">
        <h1>About Us</h1>

        <p>
          Hami Nepal has been connecting hundreds of volunteers to local
          communities all over the world since its first initiation in 2015. The
          emergency response program and the post-earthquake rehabilitation
          programs were the initial programs successfully carried out by Hami
          Nepal.
        </p>
      </div>

      <AboutUsTabs />

      <Footer />
    </div>
  );
}
