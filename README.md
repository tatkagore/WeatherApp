# Weather App 🌡️☀️❄️

This is a simple weather forecast application built with React and Material-UI. The application allows users to search for a city and view the current weather as well as the hourly forecast for that city.

## Features

    •	Search for a city to get weather information.
    •	Display current weather including temperature and weather conditions.
    •	Show hourly weather forecast.
    •	Dynamic weather icons based on weather conditions.

### Tech Stack

    •	React
    •	Material-UI
    •	Open Meteo API

### Getting Started

Prerequisites:

    •	Node.js (v14 or later)
    •	npm or yarn

### Installation

    1.	Clone the repository:
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    2.	Install the dependencies:
    npm install
    npm i @mui/material
    npm install @mui/material @emotion/react @emotion/styled
    npm install lodash\n

### Running the Application

    1. npm run start
    2. Open your browser and navigate to http://localhost:3000 to see the application running.

### API

This application uses the [Open Meteo API](https://open-meteo.com/en/docs) to fetch weather data.
To get the current weather and hourly forecast for a city:

```
https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true&hourly=temperature_2m

```

Replace {latitude} and {longitude} with the actual coordinates of the city.

### Key Components

    •	Search.js: Component for searching a city.
    •	Forecast.js: Component for displaying the forecast including current weather and hourly forecast.
    •	CurrentForecast.js: Component for displaying the current weather.
    •	weatherIcons.js: Utility for mapping weather codes to corresponding weather icons.
