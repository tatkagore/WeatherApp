import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function CurrentForecast({ city, forecast }) {
  if (!city || !forecast) {
    return null;
  }

  const currentWeather = forecast.current_weather;

  return (
    <div>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">{city.name}</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h4">{currentWeather.temperature} °C</Typography>
          <Box
            sx={{ width: "50px", height: "50px" }}
            component="img"
            src="sun.png"
            alt="Weather Icon"
          />
        </Stack>
      </Stack>
    </div>
  );
}
