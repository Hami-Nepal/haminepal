import React from "react"
import "./style.scss"

import Carousel from "react-elastic-carousel"
import { Link } from "react-location"

import president from "../../Assets/president.jpg"
import vicePresident from "../../Assets/vicePresident.jpg"
import treasurer from "../../Assets/treasurer.jpg"
import healthAdvisior from "../../Assets/healthAdvisior.jpg"
import generalSecurity from "../../Assets/generalSecurity.jpg"

export default function BoardMembersCarousel() {
  const members = [
    {
      name: "SUDAN GURUNG",
      position: "President",
      message: `On 25 April, 2015 an earthquake with a magnitudeof 7.8 Richter scale
        struck Nepal along with continued aftershocks occurring throughout 
        the nation at the intervals of 15–20 minutes. The earthquake affected
         a huge population of the nation with about 9,000 
        fatalities and nearly 22,000 injured people.All of the hospitals in 
        Kathmandu were in chaos and unmanaged with injured people 
        flowing in rapidly. The National Trauma Center, a government 
        hospital, was no exception. After hearing the Information, several 
        youths went to the trauma hospital and offered to volunteer in order to
         control the situation. Our organization founder, Mr. Sudan Gurung,
         was also one of them.The volunteering youths started calling 
        themselves “I to We” at that time because of discrete reasons. 
        However, the name was later changed into ‘HamiNepal’, which is 
        roughly translated as ‘We for Nepal’. It is how people with helping 
        intention came along and formed the HamiNepal Youth
        `,
      memberImage: president,

      socialLinks: {
        instagram: "https://www.instagram.com/sudangrg_haminepal/",
        facebook: "https://www.facebook.com/sudangrghaminepal/about",
        twitter: "",
        linkedin: "",
      },
    },
    {
      name: "RUPAK GHIMIRE",
      position: "Vice President",
      message: `Dr. Rupak B. K. Ghimire is our young and enthusiastic dermatologist and hair transplant surgeon. He is popularly known as Ayushman Ghimire as he has been a winner of Mr Nepal 2011, lead actor in a movie and appeared in many tv commercials and advertisements.

        He completed his MBBS, MD from Kathmandu University and training in basic hair transplant surgery from Satyam Hair Transplants, India and International Fellowship in Hair Transplant Surgery from Dana Plastic Surgery Clinic, South Korea. He was also an Assistant Professor at Kathmandu Medical College, Sinamangal.
        
        He is a vice president at Hami Nepal. He believes we can make a change at different stages- social service, social movement & politics. Social service is solely a one way process where we just contribute without any demands or expectations. Social movements are forms where we demand for changes in policy, implementation as well as in events of social injustice & issues. He thinks political movements can drive above aspects in larger aspects and youths should be aware of political changes as well as to enter the system and make a change.
        `,
      memberImage: vicePresident,
      socialLinks: {
        instagram: "https://instagram.com/dr.rupakghimire?utm_medium=copy_link",
        facebook: "https://www.facebook.com/ayushmangh",
        twitter: "https://mobile.twitter.com/garima_sth",
        linkedin: "",
      },
    },
    {
      name: "Garima Shrestha",
      position: "Health Advisior",
      message: `Dr Garima Shrestha, is doing her MD Residency in Army Hospital Chhauni , completed her MBBS from Manipal College of Medical Sciences, Pokhara . 

      She is the Founder of SHE Nepal , working for women health and empowerment  .
      She is also the Managing Director of Mount Glory Boarding High School , Dhapasi . 
      
      She is the board member and official health advisor at Hami Nepal.
      She believes, to make a change we need each and every sector to co-ordinate and contribute from their sides . Being involved in health she believes, awaring people about health and conducting various awareness programs in different parts of the country and world can make a change . And spreading the knowledge regarding Prevention is better than cure , while focusing on accessibility of health facilities in rural areas as well . 
      However, to make a change ,we always need to have a vision and dedication because consistency is the key .
      
      `,
      memberImage: healthAdvisior,
      socialLinks: {
        instagram: "https://instagram.com/garima_sth?utm_medium=copy_link",
        facebook: "https://www.facebook.com/garima.shrestha.148",
        twitter: "https://mobile.twitter.com/garima_sth",
        linkedin: "",
      },
    },

    {
      name: "PRAGYA BAJRACHARYA",
      position: "General Secretary",
      message: `Pragya Bajracharya, unemployed, left a well paying job in a Danish Company to dedicate her time in Hami Nepal during the second lockdown. She states ‘Every minute is a chance to change the world. If you believe in your dreams, you have to advocate it everywhere, regardless of how unpleasant some outcomes might be.’ 

      Pragya says, ‘We have been successful in implementing our goals because of the strong dedication and commitment of our selfless volunteers, our biggest asset, and we are bringing out the best in each one of our volunteers by practicing skilled based volunteering.
      
      Pragya believes in creating a platform that acts as a catalyst for more inclusive, networked and effective forms to transform the current scenario into a better nation and future for all. She says that this depends on everyone, everywhere, and can only be done successfully if we are unswerving and hell bent on combining our efforts towards our common agenda for the benefit of humanity. It is our choice to make this a reality before it is too late.
            `,
      memberImage: generalSecurity,
      socialLinks: {
        instagram: "https://instagram.com/pugujane?utm_medium=copy_link",
        facebook: "https://www.facebook.com/pugujane",
        twitter: "",
        linkedin: "",
      },
    },
    {
      name: "Yogendra Shrestha",
      position: "Treasurer",
      message: `My name is Yogendra Shrestha, and I've been volunteering at Hami Nepal as the treasurer. I've also been a member of a couple of social groups, including the Jagaruk Maru Yuba Club and the Maruhiti toll sudhar samiti. The major reason I volunteered at Hami Nepal is because I am passionate about working in the field of social work. I enjoy serving the people of my country and hope to set an example for others.
      This platform conveys a more ambitious message. It explains how the individuals participating in an organization make a difference, gives them a feeling of purpose, and elicits their support. What followed afterwards will even be more significant: aiding in the relief of people's suffering, fighting for social justice, and improving people's lives and communities. I may be a voice for those who are not heard, and can address significant social issues in order to craft solutions that can help individuals realize their greatest motivation to make our nation a better place to live.
      
            `,
      memberImage: treasurer,
      socialLinks: {
        instagram: "https://instagram.com/syogendra99?utm_medium=copy_link",
        facebook: "https://www.facebook.com/yogendra.shrestha.71",
        twitter: "",
        linkedin: "",
      },
    },
  ]
  return (
    <div className="boardMembersCarousel__container">
      <Carousel>
        {members.map((member, index) => (
          <div className="boardMembersCarousel__container__item" key={index}>
            <img src={member.memberImage} alt="board member" />

            <div className="boardMembersCarousel__container__memberName">
              {member.name}
            </div>
            <div className="boardMembersCarousel__container__position">
              {member.position}
            </div>
            <div className="boardMembersCarousel__container__message">
              "{member.message}"
            </div>
            <div className="boardMembersCarousel__container__socialLinks">
              <ul>
                <li>
                  <a href={member.socialLinks.instagram}>
                    {" "}
                    <i className="ri-instagram-line"></i>
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.facebook}>
                    {" "}
                    <i className="ri-facebook-circle-line"></i>
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.twitter}>
                    {" "}
                    <i className="ri-twitter-line"></i>
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.linkedin}>
                    {" "}
                    <i className="ri-linkedin-box-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
