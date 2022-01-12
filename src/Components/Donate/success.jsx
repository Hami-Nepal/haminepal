import React, { useEffect } from "react";
import "./success.scss";
import logo from "../../Assets/logo.png";
import axios from "axios";
import baseURL from "../../api/baseURL";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-location";

function Success2() {
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [uploaded, setUploaded] = React.useState(null);

  useEffect(() => {
    setTimeout(downlaodPdf, 2000);
  }, []);

  const uploadDonation = () => {
    const donation = JSON.parse(localStorage.getItem("donation"));
    try {
      axios({
        method: "POST",
        url: baseURL + "/donations",
        data: donation,
        headers: {
          "Content-Type": "application/json",
        },
      })
        // .then(() => alert("Data Updated Successfully"))
        .then(() => setUploaded(true))
        .then(() => localStorage.removeItem("donation"));
      setLoading(false);
    } catch ({ response }) {
      setError(response);
      setLoading(false);
      setUploaded(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("donation") != null) {
      setTimeout(uploadDonation, 3000);
    }
  }, []);

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const downlaodPdf = () => {
    const input = document.getElementById("topdf");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
    });
    if (pdf) {
      domtoimage.toPng(input).then((imgData) => {
        pdf.addImage(imgData, "PNG", 0.5, 0.5);
        pdf.save("certificate.pdf");
      });
    }
  };
  const navigate = useNavigate();
  return (
    <>
      {localStorage.getItem("donation") != null ? (
        <div className='certificate_container'>
          <div className='certificate__border' id='topdf'>
            <img
              className='background__img'
              src='https://static.wixstatic.com/media/0a182a_33562bf2c7f0485790e3c13683e19cc9~mv2.png/v1/fill/w_602,h_480,al_c,q_85,usm_0.66_1.00_0.01/Untitled-1(5).webp'
              alt='image'
            />
            <div className='details'>
              <span className='span__title'>Certificate of Appreciation</span>
              <span className='span__tocertify'>
                <i>This is to certify that</i>
              </span>
              <span className='span__name'>
                Mr./Mrs.{" "}
                <b>
                  {JSON.parse(localStorage.getItem("donation")).first_name}{" "}
                  {JSON.parse(localStorage.getItem("donation")).last_name}
                </b>
              </span>
              <span className='span_amount'>
                <i>has donated the amount of</i>
              </span>
              <span className='span__amount__value'>
                <b>
                  Rs.
                  {JSON.parse(localStorage.getItem("donation")).donation_amount}
                </b>
              </span>
              <span className='span__for'>
                <i>
                  for{" "}
                  <b>{JSON.parse(localStorage.getItem("donation")).category}</b>{" "}
                  of HamiNepal
                </i>
              </span>
              <span className='span_dated'>
                <i>Dated</i>
              </span>
              <span className='date__value'>{date}</span>
              <b className='thankyou'>Thank you for your donation</b>
              <img className='logo__img' src={logo} alt='logo' />
            </div>
          </div>
          <button onClick={() => navigate({ to: "/" })}>
            Navigate to Home
          </button>
          {loading ? (
            <span className='loading'>Uploading Data.. Please Wait..</span>
          ) : (
            ""
          )}
          {uploaded ? (
            <span className='message'>Data Uploaded Successfully</span>
          ) : uploaded === false ? (
            <span className='failed'>Failed to Uplaod. Contact us </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "green", marginTop: "2rem" }}>
          <h3>Please Donate</h3>
          <a href='/'>Home</a>
        </div>
      )}
    </>
  );
}

export default Success2;
