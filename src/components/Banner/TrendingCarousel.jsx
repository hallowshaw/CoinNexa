import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel, { Link } from "react-alice-carousel";

const CarouselMain = styled("div")(() => ({
  height: "50%",
  display: "flex",
  alignItems: "center",
}));

function TrendingCarousel() {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  const items = trending.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`} key={coin.id}>
        <CarouselMain>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
        </CarouselMain>
      </Link>
    );
  });

  return (
    <CarouselMain>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      ></AliceCarousel>
    </CarouselMain>
  );
}

export default TrendingCarousel;
