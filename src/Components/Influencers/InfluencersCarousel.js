import React, { useState, useEffect } from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import baseURL from "../../api/baseURL";
import Influencers from "../../Mocks/Influencers.json";

export default function BoardMembersCarousel() {
  return (
    <div className='boardMembersCarousel__container'>
      <Carousel className='boardMembersCarousel__container__carourel'>
        {Influencers.Influencers &&
          Influencers.Influencers.map((member, index) => (
            <div className='boardMembersCarousel__container__item' key={index}>
              <img src={member.photo} alt='Influencer member' />
              <div className='boardMembersCarousel__container__memberName'>
                {member.name}
              </div>
              <div className='boardMembersCarousel__container__message'>
                "{member.details}"
              </div>
              <div className='boardMembersCarousel__container__socialLinks'></div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
