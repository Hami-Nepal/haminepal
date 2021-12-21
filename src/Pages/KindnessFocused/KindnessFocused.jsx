import React, { useState, useEffect } from 'react';
import './style.scss';

import Nav from '../../Components/NavBar/Nav';

import Footer from '../../Components/Footer/Footer';
import baseURL from '../../api/baseURL';

export default function KindnessFocused() {
  const [data, setData] = useState({});

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    fetch(baseURL + '/kindness/' + window.location.pathname.split('/').pop())
      .then((data) => data.json())
      .then(({ data }) => setData(data))
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
      {/* <div className="kindnessFocused__container__volunteers">
        <h1>Volunteers</h1>
        <div className="kindnessFocused__container__volunteers__items">
          {data.volunteers?.map((url) => (
            <div
              className="kindnessFocused__container__volunteers__items__item"
              key={url}
            >
              <img src={url} alt="volunteer" />
              <div className="userInfo">
                <div className="name">Deekshya Shahi</div>
                <div className="position">Moto Vlogger</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

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
