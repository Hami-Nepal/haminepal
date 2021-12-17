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
          <img
            src={
              props.photo !== 'null'
                ? props.photo
                : 'data:image/png;base64,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'
            }
            alt="donor"
          />
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
