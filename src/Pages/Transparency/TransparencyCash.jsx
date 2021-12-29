import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-location";
import "./style.scss";

import Carousel from "react-elastic-carousel";

import baseURL from "../../api/baseURL";
import Button from "@mui/material/Button";

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
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Transparency() {
  const carouselRef = useRef(null);

  //Table Data
  const [receivedType, setReceivedType] = useState("cause");
  const [spentType, setSpentType] = useState("cause");
  const [spentData, setSpentData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [spentTableIds, setSpentTableIds] = useState([]);
  const [receivedTableIds, setReceivedTableIds] = useState([]);
  const [fetchDataError, setFetchDataError] = useState(null);
  //carousel
  const [transPhotos, setTransPhotos] = useState([]);
  //Modal
  const [openSpent, setOpenSpent] = useState(false);
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

  const fetchReceivedData = async () => {
    try {
      await fetch(
        baseURL + `/donations?category=${receivedType}&page=${donPage + 1}`
      )
        .then((data) => data.json())
        .then(async (data) => {
          setReceivedData(data.data);
          setKRCount(data.total_data);
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
        .get(baseURL + `/transparency?type=${spentType}&page=${transPage + 1}`)
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
      {/* donation hightlights */}
      <div className='maintable-ko-section'>
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
                      Amount
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
                          {data.is_anonymous
                            ? "Anonymous Donor"
                            : `${data.first_name} ${data.last_name}`}
                        </TableCell>
                        <TableCell align='left'>
                          {data.cause || data.event || data.kindness ? (
                            <Link
                              to={
                                receivedType === "cause"
                                  ? `/cause-focused/${data.cause?._id}`
                                  : receivedType === "event"
                                  ? `/event-focused/${data.event?._id}`
                                  : `/kindness-focused/${data.kindness?._id}`
                              }
                            >
                              {receivedType === "cause"
                                ? data.cause?.name
                                : receivedType === "event"
                                ? data.event?.name
                                : data.kindness?.title
                                ? data.kindness?.title
                                : ""}
                            </Link>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align='left'>
                          {data.donation_amount}
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
                      <div key={index}>
                        <img
                          style={{
                            height: "auto",
                            maxWidth: "450px",
                            width: "100%",
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
      </div>
    </div>
  );
}
