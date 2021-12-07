import React, { useState, useEffect } from "react"
import "./style.scss"

import { styled } from "@mui/material/styles"
import { Button } from "@mui/material"
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress"
import Footer from "../../Components/Footer/Footer"
import baseURL from "../../api/baseURL"
import NavBar from "../../Components/NavBar/Nav"

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
}))

export default function EventFocused() {
  const [data, setData] = useState({})
  const [totalDonationAmount, setTotalDonationAmount] = useState(0)

  useEffect(() => {
    fetch(baseURL + "/events/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => setData(data))
      .catch(({ response }) => console.log(response))
  }, [])

  useEffect(() => {
    // specific cause or events ko ako total amount herna ko lagi jugad
    fetch(baseURL + "/donations/?slug=" + data.slug)
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalDonationAmount(
          data.reduce((acc, val) => acc + val.donation_amount, 0)
        )
      )
      .catch(({ response }) => console.log(response))
  }, [data])

  return (
    <div className="eventFocused__container">
      <NavBar />

      {/* @section => landing */}
      <div className="eventFocused__container__landing">
        <div className="eventFocused__container__landing__info">
          <h1>{data.name}</h1>
          <div className="divider"></div>
          <p>
            Event type: <span>{data.type}</span>
          </p>
          <p>
            Status: <span>{data.status}</span>
          </p>
          <p>
            City: <span>{data.city}</span>
          </p>
          <p>
            Country: <span>{data.country}</span>
          </p>
          <p>
            State: <span>{data.state}</span>
          </p>
          <p>
            Street address: <span>{data.street_address}</span>
          </p>
          <hr className="eventDetails__hr" />
          <p>{data.summary}</p>

          <BorderLinearProgress
            variant="determinate"
            value={(totalDonationAmount / data.balance) * 100}
          />

          <div>
            <span>Rs. {totalDonationAmount}</span> of Rs.{data.balance}
          </div>

          <Button>Donate</Button>
        </div>

        <img src={data?.photos?.length ? data.photos[0] : ""} alt="event" />
      </div>

      {/* @section => details */}
      <div className="eventFocused__container__details">
        <h1>Description</h1>
        <p>{data.description}</p>
      </div>

      {/* @section => challenges */}
      <div className="eventFocused__container__challenges">
        <h1>Challenges</h1>
        <p>{data.challenges}</p>
      </div>
      {/* @section => difficulties */}
      <div className="eventFocused__container__difficulties">
        <h1>Difficulties</h1>
        <p>{data.difficulties}</p>
      </div>

      {/* @section => volunteers */}
      <div className="eventFocused__container__volunteers">
        <h1>Volunteers</h1>

        <div className="eventFocused__container__volunteers__items">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              className="eventFocused__container__volunteers__items__item"
              key={item}
            >
              <img
                src="https://avatars.githubusercontent.com/u/93448253?s=400&u=389a238cf991d86adcc03166270d30241e94a95b&v=4"
                alt="volunteer"
              />

              <div className="userInfo">
                <div className="name">Volunter Name</div>
                <div className="position">Some Info</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* @section => gallery */}
      <div className="eventFocused__container__gallery">
        <h1>Event photos</h1>
        <div className="eventFocused__container__gallery__container">
          {data.photos?.map((url) => (
            <img key={url} src={url} alt="" />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
