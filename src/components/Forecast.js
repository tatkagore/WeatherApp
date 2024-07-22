import * as React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

export default function Forecast() {
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
      <Stack direction={"column"}>
        {/* <Hourly /> */}
      </Stack>
    </Stack>
  );
}
