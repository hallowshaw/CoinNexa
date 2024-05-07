import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const HeaderContainer = styled("div")(() => ({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Header() {
  const navigateTo = useNavigate();

  const { currency, setCurrency } = CryptoState();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <HeaderContainer>
              <Typography onClick={() => navigateTo("/")} variant="h6">
                CoinNexa
              </Typography>
            </HeaderContainer>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
