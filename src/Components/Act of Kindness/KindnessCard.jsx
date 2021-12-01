import React from "react"
import "./style.scss"

import { Link } from "react-location"

export default function KindnessCard(posts, key) {
  console.log(posts)
  return (
    <div className="kindnessCard__container" key={key}>
      <Link to="/">
        <img alt={key} src={posts.posts.photos[0]} />
        <div className="kindnessCard__container__title">
          {posts.posts.title}
        </div>
        <div className="kindnessCard__container__description">
          {posts.posts.summary}
        </div>
      </Link>
    </div>
  )
}
