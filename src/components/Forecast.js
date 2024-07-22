import * as React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

export default function Forecast({ city }) {
  const [forecast, setForecast] = React.useState([]);

  const findCity = async () => {
    if (city) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setForecast(json  || []);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    findCity();
  }, [city]);

  console.log(city, forecast);

  return (
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
  );
}