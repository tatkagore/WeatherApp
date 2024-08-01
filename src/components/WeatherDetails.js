import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import FlareIcon from "@mui/icons-material/Flare";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function WeatherDetails({ weatherDetails }) {
  if (!weatherDetails) {
    return <Typography>No weather details available.</Typography>;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 2, sm: 3, md: 3, lg: 6 }}
      padding={2}
    >
      <Grid item xs={1} sm={1} md={1}>
        <Item sx={{ borderRadius: 5 }}>
          <div>
            <Typography sx={{ fontSize: "13px !important" }}>
              Sunrise
            </Typography>
            <Typography>{weatherDetails.sunrise}</Typography>
          </div>
          <WbSunnyIcon />
        </Item>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Item sx={{ borderRadius: 5 }}>
          <div>
            <Typography sx={{ fontSize: "13px !important" }}>Sunset</Typography>
            <Typography>{weatherDetails.sunset}</Typography>
          </div>
          <ModeNightIcon />
        </Item>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Item sx={{ borderRadius: 5 }}>
          <div>
            <Typography sx={{ fontSize: "13px !important" }}>Wind</Typography>
            <Typography>{weatherDetails.wind} m/s</Typography>
          </div>
          <AirIcon />
        </Item>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Item sx={{ borderRadius: 5 }}>
          <div>
            <Typography sx={{ fontSize: "13px !important" }}>UV Index</Typography>
            <Typography>{weatherDetails.uvIndex}</Typography>
          </div>
          <FlareIcon />
        </Item>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Item sx={{ borderRadius: 5 }}>
          <div>
            <Typography sx={{ fontSize: "13px !important" }}>Chance of Rain</Typography>
            <Typography>{weatherDetails.chancesOfRain}%</Typography>
          </div>
          <OpacityIcon />
        </Item>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Item sx={{ borderRadius: 5 }}>
          <div>
            <Typography sx={{ fontSize: "13px !important" }}>Daylight duration</Typography>
            <Typography>{weatherDetails.daylightDuration}</Typography>
          </div>
          <AccessTimeIcon />
        </Item>
      </Grid>
    </Grid>
  );
}
