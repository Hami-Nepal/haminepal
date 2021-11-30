import * as React from "react"

// import mui lib
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

// scss import
import "./style.scss"

// import important lib
import axios from "axios"
import baseURL from "../../api/baseURL"

// main function component
export default function NewsTabs() {
  const [posts, setPosts] = React.useState([[]])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(10)
  const [totalData, setTotalData] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Page Change
  const paginate = (e, number) => {
    setCurrentPage(number)
  }

  // get data
  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get(baseURL + `/news?page=${currentPage}`)
      setPosts(res.data.data)
      setTotalData(res.data.total_data)
      setCount(res.data.count)
      setLoading(false)
    }
    fetchPosts()
  }, [currentPage])

  // number of Pages
  const page = Math.ceil(totalData / postsPerPage)

  // loading Screen
  if (loading) {
    return (
      <div class="text-center">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <>
      {/* @section=>main-loaded */}
      <div className="news_container_cards">
        <h3>{count} results</h3>

        <div className="card-container">
          {posts.map((news, _id) => (
            <a href={news.link} className="news_card">
              <img src={news.photo} />
              <div className="news">News</div>
              <p style={{ fontSize: "14px", color: "grey", margin: "18px" }}>
                {news.createdAt.slice(0, 10)}
              </p>
              <p className="summary">{news.summary}</p>
            </a>
          ))}
        </div>
      </div>

      {/* @sextion=>Pagination */}
      <div style={{ marginBottom: "50px" }}>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
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
