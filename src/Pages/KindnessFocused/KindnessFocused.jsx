import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';

import Nav from '../../Components/NavBar/Nav';

import Footer from '../../Components/Footer/Footer';
import baseURL from '../../api/baseURL';

export default function KindnessFocused() {
  const [data, setData] = useState({});
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    fetch(baseURL + '/kindness/' + window.location.pathname.split('/').pop())
      .then((data) => data.json())
      .then(async ({ data }) => {
        setData(data);

        const trueVolunteers = data.volunteers.filter(
          ({ participated }) => participated
        );

        const promises = trueVolunteers.map(({ volunteerId }) =>
          axios.get(baseURL + '/volunteers/' + volunteerId)
        );

        const res = await Promise.all(promises);
        setVolunteers(res.map((obj) => obj.data.data.volunteer));
      })
      .catch(({ response }) => console.log(response));
  }, []);

  return (
    <div className="kindnessFocused__container">
      <Nav />
      <div className="kindness_hero">
        <h1>{data.title}</h1>
      </div>
      {/* @section => landing */}
      <div className="kindnessFocused__container__landing">
        <div className="kindnessFocused__container__landing__info">
          <h1>{data.title}</h1>

          <p>{data.summary}</p>
        </div>

        <img
          src={data?.photos?.length ? data.photos[0] : ''}
          alt="kindness cover"
        />
      </div>

      {/* @section => details */}
      <div className="kindnessFocused__container__details">
        <h2>Description</h2>
        <p>{data.details}</p>
      </div>

      {/* @section => challenges */}
      <div className="kindnessFocused__container__challenges">
        <h2>Challenges</h2>
        <p>{data.challenges}</p>
      </div>

      {/* @section => results */}
      <div className="kindnessFocused__container__results">
        <h2>Results</h2>
        <p>{data.results}</p>
      </div>

      {/* @section => volunteers */}
      <div className="kindnessFocused__container__volunteers">
        <h1>Volunteers</h1>
        <div className="kindnessFocused__container__volunteers__items">
          {volunteers.map((data) => (
            <div
              className="kindnessFocused__container__volunteers__items__item"
              key={data._id}
            >
              <img src={data.photo} alt="volunteer" />
              <div className="userInfo">
                <div className="name">
                  {data.first_name} {data.last_name}
                </div>
                <div className="position">{data.field_of_expertise}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* @section => gallery */}
      <div className="kindnessFocused__container__gallery">
        {data.photos?.map((url) => (
          <img key={url} src={url} alt="" />
        ))}
      </div>

      <Footer />
    </div>
  );
}
