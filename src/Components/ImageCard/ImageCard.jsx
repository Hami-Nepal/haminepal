import React from "react"

import "./imageCard.scss"

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
        <div className="img_container">
          <img ref={this.imageRef} src={this.props.image.image} alt="civil" />
          <div>
            <p>{this.props.image.title}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default ImageCard
