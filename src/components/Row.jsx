import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  colors,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";

import "swiper/css/scrollbar";

const Row = ({ cartoons, title }) => {
  return (
    <Box mt={2}>
      <Typography textAlign={"left"} variant="h4">
        {title}
      </Typography>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={4}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {cartoons.map((video) => (
          <SwiperSlide key={video.id}>
            <Card sx={{ maxWidth: 500, backgroundColor: "gray" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={video.img_url}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Row;
