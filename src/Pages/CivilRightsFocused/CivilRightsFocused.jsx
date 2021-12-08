import React from "react"
import Nav from "../../Components/NavBar/Nav"
import axios from "axios"
import "./style.scss"
import Footer from "../../Components/Footer/Footer"
const CivilRightsFocused = () => {
  const [post, setPost] = React.useState({})
  console.log(post)
  React.useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        "https://api.haminepal.org/api/v1/civilrights/" +
          window.location.pathname.split("/").pop()
      )
      setPost(resp.data.data.civilRights)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="civil_container">
        {/* @sectoin => topbar */}
        <Nav />

        {/* @section => landing */}
        <div className="civil_container__landing">
          <h1>{post.title}</h1>

          <p>{post.summary}</p>
        </div>
      </div>
      <div className="civil-focused-container">
        <h1 className="civil-focused-container-title">{post.title}</h1>
        {/* <img
          src={post.photos[0]}
          alt={post._id}
          className="civil-focused-container-title-image"
        /> */}
        <div className="civil-focused-container-details">
          <h3>Details</h3>
          <p>{post.introduction}</p>
        </div>
        <div className="civil-focused-container-challenges">
          <h3>Challenges</h3>
          <p>{post.body1}</p>
        </div>
        <figure>
          {post.photos?.map((URL) => {
            return (
              <>
                <img alt={URL._id} src={URL} />
              </>
            )
          })}
        </figure>
        <div className="civil-focused-container-result">
          <h3>Results</h3>
          <p>{post.body2}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CivilRightsFocused
