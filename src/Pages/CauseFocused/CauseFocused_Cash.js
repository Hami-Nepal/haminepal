import React, { useState, useEffect } from "react";
import "./style.scss";

import { Button } from "@mui/material";

import baseURL from "../../api/baseURL";

//table for bills
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-elastic-carousel";
import TablePagination from "@mui/material/TablePagination";

export default function CauseFocusedCash(props) {
  //Transparency
  const [modalPhoto, setModalPhoto] = useState([]);

  const [spent, setSpent] = useState([]);
  const [received, setReceived] = useState([]);
  const [receivedError, setReceivedError] = useState(null);
  const [sCount, setSCount] = useState(0);
  const [rCount, setRCount] = useState(0);

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
    fetch(
      baseURL +
        `/donations?cause=${window.location.pathname
          .split("/")
          .pop()}&limit=5&page=${donPage}&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setReceived(data.data);
        setRCount(data.total_data);
      })
      .catch((error) => setReceivedError(error.message));
  }, [donPage]);

  useEffect(() => {
    fetch(
      baseURL +
        `/transparency?cause_name=${props.causeName}&limit=5&page=${transPage}&sort=-createdAt`
    )
      .then((data) => data.json())
      .then((data) => {
        setSCount(data.total_data);
        setSpent(data.data);

        // console.log(data);
      })
      .catch(({ response }) => console.log(response));
  }, [props.causeName, transPage]);

  const clearPhoto = () => {
    setModalPhoto([]);
  };

  return (
    <div className='causeFocused__container'>
      <div className='causeFocused__container__transparency'>
        <h2>Received</h2>
      </div>
      <div className='side__by__side'>
        <TableContainer component={Paper} className='Table__container'>
          <Table sx={{ width: "100%" }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ fontWeight: "bold" }}>
                  Donor Name
                </TableCell>
                <TableCell align='center' style={{ fontWeight: "bold" }}>
                  Amount
                </TableCell>
                <TableCell align='center' style={{ fontWeight: "bold" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {received.length && received ? (
                received.map((donor) => (
                  <TableRow key={donor._id}>
                    <TableCell align='center'>
                      {donor.first_name} {donor.last_name}
                    </TableCell>
                    <TableCell align='center'>
                      {donor.donation_amount}
                    </TableCell>
                    <TableCell align='center'>
                      {donor.createdAt.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                ))
              ) : receivedError ? (
                <span>{receivedError}</span>
              ) : received.length === 0 ? (
                <span>No data Found</span>
              ) : received.length === 0 ? (
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
            count={rCount}
            page={donPage}
            onPageChange={handleDonChange}
            rowsPerPage={5}
          />
        </TableContainer>
      </div>
      <div className='causeFocused__container__transparency'>
        <h2 style={{ marginTop: "2rem" }}>Spent</h2>
        {modalPhoto.length !== 0 ? (
          <Button className='clear__photo__cash' onClick={clearPhoto}>
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
                <TableCell align='center' style={{ fontWeight: "bold" }}>
                  Activity
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
              {spent.length && spent ? (
                spent.map((bill) => (
                  <TableRow key={bill._id}>
                    <TableCell align='center'>{bill.name}</TableCell>
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
              ) : spent.length === 0 ? (
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
            count={sCount}
            page={transPage}
            onPageChange={handleTransChange}
            rowsPerPage={5}
          />
        </TableContainer>
        <div className='kbillCarousel__container'>
          {spent && modalPhoto.length !== 0 ? (
            <Carousel className='kbillCarousel__container__carourel'>
              {modalPhoto.map((bill, index) => (
                <div className='kbillCarousel__container__item' key={index}>
                  <img
                    src={bill}
                    alt='bills'
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
    </div>
  );
}
