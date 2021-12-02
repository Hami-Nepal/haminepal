import React from "react"
import "./style.scss"

import { Link } from "react-location"

export default function KindnessCard(props) {
  return (
    <div className="kindnessCard__container">
      <Link to={"/kindness-focused/" + props._id}>
        <img alt="example" src={props.photos[0]} />
        <div className="kindnessCard__container__title">{props.title}</div>
        <div className="kindnessCard__container__description">
          {props.summary}
        </div>
      </Link>
    </div>
  )
}
