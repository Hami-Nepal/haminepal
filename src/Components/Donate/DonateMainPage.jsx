import React, { useEffect } from "react";
import "./style.scss";

import Switch from "@mui/material/Switch";

import Logo from "../../Assets/logo.png";
import { Button } from "@mui/material";
import KHALTI from "../../Assets/khalti.png";
import ESEWA from "../../Assets/esewa.png";
import GOFUNDME from "../../Assets/gofundme.png";
// import PAYPAL from "../../Assets/Paypal.png";
import axios from "axios";
import baseURL from "../../api/baseURL";
import validator from "validator";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Donate({ setIsDonationFormOpen }) {
  const [anonymousDonation, setAnonymousDonation] = React.useState(false);
  const [donationOption, setDonationOption] = React.useState("Nepal");
  const [donationFor, setDonationFor] = React.useState("causes");
  const [list, setList] = React.useState([]);
  const [currentDonation, setCurrentDonation] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    phoneError: "",
    streetError: "",
    cityError: "",
    cityError: "",
    stateError: "",
    zipError: "",
    countryErrror: "",
    amountError: "",
    messageError: "",
    paymentTypeError: "",
  });

  useEffect(() => {
    if (donationFor !== "administration") {
      axios
        .get(baseURL + "/" + donationFor + "?limit=100000")
        .then(({ data }) => setList(data.data));
    }
  }, [donationFor]);

  const [fields, setFields] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    donation_amount: "",
    donation_message: "",
    isVerified: true,
  });
  const onFieldChange = (field) => (event) =>
    setFields((prev) => ({ ...prev, [field]: event.target.value }));

  const validateAll = () => {
    let firstnameError = "";
    let lastnameError = "";
    let emailError = "";
    let phoneError = "";
    let streetError = "";
    let cityError = "";
    let stateError = "";
    let countryErrror = "";
    let amountError = "";
    let messageError = "";
    let paymentTypeError = "";
    if (fields.first_name === "") {
      firstnameError = "First Name is Required!";
    }
    if (fields.last_name === "") {
      lastnameError = "Last Name is Required!";
    }
    if (fields.email === "" || !validator.isEmail(fields.email)) {
      emailError = "Please Enter a valid email!";
    }
    if (fields.phone_number === "" || fields.phone_number.length < 10) {
      phoneError = "Please Enter a valid Phone Number!";
    }
    if (fields.street_address === "") {
      streetError = "Street Address is Required!";
    }
    if (fields.city === "") {
      cityError = "City is Required!";
    }
    if (fields.state === "") {
      stateError = "state is Required!";
    }
    if (fields.country === "") {
      countryErrror = "Country Name is Required!";
    }
    if (fields.donation_amount === "") {
      amountError = "Amount is Required!";
    }
    if (fields.donation_message === "") {
      messageError = "Donation Message is Required!";
    }
    if (paymentType === "") {
      paymentTypeError = "Payment Type is Required!";
    }
    if (
      firstnameError ||
      lastnameError ||
      emailError ||
      phoneError ||
      streetError ||
      cityError ||
      stateError ||
      countryErrror ||
      amountError ||
      messageError ||
      paymentTypeError
    ) {
      setErrorState({
        firstnameError,
        lastnameError,
        emailError,
        phoneError,
        streetError,
        cityError,
        stateError,
        countryErrror,
        amountError,
        messageError,
        paymentTypeError,
      });
      return false;
    }
    return true;
  };

  const validateFew = () => {
    let amountError = "";
    let messageError = "";
    let paymentTypeError = "";
    if (fields.donation_amount === "") {
      amountError = "Amount is Required!";
    }
    if (fields.donation_message === "") {
      messageError = "Donation Message is Required!";
    }
    if (paymentType === "") {
      paymentTypeError = "Payment Type is Required!";
    }
    if (amountError || messageError || paymentTypeError) {
      setErrorState({
        amountError,
        messageError,
        paymentTypeError,
      });
      return false;
    }
    return true;
  };

  const makeRandomString = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handlePayWithEsewa = () => {
    let path = "https://esewa.com.np/epay/main";

    let params = {
      tAmt: fields.donation_amount,
      amt: fields.donation_amount,
      txAmt: 0,
      psc: 0,
      pdc: 0,
      scd: "NP-ES-NEPALI",
      pid: makeRandomString(20),
      su: "https://haminepal.org/donation/success",
      fu: "https://haminepal.org/donation/error",
    };

    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in params) {
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const handlePayWithKhalti = () => {
    console.log("khalti");
  };
  // const handlePayWithPaypal = (_) => {
  //   console.log(paymentType);
  //   window.open(
  //     "https://www.paypal.com/donate/?hosted_button_id=WPKYMY6KG8S3U"
  //   );
  // };

  const handleDonate = (e) => {
    e.preventDefault();
    setLoading(true);

    let type =
      donationFor === "causes"
        ? "cause"
        : donationFor === "events"
        ? "event"
        : donationFor === "kindness"
        ? "kindness"
        : donationFor === "volunteers"
        ? "volunteer"
        : "";
    let donationforNew =
      donationFor === "causes"
        ? "cause"
        : donationFor === "events"
        ? "event"
        : donationFor === "kindness"
        ? "kindness"
        : donationFor === "volunteers"
        ? "volunteer"
        : donationFor;
    const data = {
      ...fields,
      category: donationforNew,
      [type]: currentDonation,
      payment_type: paymentType,
      is_anonymous: anonymousDonation,
    };

    if (!anonymousDonation && validateAll()) {
      setErrorState({
        firstnameError: "",
        lastnameError: "",
        emailError: "",
        phoneError: "",
        streetError: "",
        cityError: "",
        cityError: "",
        stateError: "",
        zipError: "",
        countryErrror: "",
        amountError: "",
        messageError: "",
        paymentTypeError: "",
      });

      try {
        localStorage.setItem("donation", JSON.stringify({ ...data }));
        // const dbname = "donation";
        // const requestDB = window.indexedDB.open(dbname);
        // requestDB.onupgradeneeded = () => {
        //   let db = requestDB.result;
        //   let store = db.createObjectStore("donation", {
        //     autoIncrement: true,
        //   });
        //   store.put(data);
        // };

        switch (paymentType) {
          case "ESEWA":
            handlePayWithEsewa();
            break;
          case "KHALTI":
            handlePayWithKhalti();
            break;
          // case "PAYPAL":
          //   handlePayWithPaypal();
          //   break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    } else if (anonymousDonation && validateFew()) {
      data.first_name = undefined;
      data.last_name = undefined;
      data.email = undefined;
      data.phone_number = undefined;
      data.street_address = undefined;
      data.city = undefined;
      data.state = undefined;
      data.zip_code = undefined;
      data.country = undefined;

      setErrorState({
        amountError: "",
        messageError: "",
        paymentTypeError: "",
      });
      try {
        localStorage.setItem("donation", JSON.stringify({ ...data }));
        // const dbname = "donation";
        // const requestDB = window.indexedDB.open(dbname);
        // requestDB.onupgradeneeded = () => {
        //   let db = requestDB.result;
        //   let store = db.createObjectStore("donation", {
        //     autoIncrement: true,
        //   });
        //   store.put(data);
        // };

        switch (paymentType) {
          case "ESEWA":
            handlePayWithEsewa();
            break;
          case "KHALTI":
            handlePayWithKhalti();
            break;
          // case "PAYPAL":
          //   handlePayWithPaypal();
          //   break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='donate__container'>
      <div className='donate__container__topbar'>
        <img src={Logo} alt='logo' />
        <h3>Donation Form</h3>
        <button onClick={() => setIsDonationFormOpen(false)}>
          <i className='ri-close-line'></i>
        </button>
      </div>

      <div className='donate__container__form'>
        <div className='donate__container__form__switch'>
          <Switch
            checked={anonymousDonation}
            onClick={() => setAnonymousDonation(!anonymousDonation)}
            {...label}
          />{" "}
          Donate Anonymously
        </div>

        {!anonymousDonation && (
          <>
            <h4>User Details</h4>
            <div>
              <input
                className={
                  errorState.firstnameError ? "input__field__error" : ""
                }
                type='text'
                placeholder={
                  errorState.firstnameError
                    ? errorState.firstnameError
                    : "First Name"
                }
                value={fields.first_name}
                onChange={onFieldChange("first_name")}
                required
              />
              <input
                className={
                  errorState.lastnameError ? "input__field__error" : ""
                }
                type='text'
                placeholder={
                  errorState.lastnameError
                    ? errorState.lastnameError
                    : "Last Name"
                }
                value={fields.last_name}
                onChange={onFieldChange("last_name")}
                required
              />
            </div>
            <div>
              <input
                className={errorState.emailError ? "input__field__error" : ""}
                type='email'
                placeholder={
                  errorState.emailError ? errorState.emailError : "Email "
                }
                value={fields.email}
                onChange={onFieldChange("email")}
                required
              />
              <input
                className={errorState.phoneError ? "input__field__error" : ""}
                type='number'
                placeholder={
                  errorState.phoneError ? errorState.phoneError : "Phone Number"
                }
                value={fields.phone_number}
                onChange={onFieldChange("phone_number")}
                required
              />
            </div>
            <input
              className={errorState.streetError ? "input__field__error" : ""}
              type='text'
              placeholder={
                errorState.streetError
                  ? errorState.streetError
                  : "Street Address"
              }
              value={fields.street_address}
              onChange={onFieldChange("street_address")}
              required
            />
            <div>
              <input
                className={errorState.cityError ? "input__field__error" : ""}
                type='text'
                placeholder={
                  errorState.cityError ? errorState.cityError : "City"
                }
                value={fields.city}
                onChange={onFieldChange("city")}
                required
              />
              <input
                className={errorState.stateError ? "input__field__error" : ""}
                type='text'
                placeholder={
                  errorState.stateError
                    ? errorState.stateError
                    : "State/Province/Region"
                }
                value={fields.state}
                onChange={onFieldChange("state")}
                required
              />
            </div>
            <div>
              <input
                type='number'
                placeholder='Zip Postal Code'
                value={fields.zip_code}
                onChange={onFieldChange("zip_code")}
                required
              />
              <input
                className={
                  errorState.countryErrror ? "input__field__error" : ""
                }
                type='text'
                placeholder={
                  errorState.countryErrror
                    ? errorState.countryErrror
                    : "Country"
                }
                value={fields.country}
                onChange={onFieldChange("country")}
                required
              />
            </div>
          </>
        )}

        <h4>Donation Details</h4>
        <div className='donation-details-ko-section'>
          <label className='donation__type'>
            <h3>
              Donation for{" "}
              <select
                name='Type'
                id='donation for'
                value={donationFor}
                onChange={(e) => setDonationFor(e.target.value)}
              >
                <option value='causes'>Cause</option>
                <option value='events'>Event</option>
                <option value='kindness'>Act of Kindness</option>
                <option value='administration'>Administration</option>
                <option value='volunteers'>Volunteers</option>
              </select>
            </h3>
            {donationFor !== "administration" ? (
              <select
                name='Type'
                id='donation for'
                value={currentDonation}
                onChange={(e) => setCurrentDonation(e.target.value)}
              >
                {donationFor === "causes" || donationFor === "events"
                  ? list.map((data) => (
                      <option value={data._id}>{data.name}</option>
                    ))
                  : donationFor === "kindness"
                  ? list.map((data) => (
                      <option value={data._id}>{data.title}</option>
                    ))
                  : list.map((data) => (
                      <option
                        value={data._id}
                      >{`${data.first_name} ${data.last_name}`}</option>
                    ))}
              </select>
            ) : (
              ""
            )}
          </label>
          <input
            className={errorState.amountError ? "input__field__error" : ""}
            type='number'
            placeholder={
              errorState.amountError ? errorState.amountError : "Amount"
            }
            value={fields.donation_amount}
            onChange={onFieldChange("donation_amount")}
            required
          />
        </div>
        <textarea
          className={errorState.messageError ? "input__field__error" : ""}
          name='message'
          id='message'
          cols='30'
          rows='2'
          placeholder={
            errorState.messageError ? errorState.messageError : "Message"
          }
          value={fields.donation_message}
          onChange={onFieldChange("donation_message")}
        />
        <h4>Pay with</h4>
        <select
          name='Type'
          id='select'
          value={donationOption}
          onChange={(e) => setDonationOption(e.target.value)}
        >
          <option value='Nepal'>National</option>
          <option value='International'>International</option>
        </select>
        {donationOption === "Nepal" ? (
          <div className='ul__span'>
            <ul>
              <li>
                <input
                  type='radio'
                  className='form-check'
                  name='payment_type'
                  id='esewa'
                  value='ESEWA'
                  onClick={() => setPaymentType("ESEWA")}
                />
                <img src={ESEWA} alt='esewa' />
              </li>
              <li>
                <input
                  type='radio'
                  className='form-check'
                  disabled='true'
                  name='payment_type'
                  id='khalti'
                  value='KHALTI'
                  onClick={() => setPaymentType("KHALTI")}
                />
                <img src={KHALTI} alt='khalti' />
              </li>
            </ul>
            <span>{errorState.paymentTypeError}</span>
          </div>
        ) : donationOption === "International" ? (
          <div className='ul__span'>
            <ul>
              <li>
                <input
                  type='radio'
                  className='form-check'
                  name='payment_type'
                  id='Paypal'
                  value='PAYPAL'
                  disabled='true'
                  onClick={() => setPaymentType("PAYPAL")}
                />
                <img
                  src={GOFUNDME}
                  onClick={(_) =>
                    window.open(
                      "https://www.gofundme.com/f/help-nepal-stop-covid19-human-castastrophe/donate",
                      "_blank"
                    )
                  }
                  alt='Paypal'
                  style={{ cursor: "pointer" }}
                />
              </li>
            </ul>
            <span>{errorState.paymentTypeError}</span>
          </div>
        ) : (
          ""
        )}
        <Button onClick={handleDonate}>Donate</Button>
        {errorState.firstnameError ||
          errorState.lastnameError ||
          errorState.messageError ||
          errorState.paymentTypeError ||
          errorState.phoneError ||
          errorState.stateError ||
          errorState.streetError ||
          errorState.amountError ||
          errorState.cityError ||
          errorState.emailError ||
          errorState.countryErrror}
      </div>
    </div>
  );
}
