import React, { useEffect, useState } from "react";
import "./style.scss";
import Carousel from "react-elastic-carousel";
import Logo from "../../Assets/logo.png";

import BannerVideo from "../../Assets/banner.mp4";
import BannerVideoWebm from "../../Assets/banner.webm";
import BannerVideoOgm from "../../Assets/banner.ogm";
import BannerPoster from "../../Assets/poster-banner.png";
import MapVideo from "../../Assets/nepalMap.mp4";

import { Link } from "react-location";
import { Helmet } from "react-helmet";

import OurSupporters from "../../Mocks/ourSupporter.json";
import OurPartners from "../../Mocks/ourPartner.json";
import InfluenerCarousel from "../../Components/Influencers/InfluencersCarousel";

import KindnessCard from "../../Components/Act of Kindness/KindnessCard";
import BoardMembersCarousel from "../../Components/BoardMembers/BoardMembersCarousel";
import Footer from "../../Components/Footer/Footer";
import Donate from "../../Components/Donate/Donate";

import baseURL from "../../api/baseURL";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function Home() {
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);
  const [isDonationFormOpen, setIsDonationFormOpen] = React.useState(false);
  const [kindness, setKindness] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalKindDonations, setTotalKindDonations] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalKindExpenses, setTotalKindExpenses] = useState(0);
  const [homeHero, setHomeHero] = useState({});
  const arr = [
    "Kathmandu",
    "Pokhara",
    "Hetauda",
    "Birgung",
    "Manang",
    "Besisahar",
    "Bhaktapur",
    "Helambu",
    "Remachap",
    "Bhojpur",
    "Bheri",
    "Doti",
    "Dhangadi",
    "Mugu",
    "Karnali",
    "Rukum",
    "Bardiya",
  ];

  useEffect(() => {
    fetch(baseURL + "/kindness/featured")
      .then((data) => data.json())
      .then(({ featured }) => setKindness(featured))
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalDonations")
      .then((data) => data.json())
      .then(({ data }) => setTotalDonations(data.length ? data[0].donation : 0))
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalkindDonations")
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalKindDonations(data.length ? data[0].kinddonation : 0)
      )
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalExpenses")
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalExpenses(data.length ? data[0].total_expenses : 0)
      )
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/find/totalkindExpenses")
      .then((data) => data.json())
      .then(({ data }) =>
        setTotalKindExpenses(data.length ? data[0].total_kind_expenses : 0)
      )
      .catch(({ response }) => console.log(response));

    fetch(baseURL + "/homepage")
      .then((data) => data.json())
      .then(({ data }) => setHomeHero(data[0]))
      .catch(({ response }) => console.log(response));
  }, []);
  // console.log(totalKindExpenses);
  const isLoggedIn = !!(
    localStorage.getItem("user") || localStorage.getItem("vinfo")
  );

  const carouselRef = React.useRef(null);
  let resetTimeout;

  return (
    <div className='home__container'>
      <Helmet>
        <title>Hami Nepal | Organization</title>
      </Helmet>
      {/** @section => landing */}
      <div className='home__container__landing'>
        <video
          className='Home__video'
          src={homeHero?.videoUrl}
          preload='metadata'
          autoPlay={true}
          muted={true}
          loop='loop'
          playsInline={true}
          poster={BannerPoster}
        >
          <source src={BannerVideo} type='video/mp4' />
          <source src={BannerVideoWebm} type='video/webm' />
          <source src={BannerVideoOgm} type='video/ogg' />
        </video>

        <div className='home__container__landing__topbar'>
          <a href='/'>
            <img
              className='home__container__landing__topbar__logo'
              src={Logo}
              alt='haminepal logo'
            />
          </a>

          <button onClick={() => setIsActiveMenu(true)}>
            <i className='ri-menu-line'></i>
          </button>
        </div>

        <div className='home__container__landing__footer'>
          <div>
            <h1 style={{ color: homeHero?.color || "white" }}>
              {homeHero?.content}
            </h1>
            <Link
              onClick={() => setIsDonationFormOpen(true)}
              className='home__container__landing__footer__donate'
              to='/'
              style={{
                color: homeHero?.color || "white",
                borderColor: homeHero?.color || "white",
              }}
            >
              Donate
            </Link>
          </div>

          <Link
            className='home__container__landing__footer__ourWork'
            to='/our-work'
            style={{
              color: homeHero?.color || "white",
              borderColor: homeHero?.color || "white",
            }}
          >
            Our Work
          </Link>
        </div>

        {/** @dev this is dismissiable donation form */}
        <div
          style={{ display: isDonationFormOpen ? "block" : "none" }}
          className='home__container__landing__donationForm'
        >
          <Donate
            setIsDonationFormOpen={setIsDonationFormOpen}
            donation_type={"Administrator"}
          />
        </div>

        <div
          className='home__container__landing__hiddenMenu'
          style={{
            display: isActiveMenu ? "flex" : "none",
          }}
        >
          <div className='home__container__landing__hiddenMenu__topbar'>
            <a href='/'>
              <img
                className='home__container__landing__topbar__logo'
                src={Logo}
                alt='haminepal logo'
              />
            </a>

            <button onClick={() => setIsActiveMenu(false)}>
              <i className='ri-close-line'></i>
            </button>
          </div>
          <ul className='home__container__landing__hiddenMenu__items left'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/news'>News</Link>
            </li>
            <li>
              <Link to='/act-of-kindness'>Act of Kindness</Link>
            </li>
            <li>
              <Link to='/civil-rights-movement'>Civil Rights Movements</Link>
            </li>
            <li>
              <Link to='/contact'>Contact Us</Link>
            </li>
            <div className='divider'></div>
            <li>
              {isLoggedIn ? (
                <Link
                  to='/'
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link to='/signup'>Signup /</Link>
                  <Link to='/login'> Login</Link>
                </>
              )}
            </li>
          </ul>
          <ul className='home__container__landing__hiddenMenu__items right'>
            <li>
              <Link to='/about'>About Us</Link>
            </li>
            <li>
              <Link to='/causes'>Cause</Link>
            </li>
            <li>
              <Link to='/events'>Events</Link>
            </li>
            <li>
              <Link to='/transparency'>Transparency</Link>
            </li>
            <li>
              <Link to='/volunteer'>Volunteers</Link>
            </li>
          </ul>
        </div>
      </div>

      {/** @section => transparency */}
      <div className='home__container__transparency'>
        <Link to='/transparency' style={{ textDecoration: "none" }}>
          <h1 style={{ color: "black" }}>Transparency</h1>
        </Link>

        <div className='home__container__transparency__column'>
          <div className='home__container__transparency__info home__container__transparency__kindness'>
            <h2>Kinds</h2>
            <div className='home__container__transparency__info__item'>
              <h2 style={{ fontFamily: "sans-serif" }}>
                Rs {new Intl.NumberFormat("en-IN").format(totalKindDonations)}
              </h2>
              <div className='home__container__transparency__info__item__title'>
                Donation Received
              </div>
            </div>
            <div className='home__container__transparency__info__item center'>
              <h2 style={{ fontFamily: "sans-serif" }}>
                Rs {new Intl.NumberFormat("en-IN").format(totalKindExpenses)}
              </h2>
              <div className='home__container__transparency__info__item__title'>
                Expenditure
              </div>
            </div>
            <div className='home__container__transparency__info__item'>
              <h2 style={{ fontFamily: "sans-serif" }}>
                Rs{" "}
                {new Intl.NumberFormat("en-IN").format(
                  totalKindDonations - totalKindExpenses
                )}
              </h2>
              <div className='home__container__transparency__info__item__title'>
                Remaining Donation
              </div>
            </div>
          </div>
          <hr />
          <div className='home__container__transparency__info'>
            <h2>Cash</h2>
            <div className='home__container__transparency__info__item'>
              <h2 style={{ fontFamily: "sans-serif" }}>
                Rs {new Intl.NumberFormat("en-IN").format(totalDonations)}
              </h2>
              <div className='home__container__transparency__info__item__title'>
                Donation Received
              </div>
            </div>
            <div className='home__container__transparency__info__item center'>
              <h2 style={{ fontFamily: "sans-serif" }}>
                Rs {new Intl.NumberFormat("en-IN").format(totalExpenses)}
              </h2>
              <div className='home__container__transparency__info__item__title'>
                Expenditure
              </div>
            </div>
            <div className='home__container__transparency__info__item'>
              <h2 style={{ fontFamily: "sans-serif" }}>
                Rs{" "}
                {new Intl.NumberFormat("en-IN").format(
                  totalDonations - totalExpenses
                )}
              </h2>
              <div className='home__container__transparency__info__item__title'>
                Remaining Donation
              </div>
            </div>
          </div>

          {/* <hr />

          <div className='home__container__transparency__topDonors'>
            <h2>Top Donors</h2>

            {topDonors.map((user, index) => (
              <div
                className={`home__container__transparency__topDonors__donor ${
                  index !== 0 && "border"
                }`}
                key={user._id}
              >
                <div>
                  <img src={Logo} alt='donor icon' />
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                </div>
                <b>Rs. {user.donation_amount}</b>
              </div>
            ))}

            <Link to='/'>Learn more about transparency</Link>
          </div> */}
        </div>
      </div>

      {/* @section HamiNepalMap */}
      <div className='home_container_mapVideo'>
        <video
          className='map__video'
          src={MapVideo}
          preload='metadata'
          autoPlay={true}
          muted='true'
          loop='loop'
          playsInline='true'
          poster={BannerPoster}
        />
        <div className='home_container_mapVideo_right'>
          <h1>Places Reached</h1>
          <ul>
            {arr.map((place, index) => (
              <li key={index}>{place}</li>
            ))}
          </ul>
        </div>
      </div>

      {/** @section => act of kindness */}
      <div className='home__container__actOfKindness'>
        <h1>
          Act of Kindness <span style={{ color: "red" }}>Featured</span>
        </h1>

        <div className='home__container__actOfKindness__items'>
          {kindness.map((card) => (
            <KindnessCard {...card} key={card._id} />
          ))}
        </div>
      </div>

      {/** @section => how we work */}
      <div className='home__container__howWeWork'>
        <h1>How we work</h1>
        <div className='home__container__howWeWork__detail'>
          <p>
            Our organization runs on a no-fee basis, with all volunteers
            donating their time and effort, which motivates our team to work and
            achieve more for the people.
          </p>
          <Link to='/about'>See More</Link>
        </div>
      </div>

      {/** @section => our board members */}
      <div className='home__container__boardMembers'>
        <h1>Our Board Members</h1>
        <BoardMembersCarousel />
      </div>

      {/** @section => coming soon */}
      <div className='home__container__comingSoon'>
        <img
          className='home__container__comingSoon__banner'
          src='https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='app coming soon'
        />
        <div className='home__container__comingSoon__contents'>
          <h1>Coming Soon</h1>
          <span>Hami Nepal App</span>

          <p>Hami Nepal app is coming soon! Stay tuned.</p>

          <div className='links'>
            <Link to='/'>
              <img
                src='https://www.wardwiz.in/catalog/view/theme/welserv/wardwiz/images/download_ios.png'
                alt=''
              />
            </Link>
            <Link to='/'>
              <img
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAB6CAMAAAC89RUgAAABelBMVEUAAAD///+qqqp8fHybm5sA8HampqZYWFgA4P8Axf8Ayv/z8/MA0/8Azv8A1f8A4f8A2v/p6ene3t7JyckwMDAA0f8A3P8KCgoAwv8Ay/8Ax/9sbGzu7u7Dw8P5Nke4uLj/ygBhYWEnJyf/xQD/zgD1M0k1NTWenp7/1gD/wQD+OUTY2NjvL0yRkZEjIyNJSUmEhIQYGBjpK08As8xBQUEA8nH/2wBoaGjlKFEF6HUAqsz+kSJSUlIL33UA3J1dXV0K4nUBw+wAoMwTxWkAp8z/LTiwbYm1XHgURSsfp2Mk1X0WWTgNhqYP1nQcsmcROicDLz0MIhgWh00Tb0EUl1QJFREB44cA4YwJLBuDqjsmFQmo1TyIbxTfswxmVRPIoxBJPRKtjxIsJw4A2p52ZhOZhhG4XofcvwCymgBKQACjiQA2LQDUqgDqkBqbIikcAAi3KTEvCg3PLjhPERV1GiCLGyujIDTIJkG3Ij5rEyW5UXQAgJAAHSEAanjCvU4HAAARJklEQVR4nO2d+WPbthXHeZlOwqQJSTeqI8qMFEdMI1OHp8Txoszu2iRtVndX125Lu3ZHj21d1x1p0m773wfgASRAghQUSaYt8/tDQvME8CHwHh4AStMTBb4f2latCmWHvu+kRDS20bMj27aNWpUKIbCiXgaOi9CgQ/HQrFWhhjGmYEUuD8dHaGxzrNWqXGMToYj9FE4LsWmOqk5WLdDINAwrZHD8yLDrWnOCNLANqwVwvMiINqpOTy1e3ciwPAIHeWndqlNTS9QYuQUYjm8bB1WnpVZWTSPyEZzIiKtOSa2cGpYR65pnG5OqU1Irr7YR9TTfthtVJ6RWXiPD9rXIGFadjloyxUaE4DSrTkYtmUzkC9jGetXJqCVT07BqOCdV64ZdwzmpquGcYNVwTrBqOCdYNZwTrBMCp297uq47BouNrwcuU2808FxObGhjGLixNgi4Iz3+jiMYh/eT/vXQdVtsG53bX36m5pYKnLffefLknZ8sMxV2MtskhB3tdP6J3p/ovBgcS9ctTTjkcHe00r3NdA8jhTY7y8zPgqQA590nR0dHDx6899NlpaEBc00cMiPII2PlGE4A8kYDF/9P9zgMTozhDBy8C11Lzkxv2SK1ptUid7bJLgyHXYy2VgPOzzbfODoieN75+XLSgKcy9PZGjUY/RuVs4l0Ijqc1QBre0DbQIdiiInDIji7ioDW4Q4SNTSiPMR4yIELqEm3YVgbOuxdee+PJA8TmweHRL5aRhChtzbS+By0PgSOoQ+BwAjhYCI5gbrQh14KRJhNPj4CGrk32rQycH187/9obmA2is3/0y4WnoOukbJAdh//mg4NOjdK/QlyxCBy05ZJdqwQH0XlyiNgcHu7vv7loz2CY46DNCcdEDPgBKvAiEJyJTw3Q6sC5cB7T+eCQsEFasGfQ45qgRHPBMYSKQ6rOEOAMaBO3QnCuETof7gOb/bXD93+1wBQgNwxml4w6fSrw1qDzEoCVmAUOwi0MuyMsBvl3Hds3fOrqwNm8xuhQra09WKBngOAMyIbteqDeiO/n0G7KDHBcqB78mS0KR/OIO7hScIDOB4wN0tHCTE8CJ2Q4PIADpFw6aWsGOB67I5VFPA6Ac0D6qqsFh9JZY2yQ3nx7MSnwmH8bQTtGSrqddcBmgRPSzhL3t8Xg4D/CFYJz6QJPZy3VYjqlFu0kMjkUzss7BDH4zonAC6BwGug+3VWCk9L5kGOzdudwEaYHeVAut7yhSVjNBWekMx+DyIZ7UTj4Ab2VgsPVnTsCnkV0SlvCix7oTnfeTijypZ3E6jSpU8HgkGjRqsB569ImR2dTpLMI09NBZsaj7lXHgyIXY2vkSCkcoRkjdoyZnSGLqCVwRqsE59VNns6FLJ219+Y1PWMcjg4no9EkZCXZJlFqIhdGXmaCs4EX7XlGHBsYE1SrBA6+cnXgXBLoXMvSubP//pyJ6CfrU1mBc/0cWozlcLzMoryGn96ABu5SOLhirQ6clA6Os53P1Z07h/OaHpPiCekA5V5atnRYbEPPwLHYQA2G4+ZWTLYpnpD1R6MUzlhflcG2ty5eytB5LUcHeQZzm57x3mTBi+vG7fXTvSRMEc5UOmt33lzSUNwZlgKcV14V6JwvoIM6pceW6jMiJTiKdO7sL2Wk9OxqOpwfIjgSOh/K6s7aEkZKz7BU4Fycgc7C4qG1FOHMRGftvV8fW+pXXGpw5HR+VEBnf6EjpWdYKnCK6JwvorP2m98eWwZWWQpwrsxM5+n1Gx8dWw5WWGpwsnQulNJ5euP69e2Pf3dseVhZKcIpoiOzO09vIDjXt7c/+fS4MrGqUoWjTgexwXCub9/a/v0fZk7PRjtu9ZBa8cFpCE0uV8pwVOk8fZ3B2UZ4Pprp0yCjJv/t0cBvz5m56WrENv6mptrJffwJVE7Ddf79GeKvc0YL/Z6gOpxCOn+8k2XD4GzfuvvFn9TTErt6Rt7e3BksV8Mjr4HayRvZ5OlOK529CKPfCw2sK8C5+kpK5+IUOk9fF+Bs37p196tPFVOSQ4PVWu4KNIDjqp284cgSyGpPRXCuKNNBbLJwbt29+6WK6bEkGSfZXeqX4OaHozu08KqCo0oHs8nBQXhuTW/bWlxbFoYhN26tL7NpWwAccVJPBXDU6BA2Ejio8nw2JRnJkH/y5bdBFMAev/TCOfUScFzmFhgs0TAfoRI4P8BwVOgAGzmcu+VdUlZvRLdpuHQ2LwOnxe0xqN3B29XAOXdFiQ5lUwDnk7JE0MXUbq5n4y+Zzbxw8DotLFzdq4Qzhc7m5/dL4XxRlgbIYU9yyJTsW6TmhUPmwME0oIrgXJ1K59rm44db98vgfFnyBPCh82sPj0Fzw4HE445SVXCm0tl89PD2bUpHDufPxQ8YglWt5Fv988OBLoBWIZwpdAgbpPs3iuCU+dJQcZbdgMk1P5wmSX23SjhldDYZG6Aj6ed8UearNatr1BYBx6wWzuWrpXQupWwwnRu5CMH2Z6XRz9bMFWd9GMfxUJ7mromOxU1p0Gcv8l2vFfPlJ4FzgO8u/UEUKRxYLLmRg9M3bd8LesZw6u93FJeOChxSdSiePJ1Ljx5ubWXocHC2/zIleEP6mk75OZwGIeunB7lkj2KXHnR6OdrDJHZnoIc6joNDD1k4yd2d1iB7AymcfiC1Od0wjSb0ILju4yUT4jLvkOwqfi+V4JTQeZWw4elc56PS21/+teTWpDj0fI6LNUpW9RKFQg0ZBvwxTwjKDTzukAsPbebg2PwNhG8ZYMnggD+Ae2M8HFMM9IS4cpj5jMI7VhzaVYNTSOciZZOhw+B8UuKkUUGaFb86Ps5GtwLu/Q4zx/h4w554oSOFM+qJ12c7wBI4YDBJ8jk4cTYlHgYAD+U62uCm2sXZVYRTSIexEekAGwU0LIVi1Z60wqzICeNspnVuUbufP5a8++uSC3NwGr3sCaGQKgkcSiFInk/gTLL3gQ52RLa4xclQmUtcCFU4UjqvXEzZCHQwm6/UZnhAuyBGns187vBb3KGvfxCaTTOkbRjrH7F60xs2mxFrw2iF7NMLXdtsDlMEGTj0Dg66e+wJ11MBnF67CTINZsXIm5PCoa+JZ6FzmO1B70kD9ia3g1etrEFXhiOl8+jhzZtbeTz3t69/rDoCCs28mAAJHFx+NDxqAI4RNRCQO9q+eNTgNgEdNQFQWg4t6gkrUxFOG3aGsKQHrIboGRcNGYTpQ8gFAxs/gTaqHcp8g9FPxt4halr2+yvqcCR0Ht2+eVNK52/q09bi9N1LJIdD26Zh9jTSsMGrnlqJrpuWG5h/btTOk8GBGpVYAGBl8MkqgEMfKnhrZi+9EphE2arSgHpYVjYzwMnRATZ5Oltf/73skaJkNkcOx88Vl5EAgIoTcF0GihLv8RkKpg0JnIlId53WNr7qyOEwnJJO6KiDHYFRwJ4B/GnHpynJeEazwBHoXLnC2GTpfPOPsgdm1WbvFacmW0lNREutA6UlnAhtT4OVv5BTaARxPROLHcvIwwHbB41Mf5g43vzHRWRweknRZeB0TL/nOkGvZdKq02A8aF4JqfKpJTPB4elceZyw4ejcvv3Pf5U+LyfIcUn0xqQVpp2rOKzFGEh7sgfkWMjwCy6HpJ/jJ8kYcx1IYXZWDo4XcZ68AKdvpGcFUGFwGUMdIvW7K3kps5oNTkrnKs8moXP75r9LnyYTvKTFQQ6b1gB4tcXpHiatMGNJ97Dj0uKGC0WPNQ+HlVUz9eacSFzvC3D8fheUSScPZ09Sx3CzGidbNFvlRTMjHErn6rnHt3d2cnBufl3+MKniKa+QS6FAyyV2p8GwxPT/THfOo9knL3HmQwWeHI5lpUEGL2cOpLG1RBycZh4NRUK2sBPQINkKC+7FsjcjHKBz+fHWzk6Ozjcz+AGpwIdxisJ/YKgTf0A8yGI/UIMyEzcZHNL2eeL9e3I4qcJ8aE0ZTjcFzAWNCBxo7QasrZ2yEl8FTo4OZcPj2dqa1dgkAsNR9BK12FGAIzZ/BxQK1BzRHo1cCoc0IIE4P8EphePIf5lTFQ5kKKA+P+v1EjjwJtr07FI/WlOEI9I5l7JJ4ex8N+VBxRpzic+nDw5OmOkQiw1eRGZzRK8CqlyPOesiVfZEGZzCKdqKcDpBpuA9Ln/krKCxUZJlLvNKcAQ8HJsEz7MpjykV7epLGhIa8iB+cFvP5Flj9oh5a7kve0Jt6rC3NZWZh8NmZ9nFQWJFOPA+pTV1nX/54LsxTZK4qeMkqnASOpfPPb65syPS+faljE0q2jLnp3Z2gqTisMgaH+4Aw4vNFRQtX27Q9SNdH/Cz+XbNzcNJp9EUShEOtLXpgRYPBx7tkn+n/qyxMpzLRWx2nr+ssUnEos1Zu8MiBVBkkEnudes6yVXUP+IcLFokeDNOah9VlBRXCgcamoBz6obZadqKcCYiHJYJCmeoJ5paLupwLjM2u7s8nOcvb2y4VNDkOjHnVCU9Dlqs4JrpLnNxBrRakb+zYWQWJCV/AMQWuzcbbhFja60MQlyoooM/k81hlyahKGZgki7QFD9amwnOZcaGo7M7l7FJlfYM/NhcPzhoxmk3PemisFEBA1uniSHksU3/6uEy6MRsPAEMiMnQY45pL1OEQ6uvB2WxAbf3eGdX1VsDvzLEN2qnE/QZnGS0derkgpngXGZsEjzfzhRGK9OkIByPyicxFo1kFgCLuOlpM2dwx5KDTcnB9M6Z8RxWodzQNlj/RJghrApnwB4W8JliaaGNscpE45ngnHu8s7ub0nkxt7Hh1JGMZJIXkGvoJCOhaaQxN0rNW9zMQfkwdf4OjjDaohwhyKw1SsKsINFBKNNMzRrPZnchxoZXM9BzcsSxyG529VvANTu5suWvFYb1na4UjmZkbuCK3r0yHJGOmYRZQWBgVebKzeIQPN65l8B5/mxO91mikemJhRNE2XUH2dk3QsTMFNCJs2+0QVoz/U7aCU2mOkvuEGaeDkiLmiO4P63I7SQn7h71rRM40GOe6kdrM7nSiM09Sufe4oxNJjmWR6eeBV4onRo4YZMHkG3IdltHbOxfNm9NG8Q9z3U9vDwr7aCTCQF7kjsErVyhjMjUgaKyWidHk7dlz8AP880RHtrBR5L2l3gESlPD1Tuh32M2hM69hRqbrBrjg7299qD4KwSj9tCyrGFbmr1BEx2Lm0URRXoNNDTyMM3EJHdfxFcQpCmE3nFpb5dJOXzz/e49gHNv4cbmWCQUNlggWbxo+YJnT/ejNXU4jM29589m+u7DCVG7J5gK0tXJf+74WOSWeRWiFOEwNs+XZWyWqcaQ+3w+FkQfVacAL1bQIVZbIT4dzn84Nks1NktTXxcLZKzPUECLFnE4FBe8TIfz34TNi1NpbLQk0AmjAQ3a5almRRBUWsUFLwo/f/y/z3fB2CwicdWI+cd+q5V0dxR66EsQebyraLZVfjj8uxfPn794dgqNTaJ+PvhgTL9qCYIWtXxCVCoVOJp2msEQdTKxB4V4/VJEAhyOkh+tqcJZAYlxM8X1QIvWaDY38czASab746/XVJWGOMA/S1u2sEDQ2YGDtGHGoSVfzHsidabgnDbVcE6wajgnWBhOZCz/M7S1XkJtI9Iso5oPz9SaItOwEJyK3P5a5RqimuPb9mkco1l5jQzb13q2odwvqnV8Qv6Ap+mWoTIXpNYxy7ItXdNbdu2vnTw1UauG4OiRbZ/u36JdQY1tO9IxnF5k5Obv1apU3cjGn/DB0x9bkWHVdecEaYyqCx41JXNTw8gwmrVDfUI0Mg2bsAE4qO7YRtQ+PeH0FVanaTM2FI7uRQiPEZu1qtUwNhAam06pT1Z599A+xKdWtbJty05W33FL8IOeH1m1KlXk8z9c93902pBWx8dnFAAAAABJRU5ErkJggg=='
                alt=''
              />
            </Link>
          </div>
        </div>
      </div>
      {/** @section => our mentor */}
      <div className='home__container__ourPartner'>
        <h1>Our Mentor</h1>
        <div className='Mentor'>
          <img
            style={{ width: 450, height: 400, borderRadius: "4%" }}
            src='https://www.abc.net.au/cm/rimage/9966990-1x1-large.jpg?v=3'
            alt='Sandukh Ruit'
          />
          <div className='Mentor__details'>
            <h3>Dr. Sanduk Ruit</h3>
            <p>
              Dr. Sanduk Ruit, is a world renowned ophthalmologist and
              philanthropist widely recognised for restoring the sight of over
              130,000 people. He is an eminent eye-surgeon and also the first to
              pioneer a method for delivering high-quality microsurgical
              procedures in remote eye camps. Dr. Sanduk’s humanitarian efforts
              have changed the lives of many, he has been a mentor and ally for
              Hami Nepal. His assistance has been paramount during times of
              crisis, providing his expertise in the medical field to carry out
              the task more efficiently. During the second lockdown, he shared
              Barbara foundation ‘s office space where Hami Nepal family has
              found a home. His continued moral support, guidance has helped us
              pursue a vision for better Nepal.
            </p>
          </div>
        </div>
      </div>

      <div className='home__container__ourPartner'>
        <h1>Our Allies</h1>

        {/* <ul>
          {Partners.partners.map((partner) => (
            <li key={partner.photo}>
              <a href={partner.link} target="_blank" rel="noreferrer">
                <img src={partner.photo} alt="" />
              </a>
            </li>
          ))}
        </ul> */}

        <div className='Supporters'>
          {OurPartners.partners.map((partner) => (
            <div className='ourSupporters__container'>
              <a href={partner.link} target='_blank' rel='noreferrer'>
                <img src={partner.photo} alt='' />
              </a>
            </div>
          ))}
        </div>

        <div className='infuencer__heading'>
          <h1 style={{ marginTop: "3rem" }}>Social Supporters</h1>
          <InfluenerCarousel />
        </div>
        <div className='supporter_heading'>
          <h1 style={{ marginTop: "3rem" }}>Our Supporters</h1>
        </div>

        <div className='influencersCarousel__container'>
          <Carousel
            className='influencersCarousel__container__carourel'
            ref={carouselRef}
            enableAutoPlay
            autoPlaySpeed={1000} // same time
            onNextEnd={({ index }) => {
              clearTimeout(resetTimeout);
              if (index + 1 === 11) {
                resetTimeout = setTimeout(() => {
                  carouselRef.current.goTo(0);
                }, 1000); // same time
              }
            }}
            itemsToShow={8}
          >
            {OurSupporters.supporters.map((supporter, index) => (
              <div className='home__ourPartners__scroll__child'>
                <a href={supporter.link} target='_blank' rel='noreferrer'>
                  <img src={supporter.photo} alt='' />
                </a>
              </div>
            ))}
          </Carousel>
        </div>
        {/* {OurSupporters.supporters.map((supporter) => (
              <div className="home__ourPartners__scroll__child">
                <a href={supporter.link} target="_blank" rel="noreferrer">
                  <img src={supporter.photo} alt="" />
                </a>
              </div>
            ))} */}
      </div>
      <Footer />
    </div>
  );
}
