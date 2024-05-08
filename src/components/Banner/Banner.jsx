import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import TrendingCarousel from "./TrendingCarousel";

const BannerMain = styled("div")(() => ({
  backgroundImage: "url(./pageCover.jpg)",
}));

const BannerContainer = styled("div")(() => ({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
}));

const Tagline = styled("div")(() => ({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}));

function Banner() {
  return (
    <BannerMain>
      <Container>
        <BannerContainer>
          <Tagline>
            <Typography
              variant="h2"
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrat",
              }}
            >
              CoinNexa
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all the Info regarding your favorite Crpyto Currency
            </Typography>
          </Tagline>
        </BannerContainer>
        <TrendingCarousel />
      </Container>
    </BannerMain>
  );
}

export default Banner;
