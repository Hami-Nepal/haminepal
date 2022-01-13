import * as React from "react";
import { useState, useEffect } from "react";
import "./style.scss";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Link } from "react-location";
import axios from "axios";
import baseURL from "../../api/baseURL";
import { useNavigate } from "react-location";
import Donate from "../../Components/Donate/Donate";
import Modal from "@mui/material/Modal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EventTabs() {
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState("");
  const [eventNameID, setEventNameID] = React.useState("");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [eventTypes, setEventTypes] = useState([]);
  const [activeEventStatus, setActiveEventStatus] = useState("ongoing");
  const [eventCards, EventCards] = useState([]);

  const handleStatusChange = (event) => {
    setActiveEventStatus(event.target.value);
  };

  const token = localStorage.getItem("vinfo");

  const [requestStatus, setRequestStatus] = React.useState(null);
  const [activeEvent, setActiveEvent] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseURL + "/event_type?limit=1000")
      .then((data) => data.json())
      .then(({ data }) => setEventTypes(data))
      .catch(({ response }) => console.log(response));

    // tettikai rakheko
    setActiveEventStatus("ongoing");
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/events?type=${eventTypes[value]?.event_type}&status=${activeEventStatus}&limit=10000`
    )
      .then((data) => data.json())
      .then(({ data }) => EventCards(data))
      .catch(({ response }) => console.log(response));
  }, [value, activeEventStatus, eventTypes]);

  const onParticipate = (eventId) => (event) => {
    event.preventDefault();

    setRequestStatus("pending");
    setActiveEvent(eventId);

    axios
      .post(
        baseURL + "/events/volunteers/" + eventId,
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

  const buttonForVolunteer = (card) => {
    const volunteer = card.volunteers.find(
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

    if (activeEvent === card._id) {
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
            ? () => navigate({ to: "/event-focused/" + card._id })
            : onParticipate(card._id)
        }
        style={{ marginTop: "auto" }}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <div className='eventsTabs__container'>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: 120, margin: "1rem" }}>
          <FormControl fullWidth>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={activeEventStatus}
              onChange={handleStatusChange}
              inputProps={{ "aria-label": "Without label" }}
              displayEmpty
            >
              <MenuItem value='ongoing' selected>
                Ongoing
              </MenuItem>
              <MenuItem value='past'>Past</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ borderBottom: 2, borderColor: "#e74c3c" }}>
          <Tabs
            variant='scrollable'
            scrollButtons='auto'
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            {eventTypes.map((type, index) => (
              <Tab
                key={type._id}
                label={type.event_type}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel
          className='events__container__items'
          value={value}
          index={value}
        >
          {eventCards.map((card) => (
            <Link
              className='item'
              to={"/event-focused/" + card._id}
              key={card._id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <img src={card.photos[0]} className='item__image' alt='project' />
              <h2 style={{ margin: "1rem 1rem 0" }}>{card.name}</h2>
              <div className='item__info'>{card.summary} </div>
              {token ? (
                buttonForVolunteer(card)
              ) : card.status === "past" ? (
                ""
              ) : (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDonationFormOpen(true);
                    setEventName(card.name);
                    setEventNameID(card._id);
                  }}
                  style={{ marginTop: "auto" }}
                >
                  Donate
                </Button>
              )}
            </Link>
          ))}
        </TabPanel>
      </Box>

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
            donation_type={"event"}
            donation_name={"> " + eventName}
            donation_name_ID={eventNameID}
          />
        </Modal>
      </div>
    </div>
  );
}
