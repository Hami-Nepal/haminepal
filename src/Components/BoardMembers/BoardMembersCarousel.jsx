import React, { useState, useEffect } from "react"
import "./style.scss"

import Carousel from "react-elastic-carousel"
import baseURL from "../../api/baseURL"

export default function BoardMembersCarousel() {
  const [Members, setMembers] = useState([])
  useEffect(() => {
    async function fetchData() {
      await fetch(baseURL + "/boardmembers")
        .then((response) => response.json())
        .then((data) => setMembers(data.data))
        .catch(({ response }) => console.log(response))
    }
    fetchData()
  }, [])

  return (
    <div className="boardMembersCarousel__container">
      <Carousel className="boardMembersCarousel__container__carourel">
        {Members &&
          Members.map((member, index) => (
            <div className="boardMembersCarousel__container__item" key={index}>
              <img src={member.photo} alt="board member" />
              <div className="rt-item">
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
                      <a
                        href={member.instaLink || ""}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <i className="ri-instagram-line"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.facebookLink || ""}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <i className="ri-facebook-circle-line"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.twitterLink || ""}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <i className="ri-twitter-line"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.linkedLink || ""}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <i className="ri-linkedin-box-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  )
}
