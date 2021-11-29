import React from "react"

import image from "./image"
import ImageCard from "./ImageCard"

import "./style.scss"

import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

const CivilRightTabs = () => {
  const [posts, setPosts] = React.useState(image)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(8)

  const handleChange = (e, number) => {
    setCurrentPage(number)
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const result = Math.ceil(posts.length / postsPerPage)

  return (
    <>
      <Typography justifyContent="center">Page: {currentPage}</Typography>
      <div className="civil_right_tab_container">
        {currentPosts.map((data) => (
          <ImageCard image={data} key={data.id} />
        ))}
      </div>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Pagination
          count={result}
          page={currentPage}
          size="large"
          shape="rounded"
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </>
  )
}

export default CivilRightTabs
