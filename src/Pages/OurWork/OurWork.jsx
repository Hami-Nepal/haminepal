import React from 'react';
import './style.scss';

import Footer from '../../Components/Footer/Footer';
import OurWorkTabs from '../../Components/OurWorkTabs/OurWorkTabs';
import NavBar from '../../Components/NavBar/Nav';

export default function OurWork() {
  return (
    <div className="ourWork__container">
      <NavBar />

      {/* @section => landing */}
      <div className="ourWork__container__landing">
        <h1>Our Works</h1>
        <p>
          Pulling up the roots of poverty and planting the seeds of
          change.Building relationships.Earning the right to be heard.Planning
          and working alongside local leaders.Findind the solutions to change
          the future of kids and the next generation. Here's just some of what
          we accomplished together.
        </p>
      </div>

      <OurWorkTabs />

      <Footer />
    </div>
  );
}
