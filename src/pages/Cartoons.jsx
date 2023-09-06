import React, { useEffect, useState } from "react";
import { useVideo } from "../context/VideoContext";
import ContentCarousel from "../components/ContentCarousel";
import Row from "../components/Row";
import { Box, Stack } from "@mui/material";

function Cartoons() {
  const { allVideos } = useVideo();
  const [buhariCartoons, setBuhariCartoons] = useState([]);
  const [islamHikayeleriCartoons, setIslamHikayeleriCartoons] = useState([]);
  const [habibullahCartoons, setHabibullahCartoons] = useState([]);
  const buhariID = "-NdderkSTiWTUIlPFuZG";
  const islamHikayeleriID = "-NddgbPWA3M-uNxZ2EIz";
  const habibullahID = "-NddiI5h-BMl4BP7bBAX";

  const getFilteredCartoons = (cartoonName) => {
    try {
      const filteredVideos = allVideos.filter(
        (video) => video?.subcategoryId === cartoonName
      );
      return filteredVideos;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  //? Create three different arrays (array1, array2, array3)
  let array1 = buhariCartoons;
  let array2 = islamHikayeleriCartoons;
  let array3 = habibullahCartoons;

  //? Concatenate all the arrays into one
  let combinedArray = array1.concat(array2, array3);

  // Define a function to pick three random indexes
  function getRandomIndexes(maxIndex, count) {
    let indexes = [];
    while (indexes.length < count && indexes.length < maxIndex) {
      let randomIndex = Math.floor(Math.random() * maxIndex);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  //? Get three random indexes
  let randomIndexes = getRandomIndexes(combinedArray.length, 5);
  //? Create a new array with elements at randomIndexes
  let randomCartoons = randomIndexes.map(function (index) {
    return combinedArray[index];
  });

  useEffect(() => {
    const buhariVideos = getFilteredCartoons(buhariID);
    const islamHikayeleriVideos = getFilteredCartoons(islamHikayeleriID);
    const habibullahVideos = getFilteredCartoons(habibullahID);

    setBuhariCartoons(buhariVideos);
    setIslamHikayeleriCartoons(islamHikayeleriVideos);
    setHabibullahCartoons(habibullahVideos);

    // Pick three random elements
  }, [allVideos]); // Burada allVideos bağımlılığını ekledik

  return (
    <Stack spacing={5}>
      <ContentCarousel cartoons={randomCartoons} />
      <Row title={"İmam Buhâri Serisi"} cartoons={buhariCartoons} />
      <Row
        title={"İslam Hikâyeleri Serisi"}
        cartoons={islamHikayeleriCartoons}
      />
      <Row title={"Habibullah Serisi"} cartoons={habibullahCartoons} />
    </Stack>
  );
}

export default Cartoons;
