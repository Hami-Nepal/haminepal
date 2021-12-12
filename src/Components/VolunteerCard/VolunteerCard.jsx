import { Button } from '@mui/material';
import { Link } from 'react-location';
import React from 'react';
import './style.scss';

export default function VolunteerCard(props) {
  return (
    <Link
      to={'/volunteer-profile/' + props._id}
      style={{ textDecoration: 'none', color: 'initial' }}
    >
      <div className="volunteerCard__container">
        <div className="volunteer-ko-image">
          <img src={props.photo} alt="donor" />
          <span
            className="status-dot"
            style={{
              backgroundColor: props.isActive
                ? 'rgb(61, 199, 61)'
                : 'rgb(207, 207, 207)',
            }}
          ></span>
        </div>
        <div className="volunteerCard__container__name">
          {props.first_name} {props.last_name}
        </div>
        <div className="volunteerCard__container__email">{props.email} </div>
        <p>{props.bio}</p>
        <Button onClick={props.onClick}>Donate</Button>
      </div>
    </Link>
  );
}
