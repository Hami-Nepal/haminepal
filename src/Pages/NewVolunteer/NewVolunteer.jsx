import React from "react";
import isEmail from "validator/lib/isEmail";
import "./style.scss";
import { Avatar, Button } from "@mui/material";
import MapContainer from "./mapcontainer";

import Footer from "../../Components/Footer/Footer";

import baseURL from "../../api/baseURL";

import NavBar from "../../Components/NavBar/Nav";

const fileReader = new FileReader();

export default function NewVolunteer() {
  const [volunteerImg, setVolunteerImg] = React.useState(null);
  const [volunteerImgUrl, setVolunteerImgUrl] = React.useState("");
  const [center, setCenter] = React.useState(null);
  const [fields, setFields] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
    age: "",
    bloodGroup: "",
    field_of_expertise: "",
    bio: "",
    motivation: "",
    country: "",
    state: "",
    city: "",
    street_address: "",
  });
  const emailInput = React.useRef();
  const pass = React.useRef();
  const [requestState, setRequestState] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onFieldChange = (field) => (event) =>
    setFields((prev) => ({ ...prev, [field]: event.target.value }));

  const onSelectImage = (event) => {
    setVolunteerImg(event.target.files[0]);

    if (event.target.files[0]) fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (e) => {
      setVolunteerImgUrl(e.target.result);
    };
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (requestState === "loading") return;

    setRequestState("loading");

    const formData = new FormData();

    for (let field in fields) {
      formData.append(field, fields[field]);
    }
    formData.append("photo", volunteerImg);

    fetch(baseURL + "/volunteers", {
      method: "post",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => {
        setRequestState("success");
      })
      .catch(({ response }) => {
        setRequestState("failed");
        setErrorMsg(response?.message || "");
      });
  };

  const handleLocationError = (hasGeolocation, string) => {
    console.log(hasGeolocation, string);
  };

  const fetchMyLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, "Browser doesnt Support");
    }
  };

  return (
    <div className='newVolunteer__container'>
      <NavBar />

      {/* @section => form */}
      <div className='newVolunteer__container__form'>
        <h1>Volunteer Details</h1>
        <div className='divider'></div>

        {/* @section => upload image */}
        <div className='uploadImage'>
          <label for='file-upload' className='custom-file-upload'>
            {/* on image upload preview here */}
            {volunteerImg ? <img src={volunteerImgUrl} alt='' /> : <Avatar />}
            <div>Upload Image</div>
          </label>
          <input id='file-upload' type='file' onChange={onSelectImage} />
          <Button
            // className='btn btn-primary mb-4'
            onClick={fetchMyLocation}
          >
            Fetch my Location
          </Button>
        </div>

        {/* @section => form container */}
        <div className='newVolunteer__container__form__inputs'>
          <form
            onSubmit={onFormSubmit}
            className='newVolunteer__container__form__inputs__input left'
          >
            <div>
              <input
                type='text'
                placeholder='First Name'
                value={fields.first_name}
                onChange={onFieldChange("first_name")}
                required
              />
              <input
                type='text'
                placeholder='Last Name'
                value={fields.last_name}
                onChange={onFieldChange("last_name")}
                required
              />
            </div>

            <div>
              <input
                type='email'
                placeholder='Email Address'
                required
                value={fields.email}
                ref={emailInput}
                onChange={onFieldChange("email")}
                onBlur={(e) => {
                  if (!isEmail(e.target.value)) {
                    emailInput.current.style.borderColor = "red";
                    emailInput.current.style.borderWidth = "2px";
                  } else {
                    emailInput.current.style.borderColor = "black";
                    emailInput.current.style.borderWidth = "1px";
                  }
                }}
              />
              <input
                type='number'
                placeholder='Phone Number'
                required
                value={fields.phone}
                onChange={onFieldChange("phone")}
              />
            </div>

            <div>
              <input
                type='password'
                placeholder='Password'
                required
                value={fields.password}
                onChange={onFieldChange("password")}
              />
              <input
                type='password'
                placeholder='Confirm Password'
                required
                value={fields.cPassword}
                ref={pass}
                onChange={onFieldChange("cPassword")}
                onBlur={(e) => {
                  if (fields.password !== fields.cPassword) {
                    pass.current.style.borderColor = "red";
                    pass.current.style.borderWidth = "2px";
                  } else {
                    pass.current.style.borderColor = "black";
                    pass.current.style.borderWidth = "1px";
                  }
                }}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Street Address'
                required
                value={fields.street_address}
                onChange={onFieldChange("street_address")}
              />
              <input
                type='text'
                placeholder='City'
                required
                value={fields.city}
                onChange={onFieldChange("city")}
              />
            </div>
            <div>
              <input
                type='number'
                placeholder='Age'
                required
                value={fields.age}
                onChange={onFieldChange("age")}
              />
              <input
                type='text'
                placeholder='Country'
                required
                value={fields.country}
                onChange={onFieldChange("country")}
              />
            </div>
            <div>
              <select
                value={fields.state}
                onChange={onFieldChange("state")}
                required
              >
                <option hidden>State</option>
                {[
                  "Province 1",
                  "Province 2",
                  "Bagmati",
                  "Gandaki",
                  "Lumbini",
                  "Karnali",
                  "Sudurpashchim",
                ].map((group) => (
                  <option value={group} key={group}>
                    {group}
                  </option>
                ))}
              </select>
              <input
                type='text'
                placeholder='Bio'
                required
                value={fields.bio}
                onChange={onFieldChange("bio")}
              />
            </div>
            <div>
              <select
                value={fields.bloodGroup}
                required
                onChange={onFieldChange("bloodGroup")}
              >
                <option hidden>Blood group</option>
                {[
                  "A +ve",
                  "B +ve",
                  "A -ve",
                  "AB +ve",
                  "AB -ve",
                  "B -ve",
                  "O +ve",
                  "O -ve",
                ].map((group) => (
                  <option value={group} key={group}>
                    {group}
                  </option>
                ))}
              </select>
              <input
                type='text'
                placeholder='Motivation'
                value={fields.motivation}
                required
                onChange={onFieldChange("motivation")}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Field of Expertise'
                required
                value={fields.field_of_expertise}
                onChange={onFieldChange("field_of_expertise")}
              />
            </div>

            {requestState === "success" ? (
              <p className={"volunteer volunteer__" + requestState}>
                Request sent successfully! Please wait while admins verify's
                your data.
              </p>
            ) : requestState === "failed" ? (
              <p className={"volunteer volunteer__" + requestState}>
                Something went wrong! {errorMsg}
              </p>
            ) : (
              ""
            )}

            <Button type='submit'>
              {requestState === "loading" ? "Loading..." : "Register"}
            </Button>
          </form>

          <div className='newVolunteer__container__form__inputs__input right'>
            <MapContainer
              apiKey='AIzaSyC9ygizb1G5HWBnHPE9UWOM23fPiuWZAiw'
              center={center || {}}
              handleMyLocationChange={(coords) => {
                // console.log(coords);
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
