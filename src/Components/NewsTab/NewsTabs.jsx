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
        <h3>{count} results</h3>
        <div className="row">
          {posts.map((news, _id) => (
            <div class="col-sm-3  " key={_id} style={{ paddingBottom: "20px" }}>
              <a href={news.link}>
                <div style={{ backgroundColor: "white" }}>
                  <div>
                    <img
                      src={news.photo}
                      class="card-img-top"
                      style={{
                        maxHeight: "25vh",
                        objectFit: "cover",
                      }}
                      alt="news._id"
                    />
                    <div
                      style={{
                        margin: "-25px 0 0 10px",
                        textAlign: "center",
                        position: "relative",
                        color: "white",
                        width: "3vw",
                        backgroundColor: "red",
                        fontWeight: "bolder",
                      }}
                    >
                      News
                    </div>
                  </div>

                  <div className="card-body">
                    <p className="card-text">
                      <small className="text-muted">{news.createdAt}</small>
                    </p>
                    <p
                      className="card-text text-danger"
                      style={{ fontSize: "1.2rem", fontWeight: "bolder" }}
                    >
                      {news.summary}
                    </p>
                  </div>
                </div>
              </a>
            </div>
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
            variant="outlined"
            color="secondary"
          />
        </Stack>
      </div>
    </>
  )
}
