import * as React from "react";
import "./App.css";
import Search from "./components/Search";
import { Box, Stack } from "@mui/material";
import Forecast from "./components/Forecast";

function App() {
  const [city, setCity] = React.useState(null);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5c6bc0",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "80%", 
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack spacing={4} sx={{ width: "100%" }}>
          <Search setCity={setCity} />
          <Forecast city={city} />
        </Stack>
      </Box>
    </Box>
  );
}

export default App;