import * as React from "react";
import { Stack, Typography } from "@mui/material";
import CurrentForecast from "./CurrentForecast";
import HourlyForecast from "./HourlyForecast";
import { weatherIcons } from "./WeatherIcons";
import WeatherDetails from "./WeatherDetails";

// Main component to display the forecast information
export default function Forecast({ city }) {
  const [forecast, setForecast] = React.useState(null);

  const findCity = async () => {
    if (city) {
      // Construct the URL for the API request
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,weather_code&current_weather=true&daily=sunrise,sunset,daylight_duration,uv_index_max,precipitation_probability_max,windspeed_10m_max&timezone=auto`;
      try {
        // Fetch data from the API
        const response = await fetch(url);
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        // Parse the JSON response
        const json = await response.json();
        // Update the state with the fetched data
        setForecast(json || []);
      } catch (error) {
        // Log any errors to the console
        console.error(error.message);
      }
    }
  };

  // useEffect to fetch the forecast data whenever the city changes
  React.useEffect(() => {
    findCity();
  }, [city]);

  // If no city is provided, return null (do not render anything)
  if (!city) {
    return null;
  }

  // Function to get the next 24 hours of forecast data
  const getHourlyDataForNext24Hours = () => {
    if (!forecast || !forecast.hourly) {
      console.log("No forecast or hourly data available");
      return [];
    }

    // Get the current time and the time 24 hours from now
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Get hourly temperatures and times from the forecast data
    const hourlyTemperatures = forecast.hourly.temperature_2m;
    const hourlyTimes = forecast.hourly.time;
    const hourlyWeatherCodes = forecast.hourly.weather_code;

    console.log("Hourly times:", hourlyTimes);
    console.log("Hourly temperatures:", hourlyTemperatures);
    console.log("Hourly codes:", hourlyWeatherCodes);

    // Map over the hourly times and create an array of hourly data
    const hourlyData = hourlyTimes
      .map((time, index) => {
        const date = new Date(time);

        // Filter out data that does not belong to the next 24 hours
        if (date >= now && date <= next24Hours) {
          // Format the time as HH:MM
          const timeStr = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            time: timeStr,
            temperature: hourlyTemperatures[index],
            icon: weatherIcons[hourlyWeatherCodes[index]],
          };
        }

        return null; // Return null for data outside the 24-hour range
      })
      .filter((t) => t !== null); // Filter out null values

    return hourlyData;
  };

  // Get the hourly data for the next 24 hours
  const hourlyData = getHourlyDataForNext24Hours();

  // Function to get weather details
  const getWeatherDetails = () => {
    if (!forecast || !forecast.daily) {
      console.log("No forecast or daily data available");
      return {};
    }

    const sunriseHour = new Date(forecast.daily.sunrise[0]).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    const sunsetHour = new Date(forecast.daily.sunset[0]).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    const daylightDuration = new Date(forecast.daily.daylight_duration[0] * 1000)
      .toISOString()
      .substring(11, 16);

    const weatherDetails = {
      sunrise: sunriseHour,
      sunset: sunsetHour,
      wind: forecast.daily.windspeed_10m_max[0],
      uvIndex: forecast.daily.uv_index_max[0],
      chancesOfRain: forecast.daily.precipitation_probability_max[0],
      daylightDuration: daylightDuration,
    };

    return weatherDetails;
  };

  const weatherDetails = getWeatherDetails();

  return (
    <Stack direction={"column"}>
      {/* Component to display the current forecast */}
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
        <Stack width={"100%"} direction={"column"}>
          <WeatherDetails weatherDetails={weatherDetails} />
        </Stack>
      </Stack>
    </Stack>
  );
}
