import React from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import KindTransparencyCausePage from "./TransparencyCauseKind";

import Box from "@mui/material/Box";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import baseURL from "../../api/baseURL";
import Button from "@mui/material/Button";
import NavBar from "../../Components/NavBar/Nav";
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
  const [causeTitle, setCauseTitle] = useState("");
  const [causeDesc, setCauseDesc] = useState("");
  const [data, setData] = useState([]);
  const [donations, setDonations] = useState([]);
  const [tCount, setTCount] = useState();
  const [dCount, setDCount] = useState();

  const [fundReceived, setFundReceived] = useState(false);
  const [modalPhoto, setModalPhoto] = useState([]);

  const fundcardStyle = {
    borderRight: "3px solid #ececec",
    borderBottom: "3px solid #ececec",
  };

  useEffect(() => {
    fetch(baseURL + "/causes/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => {
        setCauseTitle(data.cause.name);
        setCauseDesc(data.description);
      })
      .catch(({ response }) => console.log(response));
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/transparency?cause_name=${causeTitle}&limit=5&page=${transPage}&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setTCount(data.total_data);
        setData(data.data);

        // console.log(data);
      })
      .catch(({ response }) => console.log(response));
  }, [causeTitle, transPage]);

  useEffect(() => {
    fetch(
      baseURL +
        `/donations?cause=${window.location.pathname
          .split("/")
          .pop()}&limit=5&page=${donPage}&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setDonations(data.data);
        setDCount(data.total_data);
        // console.log(slug);
      })
      .catch((error) => console.log(error));
  }, [donPage]);

  return (
    <div className='causes__container'>
      <NavBar />

      {/* @section => landing */}
      <div className='causes__container__landing'>
        <h1>{causeTitle}</h1>

        <p>{causeDesc}</p>
      </div>
      {/* tabs-area-start */}
      <div style={{ marginTop: "2rem", marginLeft: "2rem" }}>
        <h1>Cash Transparency</h1>
      </div>
      <div className='causesTabs__container'>
        <Box>
          <div className='causesTabs__meroTabs'>
            <Button className='btn__fund' onClick={() => setFundReceived(true)}>
              Fund Received
            </Button>
            <Button
              className='btn__fund'
              onClick={() => setFundReceived(false)}
            >
              Fund Spent
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
          {!fundReceived
            ? data.map((row) => {
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
            : donations.map((donation) => {
                return (
                  <div
                    style={fundcardStyle}
                    key={donation._id}
                    className='d-flex justify-content-between px-4 mb-3'
                  >
                    <div className='d-flex flex-column'>
                      <h6>
                        <b>
                          {donation.first_name} {donation.last_name}
                        </b>
                      </h6>
                      <p>{donation.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <h6 className='m-0' style={{ color: "green" }}>
                        <b>Rs. {donation.donation_amount}</b>
                      </h6>
                    </div>
                  </div>
                );
              })}
          <Stack spacing={2}>
            {!fundReceived ? (
              <Pagination
                count={Math.ceil(tCount / 5)}
                page={transPage}
                onChange={handleTransChange}
              />
            ) : (
              <Pagination
                count={Math.ceil(dCount / 5)}
                page={donPage}
                onChange={handleDonChange}
              />
            )}
          </Stack>
        </div>
        {!fundReceived && (
          <div className='billCarousel__container'>
            {modalPhoto.length !== 0 ? (
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
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <KindTransparencyCausePage />
      <Footer />
    </div>
  );
}
