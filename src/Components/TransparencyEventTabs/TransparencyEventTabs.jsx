import * as React from "react";
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

import { useState, useEffect } from "react";
import baseURL from "../../api/baseURL";

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

export default function TransparencyEventTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [eventTypes, setEventTypes] = useState([]);
  const [activeEventStatus, setActiveEventStatus] = useState("ongoing");
  const [eventCards, setEventCards] = useState([]);

  const handleStatusChange = (event) => {
    setActiveEventStatus(event.target.value);
  };

  useEffect(() => {
    fetch(baseURL + "/event_type")
      .then((data) => data.json())
      .then(({ data }) => setEventTypes(data))
      .catch(({ response }) => console.log(response));

    // tettikai rakheko
    setActiveEventStatus("ongoing");
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/events?type=${eventTypes[value]?.event_type}&status=${activeEventStatus}`
    )
      .then((data) => data.json())
      .then(({ data }) => setEventCards(data))
      .catch(({ response }) => console.log(response));
  }, [value, activeEventStatus, eventTypes]);

  const onDonate = (event) => {
    event.preventDefault();
  };

  return (
    <div className='causesTabs__container'>
      <Box sx={{ width: "100%" }}>
        <div className='causesTabs__meroTabs'>
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

          <Box sx={{ width: 110, margin: "1rem" }}>
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
        </div>
        <TabPanel
          className='causes__container__items'
          value={value}
          index={value}
        >
          {eventCards.map((card) => (
            <Link
              className='item'
              to={"/transparency-event-focused/" + card._id}
              key={card._id}
            >
              <img src={card.photos[0]} className='item__image' alt='project' />
              <h2 style={{ margin: "1rem" }}>{card.name}</h2>
              <div className='item__info'>{card.description}</div>
            </Link>
          ))}
        </TabPanel>
      </Box>
    </div>
  );
}
