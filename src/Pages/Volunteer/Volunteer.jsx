import React, { useEffect } from "react";
import "./style.scss";

import { Link } from "react-location";

import VolunteerCard from "../../Components/VolunteerCard/VolunteerCard";
import Footer from "../../Components/Footer/Footer";

import baseURL from "../../api/baseURL";
import NavBar from "../../Components/NavBar/Nav";
import Donate from "../../Components/Donate/Donate";
import Modal from "@mui/material/Modal";

export default function Volunteer() {
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);
  const [volunteerName, setVolunteerName] = React.useState("");

  const [volunteers, setVolunteers] = React.useState([]);

  useEffect(() => {
    fetch(baseURL + "/volunteers?isVerified=true&limit=10000")
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
          Volunteering has been a part of our network since we were founded six
          years ago. To this day, voluntary service—helping others without
          desire for personal gain—remains one of our Fundamental Principles
          guiding everything we do. They are selfless, who works for the people.
        </div>
      </div>

      {/* @section => cards */}
      <div className='volunteer__container__cards'>
        {volunteers.map((volunteer) => (
          <VolunteerCard
            {...volunteer}
            key={volunteer._id}
            onClick={(e) => {
              e.preventDefault();
              setIsDonationFormOpen(true);
              setVolunteerName(
                volunteer.first_name + " " + volunteer.last_name
              );
            }}
          />
        ))}
      </div>

      {/** @dev this is dismissiable donation form */}
      <div
        style={{ display: isDonationFormOpen ? "block" : "none" }}
        className='home__container__landing__donationForm'
      >
        <Modal
          open={isDonationFormOpen}
          onClose={() => setIsDonationFormOpen(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{
            overflow: "scroll",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Donate
            setIsDonationFormOpen={setIsDonationFormOpen}
            donation_type={"Volunteer"}
            donation_name={"> " + volunteerName}
          />
        </Modal>
      </div>

      <Footer />
    </div>
  );
}
