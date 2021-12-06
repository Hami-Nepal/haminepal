import React from "react"

import Nav from "../../Components/NavBar/Nav"

import data from "../../Components/CivilRightTabs/image"

import "./style.scss"

import NewsTab from "../../Components/NewsTab/NewsTabs"

const CivilRightsFocused = () => {
  const [post, setPost] = React.useState({})

  React.useEffect(() => {
    fetch(data + "/kindness/" + window.location.pathname.split("/").pop())
      .then((data) => data.json())
      .then(({ data }) => setPost(data))
      .catch(({ response }) => console.log(response))
  }, [])

  return (
    <>
      <Nav />
      <div className="civil-focused-container">
        <h1 className="civil-focused-container-title">500 kms for justice</h1>
        <div className="civil-focused-container-details">
          <h3>Details</h3>
          <p>
            From the Nepalgunj District, a group of 14 people, mostly women,
            came in Kathmandu. They walked the entire distance, which was about
            500 kilometers. On September 14, 2021, the group began their long
            march for justice. After being denied justice by local authorities,
            the group of locals from Banke district in Lumbini Province decided
            to march on foot to Kathmandu, Nepal's capital, to bring justice to
            the people. Their only demand is that the death of Nakunni Dhobi and
            the disappearance of Nirmala Kurmi be investigated fairly. One of
            the women was murdered, while the other has been missing since 2010.
            On July 20, 2021, Nakunni Dhobi was discovered dead at her house in
            Janaki Rural Municipality, Banke District, under dubious
            circumstances. Hami Nepal, as soon as the news flashed, went
            insearch of the group with the sole purpose of their medical safety
            and protection in whilist their stay in Kathmandu. Hami Nepal
            assisted the group while they protested in Maitighar. The team
            checked their Blood Pressure time and again and ensured that they
            faced no formal or informal problems",
          </p>
        </div>
        <div className="civil-focused-container-difficulties">
          <h3>Difficulties</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            fugit iure eum quae perferendis temporibus exercitationem quos
            quidem sit illum laudantium, nam, sint quas corrupti tempora culpa
            asperiores omnis beatae. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugiat, similique ipsum modi quam molestias saepe.
            Nihil cumque assumenda officiis non fugiat modi deleniti corrupti
            beatae? Sed veritatis labore distinctio illo?
          </p>
        </div>
        <div className="civil-focused-container-challenges">
          <h3>Challenges</h3>
          <p>
            Language became one mere problem as there were difficulties faced in
            the first day while communicating. This didn’t became a issue when
            two of our volunteers, Mr Sandeep Sharma and Jyoti Sapkota stepped
            in as they had a better understandingof the language and culture
            they belong. Besides this, it was quite challenging for their voice
            to be heard in the concerned authorities. It took few days for them
            to get media attention and to interact with the government which was
            not cooperative.
          </p>
        </div>
        <figure>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1633114130148-3f40987134d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          <img
            alt=""
            src="https://images.unsplash.com/photo-1638570522956-b580592512f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
          <img
            alt=""
            src="https://images.unsplash.com/photo-1638600981801-8074be470b23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
          <img
            alt=""
            src="https://images.unsplash.com/photo-1638556745894-820cfe87bacc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
          <img
            alt=""
            src="https://images.unsplash.com/photo-1638542800986-d65ccee3b7b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
          />
        </figure>
        <div className="civil-focused-container-result">
          <h3>Results</h3>
          <p>
            The Government finally took their statements into consideration and
            ordered a special investigation
          </p>
        </div>
      </div>
    </>
  )
}

export default CivilRightsFocused
