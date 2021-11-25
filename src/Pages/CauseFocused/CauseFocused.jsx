import React, { useState, useEffect } from 'react';
import './style.scss';

import Logo from '../../Assets/logo.png';

import { Link } from 'react-location';

import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Footer from '../../Components/Footer/Footer';
import baseURL from '../../api/baseURL';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#23CE34' : '#308fe8',
  },
}));

export default function CauseFocused() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(baseURL + '/causes/' + window.location.pathname.split('/').pop())
      .then((data) => data.json())
      .then(({ data }) => setData(data.cause))
      .catch(({ response }) => console.log(response));

    // specific cause or events ko ako total amount herna ko lagi jugad
    fetch(baseURL + '/donations/?slug=vernon-mckee')
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []);

  console.log(data);

  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  return (
    <div className="causeFocused__container">
      {/* @sectoin => topbar */}
      <div className="causeFocused__container__topbar">
        <img
          className="causeFocused__container__logo"
          src={Logo}
          alt="haminepal logo"
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="causeFocused__container__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? 'flex' : 'none',
        }}
      >
        <div className="causeFocused__container__landing__hiddenMenu__topbar">
          <img
            className="causeFocused__container__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="causeFocused__container__landing__hiddenMenu__items left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">News</Link>
          </li>
          <li>
            <Link to="/">Act of Kindness</Link>
          </li>
          <li>
            <Link to="/">Civil Rights Movements</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to="/login">Login/</Link> <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <ul className="causeFocused__container__landing__hiddenMenu__items right">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/causes">Cause</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/transparency">Transparency</Link>
          </li>
          <li>
            <Link to="/volunteer">Volunteer</Link>
          </li>
        </ul>
      </div>

      {/* @section => landing */}
      <div className="causeFocused__container__landing">
        <div className="causeFocused__container__landing__info">
          <h1>{data.name}</h1>
          <div className="divider"></div>
          <p>{data.summary}</p>

          <BorderLinearProgress variant="determinate" value={50} />

          <div>
            <span>Rs. 75,000</span> of Rs.{data.balance}
          </div>

          <Link to="/">Donate</Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1591189596309-8dcec8cb0493?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          alt="cause"
        />
      </div>

      {/* @section => details */}
      <div className="causeFocused__container__details">
        <h1>Details</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero.
        </p>
      </div>

      {/* @section => challenges */}
      <div className="causeFocused__container__challenges">
        <h1>Challenges</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Animi perferendis dicta eligendi odit, explicabo
          quidem repellat voluptate quam modi numquam officia assumenda quia.
          Tenetur ipsam delectus porro pariatur numquam vero.
        </p>
      </div>
      {/* @section => difficulties */}
      <div className="causeFocused__container__difficulties">
        <h1>Difficulties</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero.
        </p>
      </div>

      {/* @section => volunteers */}
      <div className="causeFocused__container__volunteers">
        <h1>Volunteers</h1>

        <div className="causeFocused__container__volunteers__items">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              className="causeFocused__container__volunteers__items__item"
              key={item}
            >
              <img
                src="https://avatars.githubusercontent.com/u/93444253?s=400&u=389a238cf991d86adcc03166270d30241e94a95b&v=4"
                alt="volunteer"
              />

              <div className="userInfo">
                <div className="name">Deekshya Shahi</div>
                <div className="position">Moto Vlogger</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* @section => results */}
      <div className="causeFocused__container__results">
        <h1>Results</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero.
        </p>
      </div>

      {/* @section => gallery */}
      <div className="causeFocused__container__gallery">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <img
            key={item}
            src="https://images.unsplash.com/photo-1510743006598-4845616e044f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
            alt=""
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
