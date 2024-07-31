import * as React from "react";
import { Stack, Box, Typography } from "@mui/material";

export default function HourlyForecast({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return <Typography>No hourly forecast available.</Typography>;
  }

  return (
    <Stack direction="row" overflow="auto" spacing={2} padding={2}>
      {hourlyData.map((hour, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "#e8eaf6",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">{hour.time}</Typography>
          <Typography variant="h6">{hour.temperature} °C</Typography>
        </Box>
      ))}
    </Stack>
  );
}