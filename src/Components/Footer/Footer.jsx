import React from "react";
import "./style.scss";

import { Link } from "react-location";

export default function Footer() {
  return (
    <>
      <div className='footer__container'>
        <div className='sitemap'>
          <h3>Sitemap</h3>
          <Link to='/'>Home</Link>
          <Link to='/ourworks'>Work</Link>
          <Link to='/about'>About Us</Link>
          <Link to='/volunteer'>Our Volunteer</Link>
          <Link to='/contact'>Contact</Link>
        </div>
        <div className='social'>
          <h3>Social Links</h3>
          <a href='https://www.instagram.com/haminepal_/'>Instagram</a>
          <a href='https://www.facebook.com/HamiNepalNPO'>Facebook</a>
          <a href='https://twitter.com/Haminepal_'>Twitter</a>
          <a href='/'>LinkedIn</a>
        </div>
        <div className='newsletter'>
          <h3>Newsletter</h3>
          <div className='newsletter__inputHolder'>
            <input type='text' placeholder='Enter your email address' />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className='footer__container__copyrightInfo'>
        {/* <hr style={{ height: "1.5px", width: "100%" }}></hr> */}
        <div className='copyright'>&copy; Hami Nepal. All Rights Reserved</div>
        <div style={{ fontWeight: "bold" }}>
          {" "}
          Voluntarily Developed by{" "}
          <a
            href='https://hashtechnologies.net'
            target='_blank'
            rel='noreferrer'
          >
            Hash Technologies
          </a>
        </div>
      </div>
    </>
  );
}
