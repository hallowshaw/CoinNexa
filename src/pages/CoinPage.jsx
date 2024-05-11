import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { ThemeProvider, styled } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import CoinInfo from "./../components/CoinInfo";

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

  const container = styled("div")(() => ({}));
  const sidebar = styled("div")(() => ({}));
  const container1 = styled("div")(() => ({}));

  return (
    <div container>
      {/* Sidebar */}
      <div sidebar></div>
      {/* Chart */}
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage;
