import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Search />
    </Box>
  );
}

export default App;
