import React from 'react';
import './style.scss';

import Logo from '../../Assets/logo.png';

import { Link } from 'react-location';

import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Footer from '../../Components/Footer/Footer';

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

export default function EventFocused() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  return (
    <div className="eventFocused__container">
      {/* @sectoin => topbar */}
      <div className="eventFocused__container__topbar">
        <img
          className="eventFocused__container__logo"
          src={Logo}
          alt="haminepal logo"
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className="eventFocused__container__landing__hiddenMenu"
        style={{
          display: isActiveMenu ? 'flex' : 'none',
        }}
      >
        <div className="eventFocused__container__landing__hiddenMenu__topbar">
          <img
            className="eventFocused__container__landing__topbar__logo"
            src={Logo}
            alt="haminepal logo"
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="eventFocused__container__landing__hiddenMenu__items left">
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
        <ul className="eventFocused__container__landing__hiddenMenu__items right">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/causes">Causes</Link>
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
      <div className="eventFocused__container__landing">
        <div className="eventFocused__container__landing__info">
          <h1>Major Entitity</h1>
          <div className="divider"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            harum repellendus exercitationem maiores, dolorem vitae? Est quis ea
            aperiam, soluta inventore consequuntur. Maiores, magni natus omnis
            ratione quisquam quos rem.
          </p>

          <BorderLinearProgress variant="determinate" value={50} />

          <div>
            <span>$ 75,000</span> of $ 1,00,000
          </div>

          <Link to="/">Donate</Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1591189596309-8dcec8cb0493?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          alt="event"
        />
      </div>

      {/* @section => details */}
      <div className="eventFocused__container__details">
        <h1>Details</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero.
        </p>
      </div>

      {/* @section => challenges */}
      <div className="eventFocused__container__challenges">
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
      <div className="eventFocused__container__difficulties">
        <h1>Difficulties</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero.
        </p>
      </div>

      {/* @section => volunteers */}
      <div className="eventFocused__container__volunteers">
        <h1>Volunteers</h1>

        <div className="eventFocused__container__volunteers__items">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              className="eventFocused__container__volunteers__items__item"
              key={item}
            >
              <img
                src="https://avatars.githubusercontent.com/u/93448253?s=400&u=389a238cf991d86adcc03166270d30241e94a95b&v=4"
                alt="volunteer"
              />

              <div className="userInfo">
                <div className="name">Volunter Name</div>
                <div className="position">Some Info</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* @section => results */}
      <div className="eventFocused__container__results">
        <h1>Results</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis dicta eligendi odit, explicabo quidem repellat voluptate
          quam modi numquam officia assumenda quia. Tenetur ipsam delectus porro
          pariatur numquam vero.
        </p>
      </div>

      {/* @section => gallery */}
      <div className="eventFocused__container__gallery">
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
