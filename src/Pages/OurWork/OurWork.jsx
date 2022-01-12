import React from "react";
import "./style.scss";

import upArrow from "../../../src/Assets/up.svg";
import downArrow from "../../../src/Assets/down.svg";

import { Link } from "react-location";
// import baseURL from "../../api/baseURL";

import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/Nav";
// import axios from "axios";

export default function OurWork() {
  // const [causes, setCauses] = React.useState([]);
  // const [events, setEvents] = React.useState([]);
  // const [kindness, setKindness] = React.useState([]);
  // const [status, setStatus] = React.useState("past");
  const [more, setMore] = React.useState(true);
  const [more1, setMore1] = React.useState(true);
  const [more2, setMore2] = React.useState(true);

  // React.useEffect(() => {
  //   const posts = async () => {
  //     const res = await axios.get(baseURL + `/kindness`);
  //     setKindness(res.data.data);
  //   };
  //   posts();
  // }, []);

  // React.useEffect(() => {
  //   const posts = async () => {
  //     const res = await axios.get(baseURL + `/causes?status=${status}`);
  //     setCauses(res.data.data);
  //   };
  //   posts();
  // }, []);

  // React.useEffect(() => {
  //   const posts = async () => {
  //     const res = await axios.get(baseURL + `/events?status=${status}`);
  //     setEvents(res.data.data);
  //   };
  //   posts();
  // }, []);

  return (
    <>
      <NavBar />

      <div className='our_work_container'>
        <h1 className='title'>Our Works</h1>
        {/* @kindness-section */}
        <div className='our_work_act_of_kindness'>
          <div className='kindnessContents'>
            <h1>Act Of Kindness</h1>
            <p>
              Kindness generates empathy and compassion, which leads to a
              feeling of connection with others. It releases happiness when we
              perform random acts of kindness. To perform an act of
              contribution, help and kindness is what we do at Hami Nepal. Our
              team is constantly working for the people, those who are
              desperately in need of help. Hami Nepal reaches out to these
              people, verifies the requirements and sends help almost instantly.
              The team regularly visits families and individuals who are
              requests aid.
              <br />
              The objective of these works is to help people in whatever way
              possible and eradicate their problem in no time. Some of the cases
              might be an emergency situation. Team Hami Nepal gives an
              immediate response to these calls for help and starts the work
              fast.
              <br />
              <br />
              <Link to='/act-of-kindness'>
                <span>See our all kindness</span>
              </Link>
            </p>
          </div>
          <img
            src='https://images.unsplash.com/photo-1626480145636-a733bcfdcbc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
            alt=''
            className='kindnessImage'
          />
        </div>
        {/* @section Image Cards */}
        <div className='image'>
          {/* {kindness.map((data) => (
            <img
              src={data.photos[0]}
              alt={data._id}
              key={data._id}
              className="images"
            />
          ))} */}
          {more ? (
            <>
              <div className='image-container'>
                <img
                  src='https://informnepal.com/wp-content/uploads/2021/05/hami-1.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://lexlimbu.com/wp-content/uploads/Hami-Nepal-Event.jpg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://d2g8igdw686xgo.cloudfront.net/56738917_1620896632893297_r.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
            </>
          ) : (
            <>
              {/* {kindness.map((data) => (
                <div className="image-container">
                  <img
                    src={data.photos[0]}
                    alt={data._id}
                    key={data._id}
                    className="images"
                  />
                  <p>{data.title}</p>
                </div>
              ))} */}
              <div className='image-container'>
                <img
                  src='https://informnepal.com/wp-content/uploads/2021/05/hami-1.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://lexlimbu.com/wp-content/uploads/Hami-Nepal-Event.jpg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://d2g8igdw686xgo.cloudfront.net/56738917_1620896632893297_r.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://pbs.twimg.com/media/E2FiURFVcAIUzID.jpg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://thehimalayantimes.com/thehimalayantimes/uploads/images/2021/06/20/6542.jpg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://images.unsplash.com/photo-1592688461012-210aad22c48f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
            </>
          )}
        </div>
        <center className='more-btn'>
          <div onClick={() => setMore(!more)}>
            {more ? (
              <>
                <img src={downArrow} alt='arrrow' />
              </>
            ) : (
              <>
                <img src={upArrow} alt='arrrow' />
              </>
            )}
          </div>
        </center>

        {/* @events-section */}
        <div className='our_work_events'>
          <div className='eventsContents'>
            <h1>Events</h1>
            <p>
              While we say something is for a good cause, we're indicating that
              it's worthwhile to accomplish or contribute to since it will
              benefit others. Aligning ourselves with a cause that reflects our
              true values is how we work at Hami Nepal. The work can often be
              hard, and can dive in an environment that might be controversial
              or invite criticism from others with a different point-of-view,
              but at the end of the day, we all work for the betterment of the
              civilians and the society.
              <br />
              <br />
              <Link to='/events'>
                <span>See our all events</span>
              </Link>
            </p>
          </div>
          <img
            src='https://images.unsplash.com/photo-1602901799965-71b44d946b52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt=''
            className='eventImage'
          />
        </div>
        <div className='image'>
          {/* {events.map((data) => (
            <img
              src={data.photos[0]}
              alt=""
              key={data._id}
              className="images"
            />
          ))} */}
          {more1 ? (
            <>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-5%20(2)-1640500436375.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-5%20(0)-1640500436367.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-6O7A0452-1640500436378.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
            </>
          ) : (
            <>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-6O7A0564-1640500436378.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-6O7A0560-1640500436378.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-6O7A0804-1640500436400.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-6O7A0977-1640500436400.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/events/event-6O7A0994%20-%20Copy%20(2)-1640500436400.jpeg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
              <div className='image-container'>
                <img
                  src='https://www.dataofnepal.com/Donation/haminepal.jpg'
                  alt=''
                  className='images'
                />
                {/* <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div> */}
              </div>
            </>
          )}
        </div>
        <center>
          <div onClick={() => setMore1(!more1)}>
            {more1 ? (
              <>
                <img src={downArrow} alt='arr' />
              </>
            ) : (
              <>
                <img src={upArrow} alt='arr' />
              </>
            )}
          </div>
        </center>
        {/* @section-events */}
        <div className='our_work_causes'>
          <div className='causesContents'>
            <h1>Causes</h1>
            <p>
              Hami Nepal is constantly looking for the social issues and finding
              quick solutions to eradicate it. Among the process, the
              organization hosts different programs and events for the society
              to come together to contribute from their side as an individual or
              groups. We create a platform as a form of event which has a
              certain motive and a goal to achieve at the end of the day.
              <br />
              <br />
              <Link to='causes'>
                <span>See our all causes</span>
              </Link>
            </p>
          </div>
          <img
            src='https://images.unsplash.com/photo-1543860856-79e478a9452b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt=''
            className='causesImage'
          />
        </div>
        <div className='image'>
          {/* {causes.map((data) => (
            <img
              src={data.photos[0]}
              alt={data.status}
              key={data._id}
              className="images"
            />
          ))} */}
          {more2 ? (
            <>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-1-1640499376088.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-Hami%20Nepal%20(232)-1640499376088.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-DSC08980-1640078733278.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-DSC09087-1640078733279.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-DSC05958-1640079414723.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-DSC06070-1640079414724.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-Hami%20Nepal%20(73)-1639767069588.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-3-1639767069597.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
              <div className='image-container'>
                <img
                  src='http://api.haminepal.org/img/causes/cause-3-1639767069597.jpeg'
                  alt=''
                  className='images'
                />
                <div className='image-container-content'>
                  <p>Iam kishor</p>
                </div>
              </div>
            </>
          )}
        </div>
        <center>
          <div onClick={() => setMore2(!more2)}>
            {more2 ? (
              <>
                <img src={downArrow} alt='arr' />
              </>
            ) : (
              <>
                <img src={upArrow} alt='arr' />
              </>
            )}
          </div>
        </center>
      </div>

      {/* <OurWorkTabs /> */}

      <Footer />
    </>
  );
}
