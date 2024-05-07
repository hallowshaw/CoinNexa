import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import { styled } from "@mui/material/styles";

const AppContainer = styled("div")(() => ({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
}));

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
