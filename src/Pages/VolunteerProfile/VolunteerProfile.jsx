import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-location';

import './style.scss';

import Footer from '../../Components/Footer/Footer';
import { Button } from '@mui/material';
import baseURL from '../../api/baseURL';
import Switch from '@mui/material/Switch';
import axios from 'axios';

import NavBar from '../../Components/NavBar/Nav';

export default function VolunteerProfile(props) {
  const [volunteer, setVolunteer] = useState({});
  const isLoggedIn = localStorage.getItem('vinfo');
  const isMyProfile =
    localStorage.getItem('vID') === window.location.pathname.split('/').pop();

  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit } = useForm();
  const [requestState, setRequestState] = useState(null);
  const [projects, setProjects] = useState([]);

  const onSubmit = (formData) => {
    if (!formData.age) return;

    setRequestState('pending');

    axios
      .put(
        baseURL + '/volunteers/' + window.location.pathname.split('/').pop(),
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + isLoggedIn,
          },
        }
      )
      .then(({ data }) => {
        setVolunteer(data.data);
        setRequestState('success');
        setEditMode(false);
      })
      .catch(({ response }) => {
        setRequestState('failed');
      });
  };

  const setActive = async () => {
    const { data } = await axios.put(
      baseURL + '/volunteers/' + window.location.pathname.split('/').pop(),
      { isActive: !volunteer.isActive },
      {
        headers: {
          Authorization: 'Bearer ' + isLoggedIn,
        },
      }
    );

    setVolunteer(data.data);
  };

  useEffect(() => {
    fetch(baseURL + '/volunteers/' + window.location.pathname.split('/').pop())
      .then((data) => data.json())
      .then(async ({ data }) => {
        setVolunteer(data.volunteer);

        let promises = data.volunteer.cause_involvement.map((id) =>
          axios.get(baseURL + '/causes/' + id)
        );

        promises = [
          ...promises,
          ...data.volunteer.event_involvement.map((id) =>
            axios.get(baseURL + '/events/' + id)
          ),
        ];

        const res = await Promise.all(promises);

        setProjects(
          res.map(({ data }) => (data.data.cause ? data.data.cause : data.data))
        );
      })
      .catch(({ response }) => console.log(response));
  }, []);

  const updateVolunteerProfile = (e) => {
    if (!e.target.files.length) return;

    const formData = new FormData();
    formData.append('photo', e.target.files[0]);

    axios
      .put(
        baseURL + '/volunteers/' + window.location.pathname.split('/').pop(),
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + isLoggedIn,
          },
        }
      )
      .then(({ data }) => {
        setVolunteer(data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <div className="volunteerProfile__container">
      <div className="volunteerProfile__container__blob"></div>

      <NavBar />

      {/* @section => main content */}
      <div className="volunteerProfile__container__main">
        <div className="volunteerProfile__container__main__userimage">
          <picture>
            <img
              src={
                volunteer.photo !== 'null'
                  ? volunteer.photo
                  : 'data:image/png;base64,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'
              }
              alt=""
            />
            {isLoggedIn && isMyProfile && (
              <label>
                Update
                <input
                  type="file"
                  onChange={updateVolunteerProfile}
                  accept="image/*"
                />
              </label>
            )}
          </picture>
          <div className="name">
            {volunteer.first_name} {volunteer.last_name}
          </div>
          <div className="position">{volunteer.field_of_expertise}</div>
          {isLoggedIn && isMyProfile && (
            <>
              <div style={{ marginTop: '1.5rem' }}>Status</div>
              <Switch checked={volunteer.isActive} onClick={setActive} />
            </>
          )}
        </div>
        <form
          className="volunteerProfile__container__main__userinfo"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form_container">
            {editMode ? (
              <>
                <div>
                  <h4>First name</h4>
                  <input
                    required
                    defaultValue={volunteer.first_name}
                    {...register('first_name')}
                  />

                  <h4>Last name</h4>
                  <input
                    required
                    defaultValue={volunteer.last_name}
                    {...register('last_name')}
                  />

                  <h4>Field of expertise</h4>
                  <input
                    required
                    defaultValue={volunteer.field_of_expertise}
                    {...register('field_of_expertise')}
                  />

                  <h4>Phone Number</h4>
                  <input
                    type="number"
                    required
                    defaultValue={volunteer.phone}
                    {...register('phone')}
                  />

                  <h4>City</h4>
                  <input
                    required
                    defaultValue={volunteer.city}
                    {...register('city')}
                  />

                  <h4>Street Address</h4>
                  <input
                    required
                    defaultValue={volunteer.street_address}
                    {...register('street_address')}
                  />

                  <h4>State</h4>
                  <select
                    defaultValue={volunteer.state}
                    required
                    {...register('state')}
                  >
                    {[
                      'Province 1',
                      'Province 2',
                      'Bagmati',
                      'Gandaki',
                      'Lumbini',
                      'Karnali',
                      'Sudurpashchim',
                    ].map((group) => (
                      <option value={group} key={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4>Age</h4>
                  <input
                    type="number"
                    required
                    defaultValue={volunteer.age}
                    {...register('age')}
                  />

                  <h4>Country</h4>
                  <input
                    required
                    defaultValue={volunteer.country}
                    {...register('country')}
                  />

                  <h4>Blood group</h4>
                  <select
                    defaultValue={volunteer.bloodGroup}
                    required
                    {...register('bloodGroup')}
                  >
                    {[
                      'A +ve',
                      'B +ve',
                      'A -ve',
                      'AB +ve',
                      'AB -ve',
                      'B -ve',
                      'O +ve',
                      'O -ve',
                    ].map((group) => (
                      <option value={group} key={group}>
                        {group}
                      </option>
                    ))}
                  </select>

                  <h4>Motivation</h4>
                  <input
                    required
                    defaultValue={volunteer.motivation}
                    {...register('motivation')}
                  />

                  <h4>Bio</h4>
                  <input
                    required
                    defaultValue={volunteer.bio}
                    {...register('bio')}
                  />

                  <h4>Number of Projects Involved</h4>
                  <p>
                    {volunteer.event_involvement?.length +
                      volunteer.cause_involvement?.length}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4>Phone Number</h4>
                  <p>{volunteer.phone}</p>

                  <h4>Email Address</h4>
                  <p>{volunteer.email}</p>

                  <h4>City</h4>
                  <p>{volunteer.city}</p>

                  <h4>State</h4>
                  <p>{volunteer.state}</p>

                  <h4>Street Address</h4>
                  <p>{volunteer.street_address}</p>

                  <h4>Age</h4>
                  <p>{volunteer.age}</p>
                </div>

                <div>
                  <h4>Country</h4>
                  <p>{volunteer.country}</p>

                  <h4>Blood group</h4>
                  <p>{volunteer.bloodGroup}</p>

                  <h4>Motivation</h4>
                  <p>{volunteer.motivation}</p>

                  <h4>Bio</h4>
                  <p>{volunteer.bio}</p>

                  <h4>Number of Projects Involved</h4>
                  <p>
                    {volunteer.event_involvement?.length +
                      volunteer.cause_involvement?.length}
                  </p>
                </div>
              </>
            )}
          </div>
          {isLoggedIn && isMyProfile ? (
            editMode ? (
              <>
                <Button type="submit" onClick={onSubmit}>
                  {requestState === 'pending' ? 'Loading...' : 'Save'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setRequestState(null);
                  }}
                >
                  Cancel
                </Button>
                {requestState === 'failed' && (
                  <p className="volunteer__submit__error">
                    Something went wrong!
                  </p>
                )}
              </>
            ) : (
              <Button type="button" onClick={() => setEditMode(true)}>
                Edit profile
              </Button>
            )
          ) : (
            ''
          )}
        </form>
      </div>

      {/* @Section => worked projects   */}
      <div className="volunteerProfile__container__workedProjects">
        <h1>Projects worked on</h1>

        <div className="volunteerProfile__container__workedProjects__items">
          {projects.map((card) => (
            <div className="item" key={card._id}>
              <Link
                to={
                  card.cause_type
                    ? '/cause-focused/' + card._id
                    : '/event-focused/' + card._id
                }
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={
                    card.photos.length
                      ? card.photos[0]
                      : 'https://images.unsplash.com/photo-1617817546276-80b86dd60151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  }
                  className="item__image"
                  alt="project"
                />
                <h2>{card.name}</h2>
                <div className="item__info">{card.description}</div>
              </Link>
            </div>
          ))}
          {!projects.length && <p>Nothing yet</p>}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// yo kai pani haina
