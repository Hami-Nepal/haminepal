import React, { useState, useEffect } from "react";
import "./style.scss";

import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import baseURL from "../../api/baseURL";
import NavBar from "../../Components/NavBar/Nav";
import axios from "axios";
import CauseFocusedCash from "./CauseFocused_Cash";
import Donate from "../../Components/Donate/Donate";
import Modal from "@mui/material/Modal";

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#23CE34" : "#308fe8",
  },
}));

export default function CauseFocused() {
  const [data, setData] = useState({});
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [volunteers, setVolunteers] = useState([]);
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);
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

    fetch(baseURL + "/causes/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(async ({ data }) => {
        setData(data.cause);
        data.cause.volunteers = data.cause.volunteers.filter(
          (vol) => vol.participated
        );

        const promises = data.cause.volunteers.map((vol) =>
          axios.get(baseURL + "/volunteers/" + vol.volunteerId)
        );

        const res = await Promise.all(promises);
        setVolunteers(res);
      })
      .catch(({ response }) => console.log(response));
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/kinddonation?cause_name=${data.name}&limit=5&page=${
          donPage + 1
        }&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setKReceived(data.data);
        setKRCount(data.total_data);
        // console.log(slug);
      })
      .catch((error) => console.log(error));
  }, [data.name, donPage]);

  useEffect(() => {
    fetch(
      baseURL +
        `/kindtransparency?cause_name=${data.name}&limit=5&page=${
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
  }, [data.name, transPage]);

  useEffect(() => {
    // specific cause or events ko ako total amount herna ko lagi jugad
    fetch(
      baseURL +
        "/donations?cause=" +
        window.location.pathname.split("/").pop() +
        "&limit=1000000"
    )
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalDonationAmount(
          data.reduce((acc, val) => acc + val.donation_amount, 0)
        )
      )
      .catch(({ response }) => console.log(response));
  }, [data]);

  const createMarkup = () => {
    return { __html: data.description };
  };

  const clearPhoto = () => {
    setModalKindPhoto([]);
  };
  const clearPhoto2 = () => {
    setModalPhoto([]);
  };
  return (
    <div className='causeFocused__container'>
      <NavBar />

      {/* @section => landing */}
      <div className='causeFocused__container__landing'>
        <div className='causeFocused__container__landing__info'>
          <h1>{data.name}</h1>
          <div className='divider'></div>
          <p>
            Cause type: <span>{data.cause_type}</span>
          </p>
          <p>
            Status: <span>{data.status}</span>
          </p>
          <hr className='causeDetails__hr' />
          <p>{data.summary}</p>

          <BorderLinearProgress
            variant='determinate'
            value={(totalDonationAmount / data.balance) * 100}
          />

          <div>
            <span>Rs. {totalDonationAmount}</span> of Rs.{data.balance}
          </div>
          {data.status === "past" ? (
            ""
          ) : (
            <Button onClick={() => setIsDonationFormOpen(true)}>Donate</Button>
          )}
        </div>
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
              donation_type={"cause"}
              donation_name={"> " + data.name}
              donation_name_ID={data._id}
            />
          </Modal>
        </div>
        <img
          src={data?.photos?.length ? data.photos[0] : ""}
          alt='cause cover'
        />
      </div>

      {/* @section => details */}
      {data.description === "" ? (
        <></>
      ) : (
        <>
          <div className='causeFocused__container__details'>
            <h1>Description</h1>
            <div
              dangerouslySetInnerHTML={createMarkup()}
              className='editor'
            ></div>
          </div>

          {/* @section => challenges */}
          <div className='causeFocused__container__challenges'>
            <h1>Challenges</h1>
            <p>{data.challenges}</p>
          </div>
          {/* @section => difficulties */}
          {data.status === "past" ? (
            <div className='causeFocused__container__results'>
              <h1>Results</h1>
              <p>{data.results}</p>
            </div>
          ) : (
            ""
          )}
          {/* cause Transparency */}
          <div className='causeFocused__container__transparency'>
            <h1 style={{ marginBottom: "1rem" }}>Transparency</h1>
            <div className='causesTabs__container'>
              <Box>
                <div className='causesTransTabs__meroTabs'>
                  <Button
                    className='btn__kind'
                    onClick={() => setKindActive(true)}
                  >
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
              <div className='causeFocused__container__transparency'>
                <h2 style={{ marginTop: "-2rem" }}>Received</h2>
                {modalKindPhoto.length != 0 ? (
                  <Button className='clear__photo' onClick={clearPhoto}>
                    Hide
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <div className='side__by__side'>
                <TableContainer component={Paper} className='Table__container'>
                  <Table sx={{ width: "100%" }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Donor Name
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Pariculars
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
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
                            <TableCell align='center'>
                              {donor.quantity}
                            </TableCell>
                            <TableCell align='center'>
                              {donor.itemWorth}
                            </TableCell>
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
              <div className='causeFocused__container__transparency'>
                <h2>Spent</h2>
                {modalPhoto.length != 0 ? (
                  <Button className='clear__photo2' onClick={clearPhoto2}>
                    Hide
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <div className='side__by__side'>
                <TableContainer component={Paper} className='Table__container'>
                  <Table sx={{ width: "100%" }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Activity
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "bold" }}
                        >
                          Bills
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {kSpent.length && kSpent ? (
                        kSpent.map((bill) => (
                          <TableRow key={bill._id}>
                            <TableCell align='center'>{bill.name}</TableCell>
                            <TableCell align='center'>
                              {bill.quantity}
                            </TableCell>
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
                        <div
                          className='kbillCarousel__container__item'
                          key={index}
                        >
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
            kindActive === false && <CauseFocusedCash causeName={data.name} />
          )}

          {/* @section => volunteers */}
          <div className='causeFocused__container__volunteers'>
            <h1>Volunteers</h1>

            <div className='causeFocused__container__volunteers__items'>
              {volunteers.map(({ data }) => (
                <div
                  className='causeFocused__container__volunteers__items__item'
                  key={data.data.volunteer._id}
                >
                  <img
                    src={
                      data.data.volunteer.photo.startsWith("http")
                        ? data.data.volunteer.photo
                        : "https://static.thenounproject.com/png/72032-200.png"
                    }
                    alt='volunteer'
                  />

                  <div className='userInfo'>
                    <div className='name'>
                      {data.data.volunteer.first_name}{" "}
                      {data.data.volunteer.last_name}
                    </div>
                    <div className='position'>
                      {data.data.volunteer.field_of_expertise}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* @section => gallery */}
      <div className='causeFocused__container__gallery'>
        <h1>Cause photos</h1>
        <div className='causeFocused__container__gallery__container'>
          {data.photos?.map((url) => (
            <img key={url} src={url} alt='' />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
