import React, { useState, useEffect } from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";
import { Link } from "react-location";

export default function BoardMembersCarousel() {
  const [Members, setMembers] = useState([])
  useEffect(() => {
    async function fetchData() {
      await fetch("https://api.haminepal.org/api/v1/boardmembers")
      .then(response => response.json())
      .then(data => setMembers(data))
    }
    fetchData();
  },[])
  return (
    <div className="boardMembersCarousel__container">
      <Carousel>
        {Members && Members.map((member, index) => (
          <div className="boardMembersCarousel__container__item" key={index}>
            <img src={member.photo} alt="board member" />
            <div className="boardMembersCarousel__container__memberName">
              {member.name}
            </div>
            <div className="boardMembersCarousel__container__position">
              {member.designation}
            </div>
            <div className="boardMembersCarousel__container__message">
              "{member.message}"
            </div>
            <div className="boardMembersCarousel__container__socialLinks">
              <ul>
                <li>
                  <Link to={member.instaLink || ''} target='_blank'>
                    {" "}
                    <i className="ri-instagram-line"></i>
                  </Link>
                </li>
                <li>
                  <Link to={member.facebookLink || ''}>
                    {" "}
                    <i className="ri-facebook-circle-line"></i>
                  </Link>
                </li>
                <li>
                  <Link to={member.twitterLink || ''}>
                    {" "}
                    <i className="ri-twitter-line"></i>
                  </Link>
                </li>
                <li>
                  <Link to={member.linkedLink || ''}>
                    {" "}
                    <i className="ri-linkedin-box-line"></i>
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
