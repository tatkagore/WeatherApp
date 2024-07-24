import * as React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import CurrentForecast from "./CurrentForecast";

export default function Forecast({ city }) {
  const [forecast, setForecast] = React.useState(null);

  const findCity = async () => {
    if (city) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m&current_weather=true`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setForecast(json || []);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    findCity();
  }, [city]);

  if (!city) {
    return null;
  }

  return (
    <Stack direction={"column"}>
      <CurrentForecast city={city} forecast={forecast} />

      <Stack
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ backgroundColor: "#e8eaf6", borderRadius: "20px" }}
      >
        <p>Today's Forecast</p>
        <Stack direction={"column"}>{/* <Hourly /> */}</Stack>
      </Stack>
    </Stack>
  );
}