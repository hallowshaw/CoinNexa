import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { ThemeProvider, styled } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import CoinInfo from "./../components/CoinInfo";
import { Typography } from "@mui/material";
import { numberWithCommas } from "../components/Banner/TrendingCarousel";
import LinearProgress from "@mui/material/LinearProgress";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const MainContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (min-width: 960px)": {
      flexDirection: "row",
      alignItems: "unset",
    },
  }));
  const Sidebar = styled("div")(() => ({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    "@media (max-width: 960px)": {
      width: "100%",
      borderRight: "none",
    },
  }));

  const Heading = styled("div")(() => ({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  }));

  const Description = styled("div")(() => ({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  }));

  const MarketData = styled("div")(() => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    "@media (max-width: 960px)": {
      display: "flex",
      justifyContent: "space-around",
    },
    "@media (max-width: 600px)": {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media (max-width: 400px)": {
      alignItems: "start",
    },
  }));

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <>
      <MainContainer>
        <Sidebar>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3">
            <Heading>{coin?.name}</Heading>
          </Typography>
          <Typography variant="subtitle1">
            <Description
              dangerouslySetInnerHTML={{
                __html: coin?.description?.en.split(". ")[0],
              }}
            />
          </Typography>
          <MarketData>
            <span style={{ display: "flex" }}>
              <Typography variant="h5">
                <Heading>Rank:</Heading>
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5">
                <Heading>Current Price:</Heading>
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5">
                <Heading>Market Cap:</Heading>
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
          </MarketData>
        </Sidebar>
        {/* Chart */}
        <CoinInfo coin={coin} />
      </MainContainer>
    </>
  );
}

export default CoinPage;
