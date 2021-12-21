import React from 'react';
import './style.scss';

import { Link } from 'react-location';
import { Button } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-location';

import axios from 'axios';
import baseURL from '../../api/baseURL';

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
      const res = await axios.get(baseURL + `/kindness?page=${currentPage}`);
      setPosts(res.data.data);
      setTotalData(res.data.total_data);
      setLoading(false);
    };
    fetchPosts();
  }, [currentPage]);

  const page = Math.ceil(totalData / 10);
  const token = localStorage.getItem('vinfo');

  const [requestStatus, setRequestStatus] = React.useState(null);
  const [activeCause, setActiveCause] = React.useState(null);
  const navigate = useNavigate();
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);

  const onParticipate = (kindnessId) => (event) => {
    event.preventDefault();

    setRequestStatus('pending');
    setActiveCause(kindnessId);

    axios
      .post(
        baseURL + '/kindness/volunteers/' + kindnessId,
        {
          volunteerId: localStorage.getItem('vID'),
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('vinfo'),
            volunteer: true,
          },
        }
      )
      .then(({ data }) => setRequestStatus('success'))
      .catch(({ response }) => setRequestStatus('failed'));
  };

  if (loading) {
    return (
      <div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const buttonForVolunteer = (card) => {
    const volunteer = card.volunteers?.find(
      (vol) => vol.volunteerId === localStorage.getItem('vID')
    );

    let buttonText = 'Participate';

    if (volunteer) {
      if (volunteer.participated) {
        buttonText = 'View';
      } else {
        buttonText = 'Request pending';
      }
    }

    if (activeCause === card._id) {
      if (requestStatus === 'pending') {
        buttonText = 'Loading...';
      } else if (requestStatus === 'success') {
        buttonText = 'Request sent!';
      } else if (requestStatus === 'failed') {
        buttonText = 'Already in the pending list';
      }
    }

    return (
      <Button
        onClick={
          buttonText === 'View'
            ? () => navigate({ to: '/kindness-focused/' + card._id })
            : onParticipate(card._id)
        }
        style={{ marginTop: 'auto' }}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <div className="kindness-container">
      <h3>Act of kindness</h3>
      <div className="kindness-neck">
        <div class="kindness-hero">
          {posts.map((data) => (
            <div className="kindnessCard__container" key={data._id}>
              <Link to={'/kindness-focused/' + data._id}>
                <img alt={data._id} src={data.photos[0]} />
                <div className="kindnessCard__container__title">
                  {data.title}
                </div>
                <div className="kindnessCard__container__description">
                  {data.summary}
                </div>
                {token ? (
                  buttonForVolunteer(data)
                ) : data.status === 'past' ? (
                  ''
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDonationFormOpen(true);
                      setActiveCause(data.name);
                    }}
                    style={{ marginTop: 'auto' }}
                  >
                    Donate
                  </Button>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '20px' }}></div>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <Pagination
          count={page}
          page={currentPage}
          onChange={paginate}
          shape="rounded"
          color="primary"
          size="large"
        />
      </Stack>
    </div>
  );
}
