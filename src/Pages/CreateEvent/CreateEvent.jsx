import React from 'react';
import './style.scss';

import { useForm } from 'react-hook-form';
import { Avatar } from '@mui/material';

import Event from '../../Assets/event.jpg';
import { Button } from '@mui/material';

import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/Nav';

import axios from 'axios';
import baseURL from '../../api/baseURL';

export default function CreateEvent() {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = React.useState([]);
  const [imageURLS, setImageURLS] = React.useState([]);
  const [requestStatus, setRequestStatus] = React.useState(null);
  const [error, setError] = React.useState(null);
  const token = localStorage.getItem('vinfo') || localStorage.getItem('user');
  const [eventTypes, setEventTypes] = React.useState([]);

  const onImageChange = (event) => {
    setImages([...event.target.files]);
    setImageURLS(
      [...event.target.files].map((file) => URL.createObjectURL(file))
    );
  };

  const onSubmit = (data) => {
    setRequestStatus('pending');
    setError(null);

    const formData = new FormData();
    images.map((image) => formData.append('photos', image));
    for (let field in data) {
      formData.append(field, data[field]);
    }

    const headers = {
      Authorization: 'Bearer ' + token,
    };

    if (localStorage.getItem('vinfo')) headers.volunteer = true;

    axios
      .post(baseURL + '/events', formData, {
        headers,
      })
      .then((data) => setRequestStatus('success'))
      .catch(({ response }) => {
        setRequestStatus('failed');
        setError(response?.data?.message);
      });
  };

  React.useEffect(() => {
    axios
      .get(baseURL + '/event_type')
      .then(({ data }) => setEventTypes(data.data))
      .catch(({ response }) => console.log(response));
  }, []);

  return (
    <div className="createEvent__container">
      <NavBar />

      {/* @section => form */}
      <div className="createEvent__container__form">
        <h1>Create Event</h1>
        <div className="divider"></div>

        {/* @section => form container */}
        <div className="createEvent__container__form__inputs">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="createEvent__container__form__inputs__input left"
          >
            <div>
              <input
                type="text"
                placeholder="Event Name"
                {...register('name')}
              />
              <select {...register('type')}>
                <option hidden selected>
                  Event Type
                </option>
                {eventTypes.map((obj) => (
                  <option value={obj.event_type}>{obj.event_type}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Balance"
                {...register('balance')}
              />
              <input
                type="text"
                placeholder="Country"
                {...register('country')}
              />
            </div>

            <div>
              <select {...register('state')}>
                <option hidden selected>
                  State
                </option>
                {[
                  'Province 1',
                  'Province 2',
                  'Bagmati',
                  'Gandaki',
                  'Lumbini',
                  'Karnali',
                  'Sudurpashchim',
                ].map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <input type="text" placeholder="City" {...register('city')} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Street Address"
                {...register('street_address')}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Challenges"
                {...register('challenges')}
              ></textarea>
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Difficulties"
                {...register('difficulties')}
              ></textarea>
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Description"
                {...register('description')}
              ></textarea>
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Summary"
                {...register('summary')}
              ></textarea>
            </div>

            <label className="select-event-images">
              {imageURLS.length ? (
                <div>
                  {imageURLS.map((url) => (
                    <img src={url} alt={url} />
                  ))}
                </div>
              ) : (
                <Avatar />
              )}
              Select images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onImageChange}
              />
            </label>

            <Button type="submit">
              {requestStatus === 'pending' ? 'Loading...' : 'Register'}
            </Button>

            {error && <p className="create-event-error-message">{error}</p>}

            {requestStatus === 'success' && (
              <p className="create-event-success-message">
                Event request successfully sent. Admin will verify and approve
                your request soon.
              </p>
            )}
          </form>

          <div className="createEvent__container__form__inputs__input right">
            <img src={Event} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// event type fetch garera drop down maa halnu parne
// state lai pani select button banaunu parne
