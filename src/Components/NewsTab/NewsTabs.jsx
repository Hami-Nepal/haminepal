import * as React from "react"

import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"

export default function NewsTabs(props) {
  return (
    <div
      className="newsCard_container"
      style={{ marginTop: "20px", padding: "5px" }}
    >
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          component="img"
          alt={props.news._id}
          height="340"
          image={props.news.photo}
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
            {props.news.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.news.summary}
            <br />
            {props.news.createdAt}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={props.news.link}> Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}
