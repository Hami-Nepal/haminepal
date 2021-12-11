import React, { useRef } from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import Influencers from "../../Mocks/Influencers.json";

export default function BoardMembersCarousel() {
  const carouselRef = useRef(null);
  let resetTimeout;
  return (
    <div className='boardMembersCarousel__container'>
      <Carousel
        className='boardMembersCarousel__container__carourel'
        ref={carouselRef}
        enableAutoPlay
        autoPlaySpeed={4000} // same time
        onNextEnd={({ index }) => {
          clearTimeout(resetTimeout);
          if (index + 1 === 11) {
            resetTimeout = setTimeout(() => {
              carouselRef.current.goTo(0);
            }, 4000); // same time
          }
        }}
        itemsToShow={1}
      >
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
