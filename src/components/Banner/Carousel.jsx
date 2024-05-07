import React from "react";
import { styled } from "@mui/material/styles";

const CarouselMain = styled("div")(() => ({
  height: "50%",
  display: "flex",
  alignItems: "center",
}));

function Carousel() {
  return <CarouselMain>Carousel</CarouselMain>;
}

export default Carousel;
