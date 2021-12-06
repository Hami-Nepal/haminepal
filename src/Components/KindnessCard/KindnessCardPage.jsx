import React from "react";
import "./style.scss";

import { Link } from "react-location";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
// import baseURL from "../../api/baseURL"

export default function KindnessCardPage(props) {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalData, setTotalData] = React.useState(0);
  const paginate = (e, number) => {
    setCurrentPage(number);
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.haminepal.org/api/v1/kindness?page=${currentPage}`
      );
      setPosts(res.data.data);
      setTotalData(res.data.total_data);
      setLoading(false);
    };
    fetchPosts();
  }, [currentPage]);

  const page = Math.ceil(totalData / 10);

  if (loading) {
    return (
      <div class='text-center'>
        <div class='spinner-border text-primary' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='kindness-header'>
      <h3>Act of kindness</h3>
      <div className='kindness-neck'>
        <div class='kindness-hero'>
          {posts.map((data) => (
            <div className='kindnessCard__container' key={data._id}>
              <Link to={"/kindness-focused/" + data._id}>
                <img alt={data._id} src={data.photos[0]} />
                <div className='kindnessCard__container__title'>
                  {data.title}
                </div>
                <div className='kindnessCard__container__description'>
                  {data.summary}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "20px" }}></div>
      <Stack justifyContent='center' alignItems='center' spacing={2}>
        <Pagination
          count={page}
          page={currentPage}
          onChange={paginate}
          shape='rounded'
          color='primary'
          size='large'
        />
      </Stack>
    </div>
  );
}
