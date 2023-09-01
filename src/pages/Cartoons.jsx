import React from "react";
import { useVideo } from "../context/VideoContext";
import Row from "../components/Row";
import Carousel from "../components/Carousel";

const Cartoons = () => {
  const { videos } = useVideo();
  console.log("videos", videos);
  const { subcategories } = useVideo();
  console.log(subcategories);
  return (
    <>
      <Carousel subcategories={subcategories} />
      <Row />
      <Row />
      <Row />
    </>
  );
};

export default Cartoons;
