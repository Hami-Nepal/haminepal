import React from "react";

/**
 * @packages
 */
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
import CivilRightsMovement from "./Pages/CivilRightsMoment/civilRightsMovement";
import ActOfKindness from "./Pages/ActOfKinadness/ActOfKindness";
import KindnessFocused from "./Pages/KindnessFocused/KindnessFocused";

import CivilRightsFocused from "./Pages/CivilRightsFocused/CivilRightsFocused";
import SuccessPage from "./Components/Donate/success";
import ErrorPage from "./Components/Donate/errror";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./Pages/ResetPassword/ResetPassword";
import CreateKindness from "./Pages/Create Kindness/CreateKindness";
// import Paypalpage from "./Components/Donate/PaypalPage";

const location = new ReactLocation();

export default function App() {
  return (
    <>
      <Router
        location={location}
        routes={[
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/volunteer",
            element: <Volunteer />,
          },
          {
            path: "/new-volunteer",
            element: <NewVolunteer />,
          },
          {
            path: "/volunteer-profile/:id",
            element: <VolunteerProfile />,
          },
          {
            path: "/causes",
            element: <Causes />,
          },
          {
            path: "/cause-focused/:id",
            element: <CauseFocused />,
          },
          {
            path: "/events",
            element: <Events />,
          },
          {
            path: "/event-focused/:id",
            element: <EventFocused />,
          },
          {
            path: "/new-event",
            element: <CreateEvent />,
          },
          {
            path: "/our-work",
            element: <OurWork />,
          },
          {
            path: "/contact",
            element: <ContactUs />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/about",
            element: <AboutUs />,
          },
          {
            path: "/news",
            element: <News />,
          },
          {
            path: "/transparency",
            element: <Transparency />,
          },
          {
            path: "/civil-rights-movement",
            element: <CivilRightsMovement />,
          },
          {
            path: "/act-of-kindness",
            element: <ActOfKindness />,
          },
          {
            path: "/kindness-focused/:id",
            element: <KindnessFocused />,
          },
          {
            path: "/civil-focused",
            element: <CivilRightsFocused />,
          },
          {
            path: "/donation/success",
            element: <SuccessPage />,
          },
          {
            path: "/donation/error",
            element: <ErrorPage />,
          },
          {
            path: "/forgotpassword",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/resetPassword/:token",
            element: <ResetPasswordPage />,
          },
          {
            path: "/create-kindness",
            element: <CreateKindness />,
          },
          // {
          //   path: "/donation/paypal",
          //   element: <Paypalpage />,
          // },
        ]}
      />
    </>
  );
}
