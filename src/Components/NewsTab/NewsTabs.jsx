import * as React from "react"

// import mui lib
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import CircularProgress from "@mui/material/CircularProgress"

// scss import
import "./style.scss"

// import important lib
import axios from "axios"
import baseURL from "../../api/baseURL"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

// main function component
export default function NewsTabs() {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalData, setTotalData] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [newsType, setnewsType] = React.useState("national")

  const handleChange = (event) => {
    setnewsType(event.target.value)
  }

  // Page Change
  const paginate = (e, number) => {
    setCurrentPage(number)
  }

  // get data
  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get(
        baseURL + `/news?page=${currentPage}&newsType=${newsType}`
      )
      setPosts(res.data.data)
      setTotalData(res.data.total_data)
      setCount(res.data.count)
      setLoading(false)
    }
    fetchPosts()
  }, [currentPage, newsType])

  // number of Pages
  const page = Math.ceil(totalData / 10)

  // loading Screen
  if (loading) {
    return (
      <div class="text-center">
        <CircularProgress />
      </div>
    )
  }
  return (
    <>
      <div className="news-header">
        <h3>{count} results</h3>

        <FormControl sx={{ m: 1, minWidth: 90 }}>
          <Select
            style={{ fontWeight: "bolder" }}
            // labelId="demo-simple-select-autowidth-label"
            value={newsType}
            onChange={handleChange}
            // displayEmpty
            // autoWidth
            // inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="national">National</MenuItem>
            <MenuItem value="international">International</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* @section=>main-loaded */}
      <div className="row">
        {posts.map((news) => {
          let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
          const date = new Date(news.createdAt.slice(0, 10))

          return (
            <Card
              sx={{
                display: "flex",
                padding: 0,
                boxShadow: "none",
                border: "1px solid rgb(202, 202, 202)",
                borderRadius: "12px",
              }}
              key={news._id}
            >
              <a href={news.link} rel="noreferrer" target="_blank">
                <CardMedia
                  component="img"
                  sx={{ width: "50%", minHeight: "100%", maxHeight: 220 }}
                  image={news.photo}
                  alt="Live from space album cover"
                />
              </a>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "50%" }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <a href={news.link} rel="noreferrer" target="_blank">
                    <Typography
                      component="div"
                      variant="h5"
                      className="news-title"
                    >
                      {news.title}
                    </Typography>
                  </a>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                    margin=".5rem 0 .8rem"
                  >
                    {date.toLocaleDateString("en-US", options)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    className="news-description"
                  >
                    {news.summary}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          )
        })}
      </div>

      {/* @sextion=>Pagination */}
      <div style={{ margin: "50px 0px 50px 0px", width: "100vw" }}>
        <Stack justifyContent="center" alignItems="center">
          <Pagination
            count={page}
            page={currentPage}
            onChange={paginate}
            shape="rounded"
            color="primary"
            size="large"
          />
        </Stack>
      </div>
    </>
  )
}
