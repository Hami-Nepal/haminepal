<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> 9e9f722a07822ba77aeedb981941db166c6a814f

/**
 * @packages
 */
<<<<<<< HEAD
import { ReactLocation, Router } from "react-location";
import "antd/dist/antd.less";
import "remixicon/fonts/remixicon.css";

/** @pages */
import Home from "./Pages/Home/Home";
import Volunteer from "./Pages/Volunteer/Volunteer";
import NewVolunteer from "./Pages/NewVolunteer/NewVolunteer";
import VolunteerProfile from "./Pages/VolunteerProfile/VolunteerProfile";
import Causes from "./Pages/Causes/Causes";
import CauseFocused from "./Pages/CauseFocused/CauseFocused";
import Events from "./Pages/Events/Events";
import EventFocused from "./Pages/EventFocused/EventFocused";
import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import OurWork from "./Pages/OurWork/OurWork";
import ContactUs from "./Pages/ContactUs/ContactUs";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import AboutUs from "./Pages/AboutUs/AboutUs";
import News from "./Pages/News/News";
import Transparency from "./Pages/Transparency/Transparency";

=======
import { ReactLocation, Router } from 'react-location';
import 'antd/dist/antd.less';
import 'remixicon/fonts/remixicon.css';

/** @pages */

import Home from './Pages/Home/Home';
import Volunteer from './Pages/Volunteer/Volunteer';
import NewVolunteer from './Pages/NewVolunteer/NewVolunteer';
import VolunteerProfile from './Pages/VolunteerProfile/VolunteerProfile';
import Causes from './Pages/Causes/Causes';
import CauseFocused from './Pages/CauseFocused/CauseFocused';
import Events from './Pages/Events/Events';
import EventFocused from './Pages/EventFocused/EventFocused';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import OurWork from './Pages/OurWork/OurWork';
import ContactUs from './Pages/ContactUs/ContactUs';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import AboutUs from './Pages/AboutUs/AboutUs';
import News from './Pages/News/News';
import Transparency from './Pages/Transparency/Transparency';

>>>>>>> 9e9f722a07822ba77aeedb981941db166c6a814f
const location = new ReactLocation();

export default function App() {
  return (
    <>
      <Router
        location={location}
        routes={[
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/volunteer',
            element: <Volunteer />,
          },
          {
            path: '/new-volunteer',
            element: <NewVolunteer />,
          },
          {
            path: '/volunteer-profile/:id',
            element: <VolunteerProfile />,
          },
          {
            path: '/causes',
            element: <Causes />,
          },
          {
            path: '/cause-focused/:id',
            element: <CauseFocused />,
          },
          {
            path: '/events',
            element: <Events />,
          },
          {
            path: '/event-focused/:id',
            element: <EventFocused />,
          },
          {
            path: '/new-event',
            element: <CreateEvent />,
          },
          {
            path: '/our-work',
            element: <OurWork />,
          },
          {
            path: '/contact',
            element: <ContactUs />,
          },
          {
            path: '/signup',
            element: <SignUp />,
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/about',
            element: <AboutUs />,
          },
          {
<<<<<<< HEAD
            path: "/transparency",
            element: <Transparency />,
          },
          {
            path: "/news",
=======
            path: '/news',
>>>>>>> 9e9f722a07822ba77aeedb981941db166c6a814f
            element: <News />,
          },
          {
            path: '/transparency',
            element: <Transparency />,
          },
        ]}
      />
    </>
  );
}
