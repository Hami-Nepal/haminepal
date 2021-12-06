import React, { useState, useEffect } from "react"
import "./style.scss"

import { styled } from "@mui/material/styles"
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress"
import { Button } from "@mui/material"
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

export default function CauseFocused() {
  const [data, setData] = useState({})
  const [totalDonationAmount, setTotalDonationAmount] = useState(0)

  useEffect(() => {
    fetch(baseURL + "/causes/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => setData(data.cause))
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
    <div className="causeFocused__container">
      <NavBar />

      {/* @section => landing */}
      <div className="causeFocused__container__landing">
        <div className="causeFocused__container__landing__info">
          <h1>{data.name}</h1>
          <div className="divider"></div>
          <p>
            Cause type: <span>{data.cause_type}</span>
          </p>
          <p>
            Status: <span>{data.status}</span>
          </p>
          <hr className="causeDetails__hr" />
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

        <img
          src={data?.photos?.length ? data.photos[0] : ""}
          alt="cause cover"
        />
      </div>

      {/* @section => details */}
      <div className="causeFocused__container__details">
        <h1>Description</h1>
        <p>{data.description}</p>
      </div>

      {/* @section => challenges */}
      <div className="causeFocused__container__challenges">
        <h1>Challenges</h1>
        <p>{data.challenges}</p>
      </div>
      {/* @section => difficulties */}
      <div className="causeFocused__container__difficulties">
        <h1>Difficulties</h1>
        <p>{data.difficulties}</p>
      </div>

      {/* @section => volunteers */}
      <div className="causeFocused__container__volunteers">
        <h1>Volunteers</h1>

        <div className="causeFocused__container__volunteers__items">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              className="causeFocused__container__volunteers__items__item"
              key={item}
            >
              <img
                src="https://avatars.githubusercontent.com/u/93444253?s=400&u=389a238cf991d86adcc03166270d30241e94a95b&v=4"
                alt="volunteer"
              />

              <div className="userInfo">
                <div className="name">Deekshya Shahi</div>
                <div className="position">Moto Vlogger</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* @section => gallery */}
      <div className="causeFocused__container__gallery">
        <h1>Cause photos</h1>
        <div className="causeFocused__container__gallery__container">
          {data.photos?.map((url) => (
            <img key={url} src={url} alt="" />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
