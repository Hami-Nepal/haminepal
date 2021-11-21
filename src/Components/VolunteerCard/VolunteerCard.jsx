import { Button } from "@mui/material"
import React from "react"
import "./style.scss"

export default function VolunteerCard(props) {
  return (
    <div className="volunteerCard__container">
      <img src={props.item.photo} alt="donor" />
      <div className="volunteerCard__container__name">
        {props.item.first_name}
      </div>
      <div className="volunteerCard__container__email">{props.item.email}</div>
      <p>{props.item.bio}</p>
      <Button>Donate</Button>
    </div>
  )
}
