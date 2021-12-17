import React, { useRef } from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import Influencers from "../../Mocks/Influencers.json";

export default function BoardMembersCarousel() {
  const carouselRef = useRef(null);
  let resetTimeout;
  return (
    <div className='influencersCarousel__container'>
      <Carousel
        className='influencersCarousel__container__carourel'
        ref={carouselRef}
        enableAutoPlay
        autoPlaySpeed={10000} // same time
        onNextEnd={({ index }) => {
          clearTimeout(resetTimeout);
          if (index + 1 === 11) {
            resetTimeout = setTimeout(() => {
              carouselRef.current.goTo(0);
            }, 10000); // same time
          }
        }}
        itemsToShow={1}
      >
        {Influencers.Influencers &&
          Influencers.Influencers.map((member, index) => (
            <div className='influencersCarousel__container__item' key={index}>
              <a href={member.social_link} rel='noreferrer' target='_blank'>
                <img src={member.photo} alt='Influencer member' />
              </a>
              <div className='influencersCarousel__container__memberName'>
                {member.name}
              </div>
              <div className='influencersCarousel__container__message'>
                "{member.details}"
              </div>
              <div className='influencersCarousel__container__socialLinks'></div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
