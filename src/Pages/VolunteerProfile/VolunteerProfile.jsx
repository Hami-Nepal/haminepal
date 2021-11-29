import React, { useEffect, useState } from "react";

import "./style.scss";

import Logo from "../../Assets/logo.png";

import { Link } from "react-location";
import Footer from "../../Components/Footer/Footer";
import { Button } from "@mui/material";
import baseURL from "../../api/baseURL";
import Switch from "@mui/material/Switch";
import axios from "axios";

export default function VolunteerProfile(props) {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  const [volunteer, setVolunteer] = useState({});

  const setActive = async () => {
    // const { data } = await axios.put(
    //   baseURL + "/volunteers/" + window.location.pathname.split("/").pop()
    // , {isActive: !volunteer.isActive}, {});
  };

  useEffect(() => {
    fetch(baseURL + "/volunteers/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => setVolunteer(data.volunteer))
      .catch(({ response }) => console.log(response));
  }, []);

  return (
    <div className='volunteerProfile__container'>
      <div className='volunteerProfile__container__blob'></div>

      {/* @sectoin => topbar */}
      <div className='volunteerProfile__container__topbar'>
        <img
          className='volunteerProfile__container__logo'
          src={Logo}
          alt='haminepal logo'
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <i className='ri-menu-line'></i>
        </button>
      </div>

      {/* @section => hidden menu */}
      <div
        className='volunteerProfile__container__landing__hiddenMenu'
        style={{
          display: isActiveMenu ? "flex" : "none",
        }}
      >
        <div className='volunteerProfile__container__landing__hiddenMenu__topbar'>
          <img
            className='volunteerProfile__container__landing__topbar__logo'
            src={Logo}
            alt='haminepal logo'
          />

          <button onClick={() => setIsActiveMenu(false)}>
            <i className='ri-close-line'></i>
          </button>
        </div>
        <ul className='volunteerProfile__container__landing__hiddenMenu__items left'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/'>News</Link>
          </li>
          <li>
            <Link to='/'>Act of Kindness</Link>
          </li>
          <li>
            <Link to='/'>Civil Rights Movements</Link>
          </li>
          <li>
            <Link to='/contact'>Contact Us</Link>
          </li>
          <div className='divider'></div>
          <li>
            <Link to='/login'>Login/</Link> <Link to='/signup'>Signup</Link>
          </li>
        </ul>
        <ul className='volunteerProfile__container__landing__hiddenMenu__items right'>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/causes'>Cause</Link>
          </li>
          <li>
            <Link to='/events'>Events</Link>
          </li>
          <li>
            <Link to='/transparency'>Transparency</Link>
          </li>
          <li>
            <Link to='/volunteer'>Volunteers</Link>
          </li>
        </ul>
      </div>

      {/* @section => main content */}
      <div className='volunteerProfile__container__main'>
        <div className='volunteerProfile__container__main__userimage'>
          <img src={volunteer.photo} alt='' />
          <div className='name'>
            {volunteer.first_name} {volunteer.last_name}
          </div>
          <div className='position'>{volunteer.field_of_expertise}</div>
          <Switch checked={volunteer.isActive} onClick={setActive} />{" "}
        </div>
        <div className='volunteerProfile__container__main__userinfo'>
          <div>
            <h4>Phone Number</h4>
            <p>{volunteer.phone}</p>

            <h4>Email Address</h4>
            <p>{volunteer.email}</p>

            <h4>City</h4>
            <p>{volunteer.city}</p>

            <h4>Street Address</h4>
            <p>{volunteer.street_address}</p>

            <h4>Age</h4>
            <p>{volunteer.age}</p>

            <h4>Country</h4>
            <p>{volunteer.country}</p>
          </div>

          <div>
            <h4>Blood group</h4>
            <p>{volunteer.bloodGroup}</p>

            <h4>Motivation</h4>
            <p>{volunteer.motivation}</p>

            <h4>Bio</h4>
            <p>{volunteer.bio}</p>

            <h4>Number of Projects Involved</h4>
            <p>
              {volunteer.event_involvement?.length +
                volunteer.cause_involvement?.length}
            </p>
          </div>
        </div>
      </div>

      {/* @Section => worked projects   */}
      <div className='volunteerProfile__container__workedProjects'>
        <h1>Projects worked on</h1>

        <div className='volunteerProfile__container__workedProjects__items'>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className='item' key={item}>
              <img
                src='https://images.unsplash.com/photo-1617817546276-80b86dd60151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                className='item__image'
                alt='project'
              />
              <div className='item__info'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptate itaque dignissimos provident earum porro eius nesciunt
                dolores quo laudantium! Facere quod consectetur debitis hic
                dignissimos molestiae accusamus quos ipsa magni.
              </div>
              <Button>Donate</Button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
