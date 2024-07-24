import * as React from "react";
import "./App.css";
import Search from "./components/Search";
import { Box, Stack } from "@mui/material";
import Forecast from "./components/Forecast";
import CurrentForecast from "./components/CurrentForecast";

function App() {
  const [city, setCity] = React.useState(null);

  return (
    <Stack spacing={4}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Search setCity={setCity} />
      <Forecast city={city} />
    </Stack>
  );
}

export default App;
