import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-location";
import baseURL from "../../api/baseURL";

import "./style.scss";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CivilRightTabs = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(baseURL + "/civilrights");
      setCards(res.data.data);
    };
    fetchData();
  }, []);
  // const handleChange = (e, number) => {
  //   setCurrentPage(number)
  // }

  return (
    <>
      {cards.map((v) => {
        return (
          <>
            <div className='CivilRightMoments_content_listing'>
              <div className='CivilRightMoments_content'>
                <img src={v.photos[0]} alt='' />
                <p>
                  {v.introduction.slice(0, 300)}....
                  <br />
                  <Link to={"/civil-focused/" + v._id} className='SeeMoreText'>
                    See More
                  </Link>
                </p>
              </div>
              <div className='underline'></div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CivilRightTabs;
