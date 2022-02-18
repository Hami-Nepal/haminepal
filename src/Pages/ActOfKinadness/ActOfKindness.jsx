import React from "react";

import "./style.scss";
import { Link } from "react-location";

import NavBar from "../../Components/NavBar/Nav";
import Footer from "../../Components/Footer/Footer";
import KindnessCardPage from "../../Components/KindnessCard/KindnessCardPage";

const ActOfKindness = () => {
  const token = localStorage.getItem("vinfo") || localStorage.getItem("user");
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <NavBar />
      <div className='kindness_container'>
        <div className='kindness_container__landing'>
          <div className='slogan'>
            <h1>Act of kindness</h1>
            <p>CHANGING THE WORLD ONE RANDOM ACT OF KINDNESS AT A TIME</p>
            {token === null ? (
              <Link to='/login'>
                Signin to create act of kindness around you
              </Link>
            ) : (
              <Link to='/create-kindness'>Create Act of Kindness</Link>
            )}
          </div>
        </div>
      </div>
      <KindnessCardPage />
      <Footer />
    </>
  );
};
export default ActOfKindness;
