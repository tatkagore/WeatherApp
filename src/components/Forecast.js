import * as React from "react";
import { Stack, Typography } from "@mui/material";
import CurrentForecast from "./CurrentForecast";
import HourlyForecast from "./HourlyForecast";
import { weatherIcons } from "./WeatherIcons";
import WeatherDetails from "./WeatherDetails";

// Helper function to convert Celsius to Fahrenheit
const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export default function Forecast({ city, unit }) {
  const [forecast, setForecast] = React.useState(null);

  const findCity = async () => {
    if (city) {
      // Construct the URL for the API request
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,weather_code&current_weather=true`;

      try {
        // Fetch data from the API
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        // Parse the JSON response
        const json = await response.json();
        setForecast(json || []);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // Fetch forecast data when the city changes
  React.useEffect(() => {
    findCity();
  }, [city]);

  if (!city) {
    return null;
  }

  // Function to get the next 24 hours of forecast data
  const getHourlyDataForNext24Hours = () => {
    if (!forecast || !forecast.hourly) {
      console.log("No forecast or hourly data available");
      return [];
    }

    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const hourlyTemperatures = forecast.hourly.temperature_2m;
    const hourlyTimes = forecast.hourly.time;
    const hourlyWeatherCodes = forecast.hourly.weather_code;

    console.log("Hourly times:", hourlyTimes);
    console.log("Hourly temperatures:", hourlyTemperatures);
    console.log("Hourly codes:", hourlyWeatherCodes);

    const hourlyData = hourlyTimes
      .map((time, index) => {
        const date = new Date(time);
        if (date >= now && date <= next24Hours) {
          const timeStr = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Convert temperature if the unit is Fahrenheit
          const temperature = unit === "F" ? convertToFahrenheit(hourlyTemperatures[index]) : hourlyTemperatures[index];

          return {
            time: timeStr,
            temperature: temperature.toFixed(1),
            icon: weatherIcons[hourlyWeatherCodes[index]],
          };
        }
        return null;
      })
      .filter((t) => t !== null);

    return hourlyData;
  };

  const hourlyData = getHourlyDataForNext24Hours();

  return (
    <Stack direction={"column"}>
      <CurrentForecast city={city} forecast={forecast} />
      <Stack
        width={"100%"}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        sx={{ backgroundColor: "#e8eaf6", borderRadius: "20px" }}
      >
        <Typography variant="h6">Today's Forecast</Typography>
        <Stack width={"100%"} direction={"column"} sx={{ overflowX: "auto" }}>
          <HourlyForecast hourlyData={hourlyData} />
        </Stack>
        <Stack width={"100%"} direction={"column"} sx={{ overflowX: "auto" }}>
          <WeatherDetails weatherDetails={forecast?.current_weather} />
        </Stack>
      </Stack>
    </Stack>
  );
}