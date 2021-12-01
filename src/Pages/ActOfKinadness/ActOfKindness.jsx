import React from "react"

import "./style.scss"

import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

import axios from "axios"
import baseURL from "../../api/baseURL"

import Nav from "../../Components/NavBar/Nav"
import Footer from "../../Components/Footer/Footer"
import KindnessCard from "../../Components/Act of Kindness/KindnessCard"

const ActOfKindness = () => {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalData, setTotalData] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const paginate = (e, number) => {
    setCurrentPage(number)
  }

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get(baseURL + `/kindness?page=${currentPage}`)
      setPosts(res.data.data)
      setTotalData(res.data.total_data)
      setCount(res.data.count)
      setLoading(false)
    }
    fetchPosts()
  }, [currentPage])

  const page = Math.ceil(totalData / 10)

  if (loading) {
    return (
      <div
        class="text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Nav />
      <div className="kindness_container">
        <div className="kindness_container__landing">
          <div className="slogan">
            <p>CHANGING THE WORLD ONE RANDOM ACT OF KINDNESS AT A TIME</p>
          </div>
        </div>
        <h3>{count} results</h3>
        <div class="kindness_container_cards">
          {posts.map((data, _id) => (
            <KindnessCard posts={data} key={_id} />
          ))}
        </div>

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
      </div>
      <Footer />
    </>
  )
}
export default ActOfKindness
