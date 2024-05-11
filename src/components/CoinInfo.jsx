import { useEffect, useState } from "react";
import React from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { ThemeProvider, styled } from "@mui/material/styles";
import axios from "axios";
import createTheme from "@mui/material/styles/createTheme";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { chartDays } from "./../config/data";
import SelectButton from "./SelectButton";
Chart.register(...registerables);

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false); // Introduce loading state
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricalData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    } finally {
      setLoading(false); // Set loading state back to false after data is fetched
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const MainContainer = styled("div")(() => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    "@media (max-width: 960px)": {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <MainContainer>
        {loading ? ( // Display circular progress if loading is true
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            {historicalData && historicalData.length > 0 ? ( // Check if historicalData is defined and not empty
              <Line
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;

                    return days === 1
                      ? time.toString()
                      : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            ) : (
              <div>No historical data available</div> // Show a message if historicalData is empty
            )}
          </>
        )}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => {
                setDays(day.value);
              }}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </MainContainer>
    </ThemeProvider>
  );
}

export default CoinInfo;
