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

const CarouselItem = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  marginBottom: 15,
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function TrendingCarousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
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
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} key={coin.id}>
        <CarouselItem>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {coin?.symbol}
            &nbsp;
            <span style={{ color: profit > 0 ? "rgb(14,203,129)" : "red" }}>
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>

          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol}
            {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </CarouselItem>
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
