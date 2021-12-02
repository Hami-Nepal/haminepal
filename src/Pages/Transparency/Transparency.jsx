import React, { useState, useEffect } from 'react';
import './style.scss';

import Logo from '../../Assets/logo.png';
import { Link } from 'react-location';
import TransparencyEventTabs from '../../Components/TransparencyEventTabs/TransparencyEventTabs';
import TransparencyCausesTabs from '../../Components/TransparencyCausesTabs/TransparencyCausesTabs';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
import baseURL from '../../api/baseURL';
import image from '../../Assets/transparency.jpg';
import NavBar from '../../Components/NavBar/Nav';

export default function Transparency() {
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetch(baseURL + '/find/totalDonations')
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalDonations(data.length ? data[0].donation : 0)
      );

    fetch(baseURL + '/find/totalExpenses')
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalExpenses(data.length ? data[0].total_expenses : 0)
      );
  }, []);

  return (
    <div className="transparency__container">
      <Helmet>
        <title>Transparency | Hami Nepal</title>
      </Helmet>
      <NavBar />

      {/* @section => landing */}
      <div className="transparency__container__landing">
        <h1>
          People around the world are raising money for what they are passionate
          about.
        </h1>

        <ul>
          <li>
            <i className="ri-money-dollar-circle-line"></i>
            <h3>Total Fund Raised</h3>
            <p>{totalDonations}</p>
          </li>
          <li>
            <i className="ri-tools-line"></i>
            <h3>Total Expenses</h3>
            <p>{totalExpenses}</p>
          </li>
          <li>
            <i className="ri-coin-line"></i>
            <h3>Remaining Fund</h3>
            <p>{totalDonations - totalExpenses}</p>
          </li>
        </ul>
      </div>

      {/* @section => transparency content */}
      <div className="transparency__container__content">
        <div className="content">
          <h1>Transparency</h1>
          <div className="divider"></div>

          <p>
            Transparency, revealing the correct information about where your
            donation is going.
          </p>
        </div>
        <img src={image} alt="" />
      </div>

      {/* @section => event tabs */}
      <h1 className="tabs__title">Events</h1>
      <div className="tabs__divider"></div>
      <TransparencyEventTabs />

      {/* @section => causes tabs */}
      <h1 className="tabs__title">Causes</h1>
      <div className="tabs__divider"></div>
      <TransparencyCausesTabs />

      <Footer />
    </div>
  );
}
