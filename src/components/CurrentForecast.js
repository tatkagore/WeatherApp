import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CurrentForecast({ city }) {
  if (!city) {
    return null;
  }
  return (
    <div>
      <Stack direction="column" spacing={2}>
        <Typography variant="h6">{city.name} </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6">Horizontal Stack Text</Typography>
          <Box
            sx={{ width: "50px", height: "50px" }}
            component="img"
            src="sun.png"
          />
        </Stack>
      </Stack>
    </div>
  );
}
