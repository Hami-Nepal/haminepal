import { Button } from '@mui/material';
import React from 'react';
import './style.scss';

export default function VolunteerCard(props) {
  return (
    <div className="volunteerCard__container">
      <img src={props.photo} alt="donor" />
      <div className="volunteerCard__container__name">
        {props.first_name} {props.last_name}
      </div>
      <div className="volunteerCard__container__email">{props.email} </div>
      <p>{props.bio}</p>
      <Button>Donate</Button>
    </div>
  );
}
