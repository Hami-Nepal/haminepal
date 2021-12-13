import React from "react"
import "./style.scss"

import { Link } from "react-location"

import Footer from "../../Components/Footer/Footer"
import OurWorkTabs from "../../Components/OurWorkTabs/OurWorkTabs"
import NavBar from "../../Components/NavBar/Nav"

export default function OurWork() {
  return (
    <>
      <NavBar />

      <div className="our_work_container">
        <h1 className="title">Our Work</h1>
        <div className="our_work_act_of_kindness">
          <div className="kindnessContents">
            <h1>Act Of Kindness</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut
              error unde? Voluptate asperiores dolore, hic consectetur molestiae
              minus recusandae consequuntur ex repellat quasi ipsam tempore
              placeat nulla repudiandae non. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Harum aut error unde? Voluptate
              asperiores dolore, hic consectetur molestiae minus recusandae
              consequuntur ex repellat quasi ipsam tempore placeat nulla
              repudiandae non. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum aut error unde? Voluptate asperiores
              dolore, hic consectetur molestiae minus recusandae consequuntur ex
              repellat quasi ipsam tempore placeat nulla repudiandae non. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Harum aut error
              unde? Voluptate asperiores dolore, hic consectetur molestiae minus
              recusandae consequuntur ex repellat quasi ipsam tempore placeat
              nulla repudiandae non. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum aut error unde? Voluptate asperiores
              dolore, hic consectetur molestiae minus recusandae consequuntur ex
              repellat quasi ipsam tempore placeat nulla repudiandae non.
              <br />
              <Link to="/act-of-kindness">
                <span>See our all kindness</span>
              </Link>
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1626480145636-a733bcfdcbc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt=""
            className="kindnessImage"
          />
        </div>
        <div className="image">
          <img
            src="http://api.haminepal.org/img/kindness/kindness-Hami%20Nepal%20(52)-1638458484989.jpeg"
            alt=""
            className="images"
          />
          <img
            src="http://api.haminepal.org/img/kindness/kindness-IMG_9538-1638457708965.jpeg"
            alt=""
            className="images"
          />
          <img
            src="http://api.haminepal.org/img/kindness/kindness-43f3a046-719c-4d26-b734-888ac1e23f06-1638458054934.jpeg"
            alt=""
            className="images"
          />
        </div>
        <div className="our_work_events">
          <div className="eventsContents">
            <h1>Events</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut
              error unde? Voluptate asperiores dolore, hic consectetur molestiae
              minus recusandae consequuntur ex repellat quasi ipsam tempore
              placeat nulla repudiandae non. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Harum aut error unde? Voluptate
              asperiores dolore, hic consectetur molestiae minus recusandae
              consequuntur ex repellat quasi ipsam tempore placeat nulla
              repudiandae non. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum aut error unde? Voluptate asperiores
              dolore, hic consectetur molestiae minus recusandae consequuntur ex
              repellat quasi ipsam tempore placeat nulla repudiandae non. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Harum aut error
              unde? Voluptate asperiores dolore, hic consectetur molestiae minus
              recusandae consequuntur ex repellat quasi ipsam tempore placeat
              nulla repudiandae non. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum aut error unde? Voluptate asperiores
              dolore, hic consectetur molestiae minus recusandae consequuntur ex
              repellat quasi ipsam tempore placeat nulla repudiandae non.
              <br />
              <Link to="/events">
                <span>See our all events</span>
              </Link>
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1602901799965-71b44d946b52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="eventImage"
          />
        </div>
        <div className="image">
          <img
            src="https://lexlimbu.com/wp-content/uploads/Hami-Nepal-Event.jpg"
            alt=""
            className="images"
          />
          <img
            src="https://informnepal.com/wp-content/uploads/2021/05/hami-1.jpeg"
            alt=""
            className="images"
          />
          <img
            src="https://www.dataofnepal.com/Donation/haminepal.jpg"
            alt=""
            className="images"
          />
        </div>
        <div className="our_work_causes">
          <div className="causesContents">
            <h1>Causes</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut
              error unde? Voluptate asperiores dolore, hic consectetur molestiae
              minus recusandae consequuntur ex repellat quasi ipsam tempore
              placeat nulla repudiandae non. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Harum aut error unde? Voluptate
              asperiores dolore, hic consectetur molestiae minus recusandae
              consequuntur ex repellat quasi ipsam tempore placeat nulla
              repudiandae non. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum aut error unde? Voluptate asperiores
              dolore, hic consectetur molestiae minus recusandae consequuntur ex
              repellat quasi ipsam tempore placeat nulla repudiandae non. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Harum aut error
              unde? Voluptate asperiores dolore, hic consectetur molestiae minus
              recusandae consequuntur ex repellat quasi ipsam tempore placeat
              nulla repudiandae non. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum aut error unde? Voluptate asperiores
              dolore, hic consectetur molestiae minus recusandae consequuntur ex
              repellat quasi ipsam tempore placeat nulla repudiandae non.
              <br />
              <Link to="causes">
                <span>See our all causes</span>
              </Link>
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1543860856-79e478a9452b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="causesImage"
          />
        </div>
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1592688461012-210aad22c48f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt=""
            className="images"
          />
          <img
            src="https://images.unsplash.com/photo-1607013510026-1d2b8b3e690f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80"
            alt=""
            className="images"
          />
          <img
            src="http://api.haminepal.org/img/kindness/kindness-DSC00680-1638365655101.jpeg"
            alt=""
            className="images"
          />
        </div>
      </div>

      {/* <OurWorkTabs /> */}

      <Footer />
    </>
  )
}
