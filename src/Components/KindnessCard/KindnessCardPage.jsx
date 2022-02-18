import React from "react";
import "./style.scss";

import { Link } from "react-location";
import { Button } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-location";

import axios from "axios";
import baseURL from "../../api/baseURL";
import Donate from "../../Components/Donate/Donate";
import Modal from "@mui/material/Modal";

export default function KindnessCardPage(props) {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalData, setTotalData] = React.useState(0);
  const paginate = (e, number) => {
    setCurrentPage(number);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get(
      baseURL + `/kindness?page=${currentPage}&limit=12`
    );
    setPosts(res.data.data.filter((kindnes) => kindnes.isVerified === true));
    setTotalData(res.data.total_data);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const page = Math.ceil(totalData / 12);
  const token = localStorage.getItem("vinfo");

  const [requestStatus, setRequestStatus] = React.useState(null);
  const [activeCause, setActiveCause] = React.useState(null);
  const [activeCauseID, setActiveCauseID] = React.useState(null);
  const navigate = useNavigate();
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);

  const onParticipate = (kindnessId) => (event) => {
    event.preventDefault();

    setRequestStatus("pending");
    setActiveCause(kindnessId);

    axios
      .post(
        baseURL + "/kindness/volunteers/" + kindnessId,
        {
          volunteerId: localStorage.getItem("vID"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("vinfo"),
            volunteer: true,
          },
        }
      )
      .then(({ data }) => setRequestStatus("success"))
      .catch(({ response }) => setRequestStatus("failed"));
  };

  if (loading) {
    return (
      <div class='text-center'>
        <div class='spinner-border text-primary' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  const buttonForVolunteer = (card) => {
    const volunteer = card.volunteers?.find(
      (vol) => vol.volunteerId === localStorage.getItem("vID")
    );

    let buttonText = "Participate";

    if (volunteer) {
      if (volunteer.participated) {
        buttonText = "View";
      } else {
        buttonText = "Request pending";
      }
    }

    if (activeCause === card._id) {
      if (requestStatus === "pending") {
        buttonText = "Loading...";
      } else if (requestStatus === "success") {
        buttonText = "Request sent!";
      } else if (requestStatus === "failed") {
        buttonText = "Already in the pending list";
      }
    }

    return (
      <Button
        onClick={
          buttonText === "View"
            ? () => navigate({ to: "/kindness-focused/" + card._id })
            : onParticipate(card._id)
        }
        style={{ marginTop: "auto" }}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <div className='kindness-container'>
      <h1>Act of kindness</h1>
      <div className='kindness-neck'>
        <div class='kindness-hero'>
          {posts.map((data) => (
            <div className='kindnessCard__container' key={data._id}>
              <Link to={"/kindness-focused/" + data._id}>
                <img alt='kindness' src={data.photos[0]} />
                <h3 style={{ margin: "1rem 1rem 0" }}>{data.title}</h3>
                <div className='item__info'>{data.summary}</div>
                {token ? (
                  buttonForVolunteer(data)
                ) : data.type === "past" ? (
                  <Button disabled style={{ backgroundColor: "gray" }}>
                    Donate
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDonationFormOpen(true);
                      setActiveCause(data.title);
                      setActiveCauseID(data._id);
                    }}
                    style={{ marginTop: "auto" }}
                  >
                    Donate
                  </Button>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "20px" }}></div>
      <Stack justifyContent='center' alignItems='center' spacing={2}>
        <Pagination
          count={page}
          page={currentPage}
          onChange={paginate}
          shape='rounded'
          color='primary'
          size='large'
        />
      </Stack>

      {/** @dev this is dismissiable donation form */}
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
