import * as React from "react"
import "./style.scss"

import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import { useEffect } from "react"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
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
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function OurWorkTabs() {
  const [value, setValue] = React.useState(0)
  const [events, setEvents] = React.useState([])
  const [causes, setCauses] = React.useState([])
  console.log(events, "cause", causes)

  useEffect(() => {
    fetch("https://api.haminepal.org/api/v1/events")
      .then((data) => data.json())
      .then((events) => setEvents(events.data))
      .catch(({ response }) => console.log(response))
  }, [])

  useEffect(() => {
    fetch("https://api.haminepal.org/api/v1/cause_type")
      .then((data) => data.json())
      .then((causes) => setCauses(causes.data))
      .catch(({ response }) => console.log(response))
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="ourWorkTabs__container">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 2, borderColor: "#e74c3c" }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {events.map((data) => (
              <Tab label={data.status} />
            ))}
            {causes.map((data) => (
              <Tab label={data.name} />
            ))}
          </Tabs>
        </Box>
        {events.map((data) => (
          <TabPanel
            className="ourWorkTabs__container__items"
            value={value}
            index={0}
          >
            <div className="images">
              <div className="column">
                <img src={data.photos.photos} alt="" />
                <p>{data.name}</p>
              </div>
            </div>
          </TabPanel>
        ))}
        {events.map((data) => (
          <TabPanel
            className="ourWorkTabs__container__items"
            value={value}
            index={1}
          >
            <div className="images">
              <div className="column">
                <img src={data.photos} alt="" />
                <p>{data.name}</p>
              </div>
            </div>
          </TabPanel>
        ))}
        {causes.map((data) => (
          <TabPanel
            className="ourWorkTabs__container__items"
            value={value}
            index={2}
          >
            <div className="images">
              <div className="column">
                <img src={data.photos} alt="" />
                <p>{data.name}</p>
              </div>
            </div>
          </TabPanel>
        ))}
        {causes.map((data) => (
          <TabPanel
            className="ourWorkTabs__container__items"
            value={value}
            index={3}
          >
            <div className="images">
              <div className="column">
                <img src={data.photos} alt="" />
                <p>{data.name}</p>
              </div>
            </div>
          </TabPanel>
        ))}
      </Box>
    </div>
  )
}
