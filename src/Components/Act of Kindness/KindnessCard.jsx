import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import baseURL from "../../api/baseURL";

import { Link } from "react-location";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Donate from "../../Components/Donate/Donate";

//share
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

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
  const [modalopen, setModalOpen] = React.useState(false);
  const [activeCause, setActiveCause] = React.useState(null);
  const [activeCauseID, setActiveCauseID] = React.useState(null);
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);

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

  const handleShare = (id) => {
    console.log(id);
  };

  return (
    <div className='kindnessCard__container'>
      <img alt='example' src={props.photos[0]} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className='kindnessCard__container__title'>{props.title}</div>
        {/* <span className='share__button'>Share</span> */}
        <i class='ri-share-fill ri-xl' onClick={() => setModalOpen(true)}></i>
      </div>

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
      <BorderLinearProgress
        style={{ marginTop: "15px" }}
        variant='determinate'
        value={(totalDonation / props.balance) * 100}
      />
      <p style={{ marginTop: "5px", fontWeight: "bold" }}>
        Rs. {totalDonation} raised of {props.balance}
      </p>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsDonationFormOpen(true);
          setActiveCause(props.title);
          setActiveCauseID(props._id);
        }}
      >
        Donate
      </Button>
      <br />
      <Link to={"/kindness-focused/" + props._id}>
        <span className='see__more'>See More..</span>
        <br />
      </Link>
      <Modal
        open={modalopen}
        onClose={() => setModalOpen(false)}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          className='Modal__box'
          style={{ width: "400px", height: "100px", justifyContent: "center" }}
        >
          <div className='share__img'>
            <FacebookShareButton
              url={"haminepal.org/kindness-focused/" + props._id}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={"haminepal.org/kindness-focused/" + props._id}
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={"haminepal.org/kindness-focused/" + props._id}
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={"haminepal.org/kindness-focused/" + props._id}
            >
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
          </div>
        </Box>
      </Modal>
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
            donation_type={"kindness"}
            donation_name={"> " + activeCause}
            donation_name_ID={activeCauseID}
          />
        </Modal>
      </div>
    </div>
  );
}
