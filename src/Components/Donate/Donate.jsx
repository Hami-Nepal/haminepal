import React from 'react';
import './style.scss';

import Switch from '@mui/material/Switch';

import Logo from '../../Assets/logo.png';
import { Link } from 'react-location';
import { Button } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Donate({
  setIsDonationFormOpen,
  donation_type,
  donation_name,
}) {
  const [anonymousDonation, setAnonymousDonation] = React.useState(false);
  return (
    <div className="donate__container">
      <div className="donate__container__topbar">
        <img src={Logo} alt="logo" />
        <h3>Donation Form</h3>
        <button onClick={() => setIsDonationFormOpen(false)}>
          <i className="ri-close-line"></i>
        </button>
      </div>

      <div className="donate__container__form">
        <div className="donate__container__form__switch">
          <Switch
            checked={anonymousDonation}
            onClick={() => setAnonymousDonation(!anonymousDonation)}
            {...label}
          />{' '}
          Donate Anonymously
        </div>

        {!anonymousDonation && (
          <>
            <h3>User Details</h3>
            <div>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <div>
              <input type="email" placeholder="Email Address" required />
              <input type="number" placeholder="Phone Number" required />
            </div>
            <input type="text" placeholder="Street Address" required />
            <div>
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="State/Province/Region" required />
            </div>
            <div>
              <input type="number" placeholder="Zip Postal Code" required />
              <input type="text" placeholder="Country" required />
            </div>
          </>
        )}

        <h3>Donation Details</h3>
        <div>
          <label className="donation__type">
            <h3>Donation for {donation_type}</h3>
            <p>{donation_name}</p>
          </label>
          <input type="number" placeholder="Amount" />
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Message"
        ></textarea>

        <h3>Pay with</h3>
        <span>Inside Nepal</span>
        {/** @dev add images here instead of texts */}
        <ul>
          <li>
            <input
              type="radio"
              className="form-check"
              name="payment_type"
              id="esewa"
              value="ESEWA"
            />
            <label for="esewa">
              <img src="" alt="esewa" />
            </label>
          </li>
          <li>
            <input
              type="radio"
              className="form-check"
              name="payment_type"
              id="esewa"
              value="ESEWA"
            />
            <label for="esewa">
              <img src="" alt="esewa" />
            </label>
          </li>
        </ul>

        <hr />
        <span style={{ marginTop: '30px' }}>Outside Nepal</span>
        <ul>
          <li>
            <Link to="/">gofundme</Link>
          </li>
          <li>
            <Link to="/">gofundme</Link>
          </li>
        </ul>

        <Button>Donate</Button>
      </div>
    </div>
  );
}
