import React from "react";
import "./style.scss";

import Switch from "@mui/material/Switch";

import Logo from "../../Assets/logo.png";
import { Link } from "react-location";
import { Button } from "@mui/material";
import KHALTI from "../../Assets/khalti.png";
import ESEWA from "../../Assets/esewa.png";
import GOFUNDME from "../../Assets/gofundme.png";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Donate({
  setIsDonationFormOpen,
  donation_type,
  donation_name,
}) {
  const [anonymousDonation, setAnonymousDonation] = React.useState(false);
  const [donationOption, setDonationOption] = React.useState("Nepal");
  return (
    <div className='donate__container'>
      <div className='donate__container__topbar'>
        <img src={Logo} alt='logo' />
        <h3>Donation Form</h3>
        <button onClick={() => setIsDonationFormOpen(false)}>
          <i className='ri-close-line'></i>
        </button>
      </div>

      <div className='donate__container__form'>
        <div className='donate__container__form__switch'>
          <Switch
            checked={anonymousDonation}
            onClick={() => setAnonymousDonation(!anonymousDonation)}
            {...label}
          />{" "}
          Donate Anonymously
        </div>

        {!anonymousDonation && (
          <>
            <h4>User Details</h4>
            <div>
              <input type='text' placeholder='First Name' required />
              <input type='text' placeholder='Last Name' required />
            </div>
            <div>
              <input type='email' placeholder='Email Address' required />
              <input type='number' placeholder='Phone Number' required />
            </div>
            <input type='text' placeholder='Street Address' required />
            <div>
              <input type='text' placeholder='City' required />
              <input type='text' placeholder='State/Province/Region' required />
            </div>
            <div>
              <input type='number' placeholder='Zip Postal Code' required />
              <input type='text' placeholder='Country' required />
            </div>
          </>
        )}

        <h4>Donation Details</h4>
        <div>
          <label className='donation__type'>
            <h3>Donation for {donation_type}</h3>
            <p>{donation_name}</p>
          </label>
          <input type='number' placeholder='Amount' />
        </div>
        <textarea
          name='message'
          id='message'
          cols='30'
          rows='2'
          placeholder='Message'
        />

        <h4>Pay with</h4>
        <select
          name='Type'
          id='select'
          value={donationOption}
          onChange={(e) => setDonationOption(e.target.value)}
        >
          <option value='Nepal'>National</option>
          <option value='International'>International</option>
        </select>
        {donationOption === "Nepal" ? (
          <div className='ul__span'>
            <ul>
              <li>
                <input
                  type='radio'
                  className='form-check'
                  name='payment_type'
                  id='esewa'
                  value='ESEWA'
                />
                <img src={ESEWA} alt='esewa' />
              </li>
              <li>
                <input
                  type='radio'
                  className='form-check'
                  name='payment_type'
                  id='khalti'
                  value='khalti'
                />
                <img src={KHALTI} alt='khalti' />
              </li>
            </ul>
          </div>
        ) : donationOption === "International" ? (
          <ul>
            <li>
              <input
                type='radio'
                className='form-check'
                name='payment_type'
                id='gofund'
                value='gofundme'
              />
              <img
                src={GOFUNDME}
                alt='gofundme'
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        ) : (
          ""
        )}
        <Button>Donate</Button>
      </div>
    </div>
  );
}
