import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-location";
import "./style.scss";

import TrasnparencyCash from "./TransparencyCash";
import Carousel from "react-elastic-carousel";

import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";
import baseURL from "../../api/baseURL";
import NavBar from "../../Components/NavBar/Nav";
import Button from "@mui/material/Button";
import image from "../../Assets/transparency.jpg";

// table ko lagi
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "auto",
  boxShadow: 24,
  p: 4,
  bgcolor: "background.paper",
};

export default function Transparency() {
  const carouselRef = useRef(null);

  const [totalDonations, setTotalDonations] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalKindDonations, setTotalKindDonations] = useState(0);
  const [totalKindExpenses, setTotalKindExpenses] = useState(0);

  //Table Data
  const [kindActive, setKindActive] = useState(true);
  const [receivedType, setReceivedType] = useState("cause");
  const [spentType, setSpentType] = useState("cause");
  const [spentData, setSpentData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [spentTableIds, setSpentTableIds] = useState([]);
  const [receivedTableIds, setReceivedTableIds] = useState([]);
  const [fetchDataError, setFetchDataError] = useState(null);

  //carousel
  const [donPhotos, setDonPhotos] = useState([]);
  const [transPhotos, setTransPhotos] = useState([]);
  //Modal
  const [openReceived, setOpenReceived] = useState(false);
  const [openSpent, setOpenSpent] = useState(false);
  const handleReceivedOpen = (photos) => {
    setOpenReceived(true);
    setDonPhotos(photos);
  };
  const handleReceivedClose = () => setOpenReceived(false);

  const handleSpentOpen = (photos) => {
    setOpenSpent(true);
    setTransPhotos(photos);
  };
  const handleSpentClose = () => setOpenSpent(false);

  //Table Pagination
  const [kRCount, setKRCount] = useState(0);
  const [kSCount, setKSCount] = useState(0);

  const [donPage, setDonPage] = useState(0);
  const [transPage, setTransPage] = useState(0);

  const handleDonChange = (event, value) => {
    setDonPage(value);
  };
  const handleTransChange = (event, value) => {
    setTransPage(value);
  };

  useEffect(() => {
    fetch(baseURL + "/find/totalDonations")
      .then((data) => data.json())
      .then(({ data }) => setTotalDonations(data.length ? data[0].donation : 0))
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalExpenses")
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalExpenses(data.length ? data[0].total_expenses : 0)
      )
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalkindDonations")
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalKindDonations(data.length ? data[0].kinddonation : 0)
      )
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalkindExpenses")
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalKindExpenses(data.length ? data[0].total_kind_expenses : 0)
      )
      .catch(({ response }) => console.log(response));
  }, []);

  const fetchReceivedData = async () => {
    try {
      await fetch(
        baseURL + `/kinddonation?category=${receivedType}&page=${donPage + 1}`
      )
        .then((data) => data.json())
        .then(async (data) => {
          setReceivedData(data.data);
          setKRCount(data.total_data);
          if (receivedType === "cause") {
            const promises = await Promise.all(
              data.data.map(({ cause_name }) =>
                axios.get(baseURL + `/causes?name=${cause_name}&limit=10000`)
              )
            );
            setReceivedTableIds(promises.map(({ data }) => data.data[0]));
          } else if (receivedType === "event") {
            const promises = await Promise.all(
              data.map(({ event_name }) =>
                axios.get(baseURL + `/events?name=${event_name}&limit=10000`)
              )
            );
            setReceivedTableIds(promises.map(({ data }) => data.data[0]));
          } else if (receivedType === "kindness") {
            const promises = await Promise.all(
              data.map(({ kindness }) =>
                axios.get(baseURL + `/kindness?title=${kindness}&limit=10000`)
              )
            );
            setReceivedTableIds(promises.map(({ data }) => data.data[0]));
          }
        });
    } catch (error) {
      setFetchDataError(error.message);
    }
  };
  useEffect(() => {
    fetchReceivedData();
  }, [receivedType, donPage]);

  const fetchSpentData = async () => {
    try {
      await axios
        .get(
          baseURL + `/kindtransparency?type=${spentType}&page=${transPage + 1}`
        )
        .then(async (data) => {
          setSpentData(data.data.data);
          setKSCount(data.data.total_data);
          if (spentType === "cause") {
            const promises = await Promise.all(
              data.data.data.map(({ cause_name }) =>
                axios.get(baseURL + `/causes?name=${cause_name}&limit=10000`)
              )
            );
            setSpentTableIds(promises.map(({ data }) => data.data[0]));
          } else if (spentType === "event") {
            const promises = await Promise.all(
              data.data.data.map(({ event_name }) =>
                axios.get(baseURL + `/events?name=${event_name}&limit=10000`)
              )
            );
            setSpentTableIds(promises.map(({ data }) => data.data[0]));
          } else if (spentType === "kindness") {
            const promises = await Promise.all(
              data.data.data.map(({ kindness }) =>
                axios.get(baseURL + `/kindness?title=${kindness}&limit=10000`)
              )
            );
            setSpentTableIds(promises.map(({ data }) => data.data[0]));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpentData();
  }, [spentType, transPage]);

  return (
    <div className='transparency__container'>
      <Helmet>
        <title>Transparency | Hami Nepal</title>
      </Helmet>
      <NavBar />

      {/* @section => landing */}
      <div className='transparency__container__landing'>
        <h1>Hami Nepal Encourages donation in kind.</h1>
      </div>
      {/* @section => transparency content */}
      <div className='transparency__container__content'>
        <div className='content'>
          <h1>Transparency</h1>
          <div className='divider'></div>

          <p>
            Assurance, accountability, credibility and transparency between the
            transaction of every penny that we receive. For the first time in
            history, philanthropist, and donors can directly check their
            empathetic kind acts through verification process. The process of
            donation becomes simple where anyone can track every single steps of
            processing wherein every extended “helping hand” is assured and not
            evade. As we believe “Giving is not just about making a donation,
            it’s about making a difference” We believe transparency is critical
            assistance for association. If any terms of perplexity occurs, our
            honorable president can bridge the dubiety.
          </p>
          <p>President : Sudan Gurung </p>
          <p>Contact Detail : 9801066111</p>
        </div>
        <img src={image} alt='' />
      </div>
      <div className='transparency__horizontal'>
        <div className='tarnsparenc__kind__Ko'>
          <h2>Kind donation</h2>

          <ul>
            <li>
              <h5>Received</h5>
              <p>
                Rs.
                {new Intl.NumberFormat("en-IN").format(totalKindDonations)}
              </p>
            </li>
            <hr />
            <li>
              <h5>Spent</h5>

              <p>
                Rs.
                {new Intl.NumberFormat("en-IN").format(totalKindExpenses)}
              </p>
            </li>
            <hr />
            <li>
              <h5>Balance</h5>
              <p>
                Rs.
                {new Intl.NumberFormat("en-IN").format(
                  totalKindDonations - totalKindExpenses
                )}
              </p>
            </li>
          </ul>
        </div>
        <div className='transparency__cash__ko'>
          <h2>Cash donation</h2>

          <ul>
            <li>
              <h5>Received</h5>

              <p>{new Intl.NumberFormat("en-IN").format(totalDonations)}</p>
            </li>
            <hr />
            <li>
              <h5>Spent</h5>
              <p>{new Intl.NumberFormat("en-IN").format(totalExpenses)}</p>
            </li>
            <hr />
            <li>
              <h5>Balance</h5>
              <p>
                {new Intl.NumberFormat("en-IN").format(
                  totalDonations - totalExpenses
                )}
              </p>
            </li>
          </ul>
          <span>
            <a
              href='https://drive.google.com/file/d/1xDokY_2pqhzp1rOjuj8OYqKDYVVDatSD/view?usp=sharing'
              download
              target='_blank'
              rel='noreferrer'
              style={{ color: "#800000" }}
            >
              *Click here to download Audited Financial Statements of FY 2077/78
            </a>
          </span>
        </div>
      </div>

      {/* admin expenses */}

      <div className='admin-expenses-ko-section'>
        <h2>Admin Expenses</h2>
        <div className='admin-expenses-ko-column'>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 350, width: "100vw" }}
          >
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Particulars
                  </TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Expenses
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Salary Allowances</TableCell>
                  <TableCell align='left'>Run on Volunteering Basis</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Festival Allowances</TableCell>
                  <TableCell align='left'>0</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Office Rent</TableCell>
                  <TableCell align='left'>
                    Provided by Barbara Foundation
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Water Expenses</TableCell>
                  <TableCell align='left'>0</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Internet Expenses</TableCell>
                  <TableCell align='left'>
                    Borne by Barbara Foundation
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Website</TableCell>
                  <TableCell align='left'>
                    Voluntarily Prepared by youth of Hash Technologies
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Legal fees</TableCell>
                  <TableCell align='left'>0</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>Repair & Maintenance</TableCell>
                  <TableCell align='left'>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* donation hightlights */}

      <div className='maintable-ko-section'>
        <div className='button__main'>
          <Button onClick={() => setKindActive(true)} autoFocus>
            Kind
          </Button>
          <Button onClick={() => setKindActive(false)}>Cash</Button>
        </div>
        {kindActive ? (
          <>
            <div className='maintable-ko-column'>
              <div className='received__table'>
                <h3 style={{ marginTop: "3rem" }}>Received</h3>
                <TableContainer component={Paper} sx={{ minWidth: 350 }}>
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Donor Name
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Paticulars
                        </TableCell>
                        <TableCell align='left'>
                          <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel
                              id='demo-simple-select-autowidth-label'
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              Type
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-autowidth-label'
                              id='demo-simple-select-autowidth'
                              value={receivedType}
                              onChange={(e) => setReceivedType(e.target.value)}
                              autoWidth
                              label='Type'
                            >
                              <MenuItem value={"cause"}>Causes</MenuItem>
                              <MenuItem value={"event"}>Events</MenuItem>
                              <MenuItem value={"kindness"}>
                                Act of Kindness
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Quantity
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Amount
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Photos
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {receivedData.length &&
                        receivedData.map((data, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={data._id}
                          >
                            <TableCell align='left'>
                              {data.donerFullName}
                            </TableCell>
                            <TableCell align='left'>
                              {data.donatedItem}
                            </TableCell>
                            <TableCell align='left'>
                              {receivedTableIds.length ? (
                                <Link
                                  to={
                                    receivedType === "cause"
                                      ? `/cause-focused/${receivedTableIds[index]?._id}`
                                      : receivedType === "event"
                                      ? `/event-focused/${receivedTableIds[index]?._id}`
                                      : `/kindness-focused/${receivedTableIds[index]?._id}`
                                  }
                                >
                                  {receivedType === "cause"
                                    ? data.cause_name
                                    : receivedType === "event"
                                    ? data.event_name
                                    : data.kindness}
                                </Link>
                              ) : receivedType === "cause" ? (
                                data.cause_name
                              ) : receivedType === "event" ? (
                                data.event_name
                              ) : (
                                data.kindness
                              )}
                            </TableCell>
                            <TableCell align='left'>{data.quantity}</TableCell>
                            <TableCell align='left'>{data.itemWorth}</TableCell>
                            <TableCell align='left'>
                              {" "}
                              <Button
                                style={{
                                  backgroundColor: "#800000",
                                  color: "white",
                                }}
                                onClick={() => handleReceivedOpen(data.photos)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component='div'
                    count={kRCount}
                    page={donPage}
                    onPageChange={handleDonChange}
                    rowsPerPage={10}
                  />
                </TableContainer>
                <Modal
                  className='transparency__modal'
                  open={openReceived}
                  onClose={handleReceivedClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <div className='influencersCarousel__container'>
                      <Carousel ref={carouselRef} itemsToShow={1}>
                        {donPhotos.map((pic, index) => (
                          <div key={index} className='carousel__image'>
                            <img
                              src={pic}
                              alt='mydonation'
                              id='carousel-ko-image'
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </Box>
                </Modal>
              </div>
              <div className='spent__table'>
                <h3 style={{ marginTop: "3rem" }}>Spent</h3>
                <TableContainer component={Paper} sx={{ minWidth: 350 }}>
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Paticulars
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel
                              id='demo-simple-select-autowidth-label'
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              Type
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-autowidth-label'
                              id='demo-simple-select-autowidth'
                              value={spentType}
                              onChange={(e) => setSpentType(e.target.value)}
                              autoWidth
                              label='Type'
                            >
                              <MenuItem value={"cause"}>Causes</MenuItem>
                              <MenuItem value={"event"}>Events</MenuItem>
                              <MenuItem value={"kindness"}>
                                Act of Kindness
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Quantity
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Amount
                        </TableCell>
                        <TableCell align='left' style={{ fontWeight: "bold" }}>
                          Bills
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {spentData.length &&
                        spentData.map((data, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={data._id}
                          >
                            <TableCell align='left'>{data.name}</TableCell>
                            <TableCell align='left'>
                              {spentTableIds.length ? (
                                <Link
                                  to={
                                    spentType === "cause"
                                      ? `/cause-focused/${spentTableIds[index]?._id}`
                                      : spentType === "event"
                                      ? `/event-focused/${spentTableIds[index]?._id}`
                                      : `/kindness-focused/${spentTableIds[index]?._id}`
                                  }
                                >
                                  {spentType === "cause"
                                    ? data.cause_name
                                    : spentType === "event"
                                    ? data.event_name
                                    : data.kindness}
                                </Link>
                              ) : spentType === "cause" ? (
                                data.cause_name
                              ) : spentType === "event" ? (
                                data.event_name
                              ) : (
                                data.kindness
                              )}
                            </TableCell>
                            <TableCell align='left'>{data.quantity}</TableCell>
                            <TableCell align='left'>{data.amount}</TableCell>
                            <TableCell align='left'>
                              {" "}
                              <Button
                                style={{
                                  backgroundColor: "#800000",
                                  color: "white",
                                }}
                                onClick={() => handleSpentOpen(data.photos)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component='div'
                    count={kSCount}
                    page={transPage}
                    onPageChange={handleTransChange}
                    rowsPerPage={10}
                  />
                </TableContainer>
                <Modal
                  open={openSpent}
                  onClose={handleSpentClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <div className='influencersCarousel__container'>
                      <Carousel ref={carouselRef} itemsToShow={1}>
                        {transPhotos.map((pic, index) => (
                          <div key={index} className='carousel__image'>
                            <img
                              style={{
                                height: "auto",
                                width: "100%",
                                maxWidth: "450px",
                              }}
                              src={pic}
                              alt='mybill'
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </>
        ) : (
          <TrasnparencyCash />
        )}
      </div>
      <Footer />
    </div>
  );
}
