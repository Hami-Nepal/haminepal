import * as React from "react";
import "./style.scss";
import president from "../../Assets/president.jpg";
import banner1 from "../../Assets/banner1.jpg";
import banner2 from "../../Assets/banner2.jpg";
import banner3 from "../../Assets/banner3.jpg";
import vicePresident from "../../Assets/vicePresident.jpg";
import treasurer from "../../Assets/treasurer.jpg";
import healthAdvisior from "../../Assets/healthAdvisior.jpg";
import generalSecurity from "../../Assets/generalSecurity.jpg";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

export default function AboutUsTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="aboutUsTabs__container">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 2, borderColor: "#e74c3c" }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Who we are" {...a11yProps(0)} />
            <Tab label="What we do" {...a11yProps(1)} />
            <Tab label="How we work" {...a11yProps(2)} />
            <Tab label="Team" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel
          className="aboutUsTabs__container__whoWeAre"
          value={value}
          index={0}
        >
          <img
            src={banner1}
            alt="banner"
          />
          <h1>INTRODUCTION</h1>
          <p>
            Hami Nepal Youth Organisation is a non-profit organisation,
            established in 2015 A.D. and registered in 2020 A.D. (Regd.no.
            609789065), which directly connects the donors and the recipients.
            Our main objective is to help anyone in need without any hesitations
            and expectation of payback. The organisation doesn’t spend any of
            the received donations on administration cost as we believe that
            100% of the donation should reach the recipient in order to
            establish effective helping. All of our volunteers, mobilised for
            the authentication of the problem, logistics and delivery, cover
            their own expenses in order to save the administrative expense.
          </p><br/>
          <h1>HISTORY OF THE ORGANISATION</h1>
          <p>
            On 25 April, 2015 an earthquake with a magnitude of 7.8 Richter
            scale struck Nepal along with continued aftershocks occurring
            throughout the nation at the intervals of 15-20 minutes. The
            earthquake affected a huge population of the nation with about 9,000
            fatalities and nearly 22,000 injured people.
          </p><br/>

          <p>
            All of the hospitals in Kathmandu were in chaos and unmanaged with
            injured people flowing in rapidly. The National Trauma Center, a
            government hospital, was open but not on functionable state. Our
            organization founder, Mr. Sudan Gurung, who was not even from the
            social-work background, saw the miserable condition of the hospital
            and decided to help however he could.
          </p><br/>
          <p>
            Nonetheless, the situation was much worse and one single person
            couldn’t make a whole hospital operational so he called out
            volunteers. After hearing about the condition of the hospital 200
            volunteers showed up for help. The number grew from 200 to 300
            reaching 1600 total.
          </p>
          <br/>
          <p>
            Together, the young army of volunteers first volunteered in order to
            help the hospital to run properly and then expanded out of Kathmandu
            Valley to provide relief in 48 different remote areas of Nepal
            beginning the third day of the 2015 earthquake.
          </p>
        </TabPanel>

        <TabPanel
          className="aboutUsTabs__container__whatWeDo"
          value={value}
          index={1}
        >
          <img
            src={banner2}
            alt="banner"
          />

          <h2>What We Do?</h2>
          <p>
            Hami Nepal is active in more than eight districts across the country
            and provides massive aid to a number of others. Our purpose is to
            have a positive impact on society by changing how we think about
            others and how we connect – changes that are more important than
            ever. Our group also serves as a voice for those who have no one
            else to speak for them. 'For the People, By The People' is our
            motto.
          </p>
        </TabPanel>
        <TabPanel
          className="aboutUsTabs__container__howWeWork"
          value={value}
          index={2}
        >
          <img
            src={banner3}
            alt="banner"
          />
          <p>
            Given our limited resources, we must ensure that resources are
            delivered to the appropriate location and people.
          </p>
          <br />
          <p>
            As a result, when we receive a call or message from someone
            requesting assistance, whether for themselves or someone they know,
            we follow a series of standards for verification and need
            assessment. Whoever receives the message call passes it onto the
            verification team, which is made up of two members: the Chief
            Verification Officer and the Verification Executive. The
            verification team contacts them and obtains all pertinent
            information, including their name, family details, and financial
            background, as well as the specifics of the assistance sought.After
            that, it is cross-verified by another member, who can be either a
            second verification member or someone from another team, which
            increases the authenticity of the details. This also helps us to
            investigate and determine whether or not we should proceed with the
            request. We analyze the amount of resources (Aid or Monetary) that
            needs to be dispatched once we've decided to go ahead. The
            information, which includes the recipient's details and an itemized
            list of resources, is then forwarded to the logistics department,
            which will handle the request further.
          </p>
        </TabPanel>
        <TabPanel
          className="aboutUsTabs__container__team"
          value={value}
          index={3}
        >
          <h1>Team</h1>
          <p>
            We are a team who came to serve the people freely, with no purpose
            of self benefit. All the members has been with us since the
            beginning of the organization. All the members collaborate closely
            with management and the Board of Directors to represent the needs
            and concerns of the people.
            <br />
            <br />
          </p>
          <div className="item">
            <img src={president} alt="" />

            <h4>SUDAN GURUNG</h4>
            <div className="position">President</div>

            <p>
              On 25 April, 2015 an earthquake with a magnitudeof 7.8 Richter
              scale struck Nepal along with continued aftershocks occurring
              throughout the nation at the intervals of 15–20 minutes. The
              earthquake affected a huge population of the nation with about
              9,000 fatalities and nearly 22,000 injured people.
            </p>
          </div>
          <div className="item">
            <img src={vicePresident} alt="" />

            <h4>RUPAK GHIMIRE</h4>
            <div className="position">Vice President</div>

            <p>
              Dr. Rupak B. K. Ghimire is our young and enthusiastic
              dermatologist and hair transplant surgeon. He is popularly known
              as Ayushman Ghimire as he has been a winner of Mr Nepal 2011, lead
              actor in a movie and appeared in many tv commercials and
              advertisements.
            </p>
          </div>
          <div className="item">
            <img src={healthAdvisior} alt="" />

            <h4>GARIMA SHRESTHA</h4>
            <div className="position">Health Advisior</div>

            <p>
              Dr Garima Shrestha, is doing her MD Residency in Army Hospital
              Chhauni , completed her MBBS from Manipal College of Medical
              Sciences, Pokhara . She is the Founder of SHE Nepal , working for
              women health and empowerment . She is also the Managing Director
              of Mount Glory Boarding High School , Dhapasi .
            </p>
          </div>
          <div className="item">
            <img src={generalSecurity} alt="" />

            <h4>PRAGYA BAJRACHARYA</h4>
            <div className="position">General Security</div>

            <p>
              Pragya Bajracharya, unemployed, left a well paying job in a Danish
              Company to dedicate her time in Hami Nepal during the second
              lockdown. She states ‘Every minute is a chance to change the
              world. If you believe in your dreams, you have to advocate it
              everywhere, regardless of how unpleasant some outcomes might be.’
            </p>
          </div>
          <div className="item">
            <img src={treasurer} alt="" />

            <h4>YOGENDRA SHRESTHA</h4>
            <div className="position">Treasurer</div>

            <p>
              My name is Yogendra Shrestha, and I've been volunteering at Hami
              Nepal as the treasurer. I've also been a member of a couple of
              social groups, including the Jagaruk Maru Yuba Club and the
              Maruhiti toll sudhar samiti. The major reason I volunteered at
              Hami Nepal is because I am passionate about working in the field
              of social work. I enjoy serving the people of my country and hope
              to set an example for others.
            </p>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
