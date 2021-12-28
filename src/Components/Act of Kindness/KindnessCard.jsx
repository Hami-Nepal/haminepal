import React from "react";
import "./style.scss";

import { Link } from "react-location";

export default function KindnessCard(props) {
  return (
    <div className='kindness__container1'>
      <div className='kindness__neck1'>
        <div class='kindness__hero1'>
          <div className='kindnessCard__container1' key={props._id}>
            <Link to={"/kindness__focused/" + props._id}>
              <img alt='kindness' src={props.photos[0]} />
              <div className='kindnessCard__container__title1'>
                {props.title}
              </div>
              <div className='kindnessCard__container__summary1'>
                {props.summary}
              </div>{" "}
              <span>See More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
