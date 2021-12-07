import React, { useState, useEffect } from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import baseURL from "../../api/baseURL";

export default function BillCarousel() {
  const [data, setData] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [billPhoto, setBillPhoto] = useState([]);

  useEffect(() => {
    fetch(baseURL + "/events/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => {
        setEventTitle(data.name);
      })
      .catch(({ response }) => console.log(response));
  }, []);

  useEffect(() => {
    fetch(baseURL + `/transparency?event_name=${eventTitle}`)
      .then((data) => data.json())
      .then(({ data }) => {
        setData(data);
        // console.log(slug);
      })
      .catch(({ response }) => console.log(response));
  }, [eventTitle]);

  useEffect(() => {
    data.map((bill, index) => {
      setBillPhoto(bill.photos);
    });
  }, [data]);

  console.log(billPhoto);
  return (
    <div className='billCarousel__container'>
      <Carousel className='billCarousel__container__carourel'>
        {data &&
          billPhoto.map((photo, index) => (
            <div className='billCarousel__container__item' key={index}>
              <img src={photo} alt='bill' key={index} />;
            </div>
          ))}
      </Carousel>
    </div>
  );
}
