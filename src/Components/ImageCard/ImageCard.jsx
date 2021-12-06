import React from "react"

import "./imageCard.scss"

import { Link } from "react-location"

class ImageCard extends React.Component {
  constructor(props) {
    super(props)
    this.imageRef = React.createRef()
    this.state = { spans: 0 }
  }
  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans)
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight
    const spans = Math.ceil(height / 20)
    this.setState({ spans })
  }

  render() {
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <Link to={"/civil-focused/" + this.props.image.id}>
          <figure className="img_container">
            <img ref={this.imageRef} src={this.props.image.image} alt="civil" />
            <figcaption>{this.props.image.title}</figcaption>
          </figure>
        </Link>
      </div>
    )
  }
}
export default ImageCard
