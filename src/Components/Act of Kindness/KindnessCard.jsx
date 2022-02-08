import React, { useEffect, useState } from "react";
import "./style.scss";
// import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import baseURL from "../../api/baseURL";

import { Link } from "react-location";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
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

export default function KindnessCard(props) {
  const [totalDonation, setTotalDonation] = useState(0);

  useEffect(() => {
    fetch(baseURL + "/donations?kindness=" + props._id)
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalDonation(
          data.reduce((acc, val) => acc + val.donation_amount, 0)
        )
      )
      .catch(({ response }) => console.log(response));
  }, [props._id]);
  return (
    <div className='kindnessCard__container'>
      <img alt='example' src={props.photos[0]} />
      <div className='kindnessCard__container__title'>{props.title}</div>
      <div className='kindnessCard__container__description'>
        {props.summary}
      </div>
      <span style={{ fontWeight: "bold" }}>status :</span>
      <span
        style={{
          color: props.type === "ongoing" ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {" "}
        {props.type}
      </span>
      {/* <Button
        onClick={(e) => {
          console.log("ram");
        }}
      >
        Donate
      </Button> */}
      <BorderLinearProgress
        style={{ marginTop: "15px" }}
        variant='determinate'
        value={(totalDonation / props.balance) * 100}
      />
      <p style={{ marginTop: "5px", fontWeight: "bold" }}>
        Rs. {totalDonation} raised of {props.balance}
      </p>
      <Link to={"/kindness-focused/" + props._id}>
        <span className='see__more'>See More..</span>
      </Link>
    </div>
  );
}
