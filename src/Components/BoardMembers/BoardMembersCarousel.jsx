import React, { useEffect, useState } from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import { Link } from "react-location";

export default function BoardMembersCarousel() {
  const [members, setMembers] = useState([]);

  const fetchData = async () => {
    const result = await (
      await fetch("https://api.haminepal.org/api/v1/boardmembers")
    ).json();
    setMembers(result.data);
  };

  useEffect(fetchData, []);
  return (
    <div className='boardMembersCarousel__container'>
      <Carousel>
        {members &&
          members.map((member, index) => (
            <div className='boardMembersCarousel__container__item' key={index}>
              <img src={member.photo} alt='board member' />
              <div className='boardMembersCarousel__container__memberName'>
                {member.name}
              </div>
              <div className='boardMembersCarousel__container__position'>
                {member.designation}
              </div>
              <div className='boardMembersCarousel__container__message'>
                "{member.message}"
              </div>
              <div className='boardMembersCarousel__container__socialLinks'>
                <ul>
                  <li>
                    <Link to={member.instaLink || "instaLink"}>
                      {" "}
                      <i className='ri-instagram-line'></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={member.facebookLink || "instaLink"}>
                      {" "}
                      <i className='ri-facebook-circle-line'></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={member.twitterLink || "instaLink"}>
                      {" "}
                      <i className='ri-twitter-line'></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={member.linkedLink || "instaLink"}>
                      {" "}
                      <i className='ri-linkedin-box-line'></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
