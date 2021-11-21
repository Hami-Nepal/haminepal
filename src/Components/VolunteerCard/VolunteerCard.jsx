import { Button } from '@mui/material';
import { Link } from 'react-location';
import React from 'react';
import './style.scss';

export default function VolunteerCard(props) {
  const onBtnClick = (event) => {
    event.preventDefault();
  };

  return (
    <Link
      to={'/volunteer-profile/' + props._id}
      style={{ textDecoration: 'none', color: 'initial' }}
    >
      <div className="volunteerCard__container">
        <img src={props.photo} alt="donor" />
        <div className="volunteerCard__container__name">
          {props.first_name} {props.last_name}
        </div>
        <div className="volunteerCard__container__email">{props.email} </div>
        <p>{props.bio}</p>
        <Button onClick={onBtnClick}>Donate</Button>
      </div>
    </Link>
  );
}
