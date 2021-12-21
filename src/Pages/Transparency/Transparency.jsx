import React, { useState, useEffect } from "react";
import "./style.scss";

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

export default function Transparency() {
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalKindDonations, setTotalKindDonations] = useState(0);
  const [totalKindExpenses, setTotalKindExpenses] = useState(0);

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

  return (
    <div className='transparency__container'>
      <Helmet>
        <title>Transparency | Hami Nepal</title>
      </Helmet>
      <NavBar />

      {/* @section => landing */}
      <div className='transparency__container__landing'>
        <h1>Hami Nepal Encourages donation in kind.</h1>

        {/* <ul>
          <li>
            <i className='ri-money-dollar-circle-line'></i>
            <h3>Total Fund Raised</h3>
            <p>{new Intl.NumberFormat("en-IN").format(totalDonations)}</p>
          </li>
          <li>
            <i className='ri-tools-line'></i>
            <h3>Total Expenses</h3>
            <p>{new Intl.NumberFormat("en-IN").format(totalExpenses)}</p>
          </li>
          <li>
            <i className='ri-coin-line'></i>
            <h3>Remaining Fund</h3>
            <p>
              {new Intl.NumberFormat("en-IN").format(
                totalDonations - totalExpenses
              )}
            </p>
          </li>
        </ul> */}
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
          <div className='divider'></div>
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
          <div className='divider'></div>
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
              style={{ color: "#800000", textDecoration: "none" }}
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
            sx={{ minWidth: 650, width: "50%" }}
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

      <div className='admin-expenses-ko-section'>
        <h2>Donation Highlights</h2>
        <div className='admin-expenses-ko-column'>
          <TableContainer component={Paper} sx={{ minWidth: 650 }}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ fontWeight: "bold" }}>
                    S.No.
                  </TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Recipient Account
                  </TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Amount
                  </TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Weightage
                  </TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Download
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='center'>1.</TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Donation received towards Program Cost
                  </TableCell>
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>
                    Nabil Bank Ltd, A/C; 3310017501669 (Sudan Gurung)
                  </TableCell>
                  <TableCell align='left'>6,027,463.88</TableCell>
                  <TableCell align='left'>46.54%</TableCell>
                  <TableCell align='left'>
                    <a
                      href='https://drive.google.com/file/d/1lOXlyMr7J83m1Szcp9UKYJwcigQoxfhv/view?usp=sharing'
                      download
                      target='_blank'
                      style={{ color: "#800000", textDecoration: "none" }}
                    >
                      Click here for download
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>
                    Himalayan Bank Ltd, A/C; 00609261410013
                  </TableCell>
                  <TableCell align='left'>4,614,598.59</TableCell>
                  <TableCell align='left'>35.63%</TableCell>
                  <TableCell align='left'>
                    <a
                      href='https://drive.google.com/file/d/1sp1GyYZs6qKiZ_uhS4ChBswqgn1RDqHM/view?usp=sharing'
                      download
                      target='_blank'
                      style={{ color: "#800000", textDecoration: "none" }}
                    >
                      Click here for download
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>Fonepay Merchant Account</TableCell>
                  <TableCell align='left'>1,494,625.9</TableCell>
                  <TableCell align='left'>11.54%</TableCell>
                  <TableCell align='left'>
                    <a
                      href=''
                      style={{ color: "#800000", textDecoration: "none" }}
                    >
                      Click here for download
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>Cash</TableCell>
                  <TableCell align='left'>78,176.09</TableCell>
                  <TableCell align='left'>0.60%</TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>
                    Nabil Bank Ltd, A/C; 01501017501574
                  </TableCell>
                  <TableCell align='left'>38,331.17</TableCell>
                  <TableCell align='left'>0.30%</TableCell>
                  <TableCell align='left'>
                    <a
                      href=''
                      style={{ color: "#800000", textDecoration: "none" }}
                    >
                      Click here for download
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='center'>2.</TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Donation received towards Volunteer Mobilization Cost
                  </TableCell>
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>Cash</TableCell>
                  <TableCell align='left'>526,681</TableCell>
                  <TableCell align='left'>4.07%</TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>
                    Nabil Bank Ltd, A/C; 3310017501669
                  </TableCell>
                  <TableCell align='left'>100,000</TableCell>
                  <TableCell align='left'>0.77%</TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'>Fonepay Merchant Account</TableCell>
                  <TableCell align='left'>70,000</TableCell>
                  <TableCell align='left'>0.54%</TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    Total Donation Received (A)
                  </TableCell>
                  <TableCell align='left'></TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>
                    12,949,876.63
                  </TableCell>
                  <TableCell align='left'></TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
