import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
      .then(({ data }) => setVolunteer(data.volunteer))
      .catch(({ response }) => console.log(response));
  }, []);

  return (
    <div className="volunteerProfile__container">
      <div className="volunteerProfile__container__blob"></div>

      <NavBar />

      {/* @section => main content */}
      <div className="volunteerProfile__container__main">
        <div className="volunteerProfile__container__main__userimage">
          <img src={volunteer.photo} alt="" />
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

                  <h4>Email Address</h4>
                  <input
                    required
                    defaultValue={volunteer.email}
                    {...register('email')}
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
                </div>

                <div>
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="item" key={item}>
              <img
                src="https://images.unsplash.com/photo-1617817546276-80b86dd60151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="item__image"
                alt="project"
              />
              <div className="item__info">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptate itaque dignissimos provident earum porro eius nesciunt
                dolores quo laudantium! Facere quod consectetur debitis hic
                dignissimos molestiae accusamus quos ipsa magni.
              </div>
              <Button>Donate</Button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// yo kai pani haina
