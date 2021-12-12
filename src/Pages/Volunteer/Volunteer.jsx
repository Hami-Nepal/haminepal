import React, { useEffect } from "react";
import "./style.scss";

import { Link } from "react-location";

import VolunteerCard from "../../Components/VolunteerCard/VolunteerCard";
import Footer from "../../Components/Footer/Footer";

import baseURL from "../../api/baseURL";
import NavBar from "../../Components/NavBar/Nav";

export default function Volunteer() {
  const [volunteers, setVolunteers] = React.useState([]);

  useEffect(() => {
    fetch(baseURL + "/volunteers?isVerified=true")
      .then((data) => data.json())
      .then(({ data }) => setVolunteers(data))
      .catch((err) => console.log(err, "\n", err.response));
  }, []);

  return (
    <div className='volunteer__container'>
      <NavBar />

      {/* @section => landing */}
      <div className='volunteer__container__landing'>
        <h1>Volunteer</h1>

        <p>
          Life's Most Persistent And Urgent Question Is, What Are You Doing For
          Others?
        </p>

        <Link to='/new-volunteer'>Be a Volunteer</Link>
      </div>

      {/* @section => definition */}
      <div className='volunteer__container__definition'>
        <h1 className='volunteer__container__definition__title'>
          Our Volunteer
        </h1>
        <div className='volunteer__container__definition__content'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
          architecto suscipit libero blanditiis sequi vitae nemo fuga, tempore
          voluptas aperiam modi obcaecati, voluptates dignissimos voluptatem
          dolores et sunt magni ipsa!
        </div>
      </div>

      {/* @section => cards */}
      <div className='volunteer__container__cards'>
        {volunteers.map((volunteer) => (
          <VolunteerCard {...volunteer} key={volunteer._id} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
