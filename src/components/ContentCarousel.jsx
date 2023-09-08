// import * as React from "react";
// import Typography from "@mui/material/Typography";
// import { Swiper, SwiperSlide } from "swiper/react";

// import { Box } from "@mui/material";
// import { A11y, Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css/bundle";
// import "swiper/css/navigation";

// const ContentCarousel = ({ cartoons }) => {
//   return (
//     <Swiper
//       modules={[A11y, Autoplay, EffectFade]}
//       spaceBetween={0}
//       slidesPerView={1}
//       autoplay={{
//         delay: 3500,
//         disableOnInteraction: false,
//       }}
//       effect={"fade"}
//     >
//       {cartoons?.map(({ title, description, img_url }) => (
//         <SwiperSlide key={title}>
//           <Box
//             display={"flex"}
//             justifyContent={"center"}
//             alignItems={"end"}
//             sx={{
//               backgroundImage: `url(${img_url})`,
//               height: "85vh",
//               width: "100%",
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//               backgroundPosition: "center center",
//               marginTop: ".2rem",
//             }}
//           >
//             <Typography marginBottom={3} variant="h5" color={"ButtonShadow"}>
//               {title}
//             </Typography>
//           </Box>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default ContentCarousel;
import React from "react";

const ContentCarousel = () => {
  return <div>ContentCarousel</div>;
};

export default ContentCarousel;
