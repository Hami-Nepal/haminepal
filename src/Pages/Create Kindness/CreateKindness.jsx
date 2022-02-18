import React from "react";
import "./style.scss";

import { useForm } from "react-hook-form";
import { Avatar } from "@mui/material";

import Event from "../../Assets/event.jpg";
import { Button } from "@mui/material";

import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/Nav";

import axios from "axios";
import baseURL from "../../api/baseURL";

export default function CreateEvent() {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = React.useState([]);
  const [imageURLS, setImageURLS] = React.useState([]);
  const [requestStatus, setRequestStatus] = React.useState(null);
  const [error, setError] = React.useState(null);
  const token = localStorage.getItem("vinfo") || localStorage.getItem("user");

  const onImageChange = (event) => {
    setImages([...event.target.files]);
    setImageURLS(
      [...event.target.files].map((file) => URL.createObjectURL(file))
    );
  };

  const onSubmit = (data) => {
    setRequestStatus("pending");
    setError(null);

    const formData = new FormData();
    images.map((image) => formData.append("photos", image));
    for (let field in data) {
      formData.append(field, data[field]);
    }

    const headers = {
      Authorization: "Bearer " + token,
    };

    if (localStorage.getItem("vinfo")) headers.volunteer = true;

    axios
      .post(baseURL + "/kindness", formData, {
        headers,
      })
      .then((data) => {
        setRequestStatus("success");
        setImages([]);
      })
      .catch(({ response }) => {
        setRequestStatus("failed");
        setError(response?.data?.message);
      });
  };

  return (
    <div className='createEvent__container'>
      <NavBar />

      {/* @section => form */}
      <div className='createEvent__container__form'>
        <h1>Create Your Act of Kindness</h1>
        <div className='divider'></div>

        {/* @section => form container */}
        <div className='createEvent__container__form__inputs'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='createEvent__container__form__inputs__input left'
          >
            <div>
              <input
                type='text'
                placeholder='Act of Kindness Name'
                {...register("title")}
              />
            </div>

            <div>
              <input
                type='number'
                placeholder='Amount to be raised'
                {...register("balance")}
              />
            </div>
            <div>
              <textarea
                type='text'
                placeholder='Challenges'
                rows={5}
                {...register("challenges")}
              ></textarea>
            </div>

            <div>
              <textarea
                type='text'
                placeholder='Description'
                rows={5}
                {...register("details")}
              ></textarea>
            </div>
            <div>
              <textarea
                type='text'
                placeholder='Summary'
                rows={5}
                {...register("summary")}
              ></textarea>
            </div>
            <div>
              <textarea
                type='text'
                placeholder='Results'
                rows={5}
                {...register("results")}
              ></textarea>
            </div>

            <label className='select-kindness-images'>
              {imageURLS.length ? (
                <div className='images__kindness'>
                  {imageURLS.map((url) => (
                    <img src={url} alt={url} />
                  ))}
                </div>
              ) : (
                <Avatar />
              )}
              {images.length === 0 ? "Select Images" : ""}
              <input
                type='file'
                accept='image/*'
                multiple
                onChange={onImageChange}
              />
            </label>

            <Button type='submit'>
              {requestStatus === "pending" ? "Loading..." : "Create"}
            </Button>

            {error && <p className='create-event-error-message'>{error}</p>}

            {requestStatus === "success" && (
              <p className='create-event-success-message'>
                Act of kindness created successfully. Admin will verify and
                approve your request soon.
              </p>
            )}
          </form>

          <div className='createEvent__container__form__inputs__input right'>
            <img src={Event} alt='' />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// event type fetch garera drop down maa halnu parne
// state lai pani select button banaunu parne
