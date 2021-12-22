import React from "react";
import Nav from "../../Components/NavBar/Nav";
import axios from "axios";
import "./style.scss";
import Footer from "../../Components/Footer/Footer";
import baseURL from "../../api/baseURL";
const CivilRightsFocused = () => {
  const [post, setPost] = React.useState({});

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;

    const fetchData = async () => {
      const resp = await axios.get(
        baseURL + "/civilrights/" + window.location.pathname.split("/").pop()
      );
      setPost(resp.data.data.civilRights);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='civil_container'>
        {/* @sectoin => topbar */}
        <Nav />
      </div>
      <div className='civil-focused-container'>
        <h1 className='civil-focused-container-title'>{post.title}</h1>
        {/* <img
          src={post.photos[0]}
          alt={post._id}
          className='civil-focused-container-title-image'
        /> */}
        <div className='civil-focused-container-details'>
          <h3>Introduction</h3>
          <p>{post.introduction}</p>
        </div>
        <div className='civil-focused-container-challenges'>
          <h3>Details</h3>
          <p>{post.body1}</p>
          <p>{post.body2}</p>
        </div>
        <div className='civil-focused-container-result'>
          <h3>Summary</h3>
          <p>{post.summary}</p>
        </div>
        <figure>
          {post.photos?.map((URL) => {
            return (
              <>
                <img alt={URL._id} src={URL} />
              </>
            );
          })}
        </figure>
      </div>
      <Footer />
    </>
  );
};

export default CivilRightsFocused;
