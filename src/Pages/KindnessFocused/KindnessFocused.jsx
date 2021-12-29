import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";

import Nav from "../../Components/NavBar/Nav";

import Footer from "../../Components/Footer/Footer";
import baseURL from "../../api/baseURL";
import KindnessFocusedCash from "./KindnessFocusedCash";

//table for bills
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-elastic-carousel";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";

export default function KindnessFocused() {
  const [data, setData] = useState({});
  const [volunteers, setVolunteers] = useState([]);

  //Transparency
  const [kindActive, setKindActive] = useState(null);
  const [modalPhoto, setModalPhoto] = useState([]);
  const [modalKindPhoto, setModalKindPhoto] = useState([]);

  const [kSpent, setKSpent] = useState([]);
  const [kReceived, setKReceived] = useState([]);
  const [kSCount, setKSCount] = useState(0);
  const [kRCount, setKRCount] = useState(0);

  //pagination
  const [transPage, setTransPage] = React.useState(0);
  const [donPage, setDonPage] = React.useState(0);
  const handleTransChange = (event, value) => {
    setTransPage(value);
  };
  const handleDonChange = (event, value) => {
    setDonPage(value);
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    fetch(baseURL + "/kindness/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(async ({ data }) => {
        setData(data);

        const trueVolunteers = data.volunteers.filter(
          ({ participated }) => participated
        );

        const promises = trueVolunteers.map(({ volunteerId }) =>
          axios.get(baseURL + "/volunteers/" + volunteerId)
        );

        const res = await Promise.all(promises);
        setVolunteers(res.map((obj) => obj.data.data.volunteer));
      })
      .catch(({ response }) => console.log(response));
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/kinddonation?kindness=${data.title}&limit=5&page=${
          donPage + 1
        }&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setKReceived(data.data);
        setKRCount(data.total_data);
      })
      .catch((error) => console.log(error));
  }, [data.title, donPage]);

  useEffect(() => {
    fetch(
      baseURL +
        `/kindtransparency?kindness=${data.title}&limit=5&page=${
          transPage + 1
        }&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setKSpent(data.data);
        setKSCount(data.total_data);
        // console.log(data);
      })
      .catch(({ response }) => console.log(response));
  }, [data.title, transPage]);

  const clearPhoto = () => {
    setModalKindPhoto([]);
  };
  const clearPhoto2 = () => {
    setModalPhoto([]);
  };
  return (
    <div className='kindnessFocused__container'>
      <Nav />
      {/* @section => landing */}
      <div className='kindnessFocused__container__landing'>
        <div className='kindnessFocused__container__landing__info'>
          <h1>{data.title}</h1>
          <p>{data.summary}</p>
        </div>

        <img
          src={data?.photos?.length ? data.photos[0] : ""}
          alt='kindness cover'
        />
      </div>

      {/* @section => details */}
      <div className='kindnessFocused__container__details'>
        <h2>Description</h2>
        <p>{data.details}</p>
      </div>

      {/* @section => challenges */}
      <div className='kindnessFocused__container__challenges'>
        <h2>Challenges</h2>
        <p>{data.challenges}</p>
      </div>

      {/* @section => results */}
      <div className='kindnessFocused__container__results'>
        <h2>Results</h2>
        <p>{data.results}</p>
      </div>
      {/* act of kindness Transparency */}
      <div className='kindnessFocused__container__transparency'>
        <h2 style={{ marginBottom: "1rem" }}>Transparency</h2>
        <div className='kindnessTabs__container'>
          <Box>
            <div className='kindnessTransTabs__meroTabs'>
              <Button className='btn__kind' onClick={() => setKindActive(true)}>
                Kinds
              </Button>
              <Button
                className='btn__cash'
                onClick={() => setKindActive(false)}
              >
                Cash
              </Button>
            </div>
          </Box>
        </div>
      </div>
      {kindActive ? (
        <>
          <div className='kindnessFocused__container__transparency'>
            <h3 style={{ marginTop: "-2rem" }}>Received</h3>
            {modalKindPhoto.length != 0 ? (
              <Button className='clear__photo' onClick={clearPhoto}>
                Hide
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className='side__by__side__kindness'>
            <TableContainer component={Paper} className='Table__container'>
              <Table sx={{ width: "100%" }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Donor Name
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Pariculars
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Amount
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Photos
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kReceived.length && kReceived ? (
                    kReceived.map((donor) => (
                      <TableRow key={donor._id}>
                        <TableCell align='center'>
                          {donor.donerFullName}
                        </TableCell>
                        <TableCell align='center'>
                          {donor.donatedItem}
                        </TableCell>
                        <TableCell align='center'>{donor.quantity}</TableCell>
                        <TableCell align='center'>{donor.itemWorth}</TableCell>
                        <TableCell align='center'>
                          {donor.createdAt.slice(0, 10)}
                        </TableCell>
                        <TableCell align='center'>
                          <Button
                            style={{
                              backgroundColor: "#800000",
                              color: "white",
                            }}
                            onClick={() => setModalKindPhoto(donor.photos)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : kReceived.length === 0 ? (
                    <span style={{ color: "#bf5050", margin: "1rem" }}>
                      No Data Found
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
                count={kRCount}
                page={donPage}
                onPageChange={handleDonChange}
                rowsPerPage={5}
              />
            </TableContainer>
            <div className='kbillCarousel__container'>
              {kindActive && kReceived && modalKindPhoto.length !== 0 ? (
                <Carousel className='kbillCarousel__container__carourel'>
                  {modalKindPhoto.map((photo, index) => (
                    <div
                      className='kbillCarousel__container__item__received'
                      key={index}
                    >
                      <img
                        src={photo}
                        alt='photo'
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
          </div>
          <div className='kindnessFocused__container__transparency'>
            <h3>Spent</h3>
            {modalPhoto.length != 0 ? (
              <Button className='clear__photo2' onClick={clearPhoto2}>
                Hide
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className='side__by__side__kindness'>
            <TableContainer component={Paper} className='Table__container'>
              <Table sx={{ width: "100%" }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Activity
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Amount
                    </TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold" }}>
                      Bills
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kSpent.length && kSpent ? (
                    kSpent.map((bill) => (
                      <TableRow key={bill._id}>
                        <TableCell align='center'>{bill.name}</TableCell>
                        <TableCell align='center'>{bill.quantity}</TableCell>
                        <TableCell align='center'>{bill.amount}</TableCell>
                        <TableCell align='center'>
                          <Button
                            style={{
                              backgroundColor: "#800000",
                              color: "white",
                            }}
                            onClick={() => setModalPhoto(bill.photos)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : kSpent.length === 0 ? (
                    <span style={{ color: "#bf5050", margin: "1rem" }}>
                      No Data Found
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
                count={kSCount}
                page={transPage}
                onPageChange={handleTransChange}
                rowsPerPage={5}
              />
            </TableContainer>
            <div className='kbillCarousel__container'>
              {kindActive && kSpent && modalPhoto.length !== 0 ? (
                <Carousel className='kbillCarousel__container__carourel'>
                  {modalPhoto.map((bill, index) => (
                    <div className='kbillCarousel__container__item' key={index}>
                      <img
                        src={bill}
                        alt='photo'
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
          </div>
        </>
      ) : (
        kindActive === false && (
          <KindnessFocusedCash kindnessName={data.title} />
        )
      )}
      {/* end of act of kindness Transparency */}
      {/* @section => volunteers */}
      <div className='kindnessFocused__container__volunteers'>
        <h1>Volunteers</h1>
        <div className='kindnessFocused__container__volunteers__items'>
          {volunteers.map((data) => (
            <div
              className='kindnessFocused__container__volunteers__items__item'
              key={data._id}
            >
              <img src={data.photo} alt='volunteer' />
              <div className='userInfo'>
                <div className='name'>
                  {data.first_name} {data.last_name}
                </div>
                <div className='position'>{data.field_of_expertise}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* @section => gallery */}
      <div className='kindnessFocused__container__gallery'>
        <h1>Cause photos</h1>
        <div className='kindnessFocused__container__gallery__container'>
          {data.photos?.map((url) => (
            <img key={url} src={url} alt='' />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
