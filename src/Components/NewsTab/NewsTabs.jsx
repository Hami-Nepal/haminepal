import * as React from "react"

import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"

import "./style.scss"

import axios from "axios"
import baseURL from "../../api/baseURL"
import Pagination from "../Pagination/Pagination"

export default function NewsTabs() {
  const [posts, setPosts] = React.useState([[]])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(8)

  const paginate = (number) => {
    setCurrentPage(number)
  }

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get(baseURL + `/news`)
      setPosts(res.data.data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <>
      <div className="news_container_cards">
        {currentPosts.map((news, _id) => (
          <Card sx={{ maxWidth: 350 }} key={_id}>
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
                }}
                component="div"
              >
                {news.title}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {news.summary}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uploaded on:{news.createdAt}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={news.link}> Learn More</Button>
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
        <Pagination
          postPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  )
}
