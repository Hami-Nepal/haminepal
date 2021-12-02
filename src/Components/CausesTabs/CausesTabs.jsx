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

export default function CausesTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [causeTypes, setCauseTypes] = useState([]);
  const [activeCauseStatus, setActiveCauseStatus] = useState("ongoing");
  const [causeCards, setCauseCards] = useState([]);

  const handleStatusChange = (event) => {
    setActiveCauseStatus(event.target.value);
  };

  useEffect(() => {
    fetch(baseURL + "/cause_type")
      .then((data) => data.json())
      .then(({ data }) => setCauseTypes(data))
      .catch(({ response }) => console.log(response));

    // tettikai rakheko
    setActiveCauseStatus("ongoing");
  }, []);

  useEffect(() => {
    fetch(
      baseURL +
        `/causes?cause_type=${causeTypes[value]?.cause_type}&status=${activeCauseStatus}`
    )
      .then((data) => data.json())
      .then(({ data }) => setCauseCards(data))
      .catch(({ response }) => console.log(response));
  }, [value, activeCauseStatus, causeTypes]);

  const onDonate = (event) => {
    event.preventDefault();
  };

  return (
    <div className='causesTabs__container'>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: 120, margin: "1rem" }}>
          <FormControl fullWidth>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={activeCauseStatus}
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
        <div className='causes__container__items'>
          <Box sx={{ borderBottom: 2, borderColor: "#e74c3c" }}>
            <Tabs
              variant='scrollable'
              scrollButtons='auto'
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              {causeTypes.map((type, index) => (
                <Tab
                  key={type._id}
                  label={type.cause_type}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
        </div>
        <TabPanel
          className='causes__container__items'
          value={value}
          index={value}
        >
          {causeCards.map((card) => (
            <Link
              className='item'
              to={"/cause-focused/" + card._id}
              key={card._id}
            >
              <img src={card.photos[0]} className='item__image' alt='project' />
              <h2 style={{ margin: "1rem 1rem 0" }}>{card.name}</h2>
              <div className='item__info'>{card.description}</div>
              <Button onClick={onDonate}>Donate</Button>
            </Link>
          ))}
        </TabPanel>
      </Box>
    </div>
  );
}
