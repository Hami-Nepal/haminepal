import React from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";

import Box from "@mui/material/Box";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import baseURL from "../../api/baseURL";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Causes() {
  //pagination
  const [transPage, setTransPage] = React.useState(1);
  const [donPage, setDonPage] = React.useState(1);
  const handleTransChange = (event, value) => {
    setTransPage(value);
  };
  const handleDonChange = (event, value) => {
    setDonPage(value);
  };
  const [eventTitle, setEventTitle] = useState("");
  const [kData, setKData] = useState([]);
  const [kDonations, setKDonations] = useState([]);
  const [kTCount, setKTCount] = useState();
  const [kDCount, setKDCount] = useState();

  const [kFundReceived, setKFundReceived] = useState(false);
  const [modalPhoto, setModalPhoto] = useState([]);
  const [modalKindPhoto, setModalKindPhoto] = useState([]);

  const fundcardStyle = {
    borderRight: "3px solid #ececec",
    borderBottom: "3px solid #ececec",
  };

  useEffect(() => {
    fetch(baseURL + "/events/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => {
        setEventTitle(data.name);
      })
      .catch(({ response }) => console.log(response));
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/kindtransparency?event_name=${eventTitle}&limit=5&page=${transPage}&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setKData(data.data);
        setKTCount(data.total_data);
        // console.log(data);
      })
      .catch(({ response }) => console.log(response));
  }, [eventTitle, transPage]);

  useEffect(() => {
    fetch(
      baseURL +
        `/kinddonation?event_name=${eventTitle}&limit=5&page=${donPage}&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setKDonations(data.data);
        setKDCount(data.total_data);
        // console.log(slug);
      })
      .catch((error) => console.log(error));
  }, [eventTitle, donPage]);

  return (
    <div className='causes__container'>
      {/* tabs-area-start */}
      <div style={{ marginLeft: "2rem" }}>
        <h1>Kind Transparency</h1>
      </div>
      <div className='causesTabs__container'>
        <Box>
          <div className='causesTabs__meroTabs'>
            <Button
              className='btn__fund'
              onClick={() => setKFundReceived(false)}
            >
              Kind Donation Spent
            </Button>
            <Button
              className='btn__fund'
              onClick={() => setKFundReceived(true)}
            >
              Kind Donation Received
            </Button>
          </div>
        </Box>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <div
          className='tab-pane fade show active'
          id='pills-fundreceived'
          role='tabpanel'
          aria-labelledby='pills-fundreceived-tab'
        >
          <h6 className='fw-bold' style={{ color: "grey" }}>
            Latest History
          </h6>
          <br />
          {!kFundReceived
            ? kData.map((row) => {
                return (
                  <div
                    style={fundcardStyle}
                    key={row._id}
                    className='d-flex justify-content-between px-4 mb-3'
                  >
                    <div className='d-flex flex-column'>
                      <h6>
                        <b>{row.name}</b>
                      </h6>
                      <p>{row.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <h6 className='m-0' style={{ color: "green" }}>
                        <b>Rs. {row.amount}</b>
                      </h6>
                      <button
                        class='btn mb1 b10'
                        onClick={() => {
                          setModalPhoto(row.photos);
                        }}
                      >
                        Bill
                      </button>
                    </div>
                  </div>
                );
              })
            : kDonations.map((donation) => {
                return (
                  <div
                    style={fundcardStyle}
                    key={donation._id}
                    className='d-flex justify-content-between px-4 mb-3'
                  >
                    <div className='d-flex flex-column'>
                      <h6>
                        <b>{donation.donerFullName}</b>
                      </h6>
                      <p>{donation.createdAt.slice(0, 10)}</p>
                      <p>{donation.donatedItem}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <h6 className='m-0' style={{ color: "green" }}>
                        <b>Rs. {donation.itemWorth}</b>
                      </h6>
                      <button
                        class='btn mb1 b10'
                        onClick={() => {
                          setModalKindPhoto(donation.photos);
                        }}
                      >
                        Photos
                      </button>
                    </div>
                  </div>
                );
              })}
          <Stack spacing={2}>
            {!kFundReceived ? (
              <Pagination
                count={Math.ceil(kTCount / 5)}
                page={transPage}
                onChange={handleTransChange}
              />
            ) : (
              <Pagination
                count={Math.ceil(kDCount / 5)}
                page={donPage}
                onChange={handleDonChange}
              />
            )}
          </Stack>
        </div>
        {!kFundReceived ? (
          <div className='billCarousel__container'>
            <Carousel
              className='billCarousel__container__carourel'
              infiniteLoop={true}
            >
              {modalPhoto.map((photo, index) => (
                <div className='billCarousel__container__item' key={index}>
                  <img
                    src={photo}
                    alt='bill'
                    key={index}
                    // style={{ width: "60%", height: "auto" }}
                  />
                  ;
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className='billCarousel__container'>
            <Carousel
              className='billCarousel__container__carourel'
              infiniteLoop={true}
            >
              {modalKindPhoto.map((photo, index) => (
                <div className='billCarousel__container__item' key={index}>
                  <img
                    src={photo}
                    alt='bill'
                    key={index}
                    // style={{ width: "60%", height: "auto" }}
                  />
                  ;
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
