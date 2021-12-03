import React, { useState, useEffect } from "react";
import "./style.scss";

import Nav from "../../Components/NavBar/Nav";

// import { Link } from "react-location"

// import { styled } from "@mui/material/styles"
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress"
// import { Button } from "@mui/material"
import Footer from "../../Components/Footer/Footer";
import baseURL from "../../api/baseURL";

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor:
//       theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === "light" ? "#23CE34" : "#308fe8",
//   },
// }))

export default function KindnessFocused() {
  const [data, setData] = useState({});
  // const [totalDonationAmount, setTotalDonationAmount] = useState(0)

  useEffect(() => {
    fetch(baseURL + "/kindness/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => setData(data))
      .catch(({ response }) => console.log(response));
  }, []);

  //   useEffect(() => {
  //     // specific cause or events ko ako total amount herna ko lagi jugad
  //     fetch(baseURL + "/donations/?slug=" + data.slug)
  //       .then((data) => data.json())
  //       .then(({ data }) =>
  //         setTotalDonationAmount(
  //           data.reduce((acc, val) => acc + val.donation_amount, 0)
  //         )
  //       )
  //       .catch(({ response }) => console.log(response))
  //   }, [data])

  console.log(data);

  return (
    <div className='kindnessFocused__container'>
      <Nav />
      {/* @section => landing */}
      <div className='kindnessFocused__container__landing'>
        <div className='kindnessFocused__container__landing__info'>
          <h1>{data.title}</h1>
          <div className='divider'></div>
          {/* <p>
            Cause type: <span>{data.type}</span>
          </p> */}
          <p>
            Status: <span>{data.type}</span>
          </p>
          <hr className='kindnessDetails__hr' />
          <p>{data.summary}</p>

          {/* <BorderLinearProgress variant="determinate" value={50} />
          <div>
            <span>Rs. {totalDonationAmount}</span> of Rs.{data.balance}
          </div>
          <Button>Donate</Button> */}
        </div>

        <img
          src={data?.photos?.length ? data.photos[0] : ""}
          alt='kindness cover'
        />
      </div>

      {/* @section => details */}
      <div className='kindnessFocused__container__details'>
        <h1>Description</h1>
        <p>{data.details}</p>
      </div>

      {/* @section => challenges */}
      <div className='kindnessFocused__container__challenges'>
        <h1>Challenges</h1>
        <p>{data.challenges}</p>
      </div>
      {/* @section => difficulties */}
      <div className='kindnessFocused__container__difficulties'>
        <h1>Difficulties</h1>
        <p>{data.difficulties}</p>
      </div>
      {/* @section => results */}
      <div className='kindnessFocused__container__results'>
        <h1>Results</h1>
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
      <div className='kindnessFocused__container__gallery'>
        {data.photos?.map((url) => (
          <img key={url} src={url} alt='' />
        ))}
      </div>

      <Footer />
    </div>
  );
}
