import * as React from "react";
import "./App.css";
import Search from "./components/Search";
import { Box, Stack } from "@mui/material";
import Forecast from "./components/Forecast";

function App() {
  const [forecast, setForecast] = React.useState([]);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Search setForecast={setForecast} />
      <Forecast forecast={forecast} />
    </Stack>
  );
}

export default App;
