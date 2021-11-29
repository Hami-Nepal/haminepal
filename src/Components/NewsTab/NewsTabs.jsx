import * as React from "react"

// import mui lib
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"

// scss import
import "./style.scss"

// import important lib
import axios from "axios"
import Pagination from "../Pagination/Pagination"

// main function component
export default function NewsTabs() {
  const [posts, setPosts] = React.useState([[]])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(8)

  // Page Change
  const paginate = (number) => {
    setCurrentPage(number)
  }

  // get data
  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get(`https://api.haminepal.org/api/v1/news`)
      setPosts(res.data.data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  //Pagination variables
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // loading Screen
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
        }}
      >
        <h1>Loading....</h1>
      </div>
    )
  }
  return (
    <>
      {/* @section=>main-loaded */}
      <div className="news_container_cards">
        {currentPosts.map((news, _id) => (
          // news_Card
          <Card sx={{ maxWidth: 550 }} key={_id}>
            <CardMedia
              component="img"
              alt={news._id}
              height="340"
              image={news.photo}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                style={{
                  marginTop: "-42px",
                  color: "white",
                  textAlign: "center",
                }}
                component="div"
              >
                {news.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                textAlign="center"
              >
                {news.summary}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Uploaded on:{news.createdAt}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={news.link}>Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* @section pagination */}
        <Pagination
          postPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  )
}
