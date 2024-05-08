import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const CarouselMain = styled("div")(() => ({
  height: "50%",
  display: "flex",
  alignItems: "center",
}));

function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };
  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  return <CarouselMain>Carousel</CarouselMain>;
}

export default Carousel;
