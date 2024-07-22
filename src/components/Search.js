import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { Box } from "@mui/material";

export default function Search({ setCity }) {
  const [cities, setCities] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const fetchCities = async (value) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10&language=en&format=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setCities(json.results || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const debouncedFetchCities = React.useMemo(
    () => debounce(fetchCities, 500),
    [],
  );

  const handleSearchChange = (_, value) => {
    setInputValue(value);
    if (value.trim() !== "") {
      debouncedFetchCities(value);
    } else {
      setCities([]);
    }
  };

  React.useEffect(() => {
    return () => {
      debouncedFetchCities.cancel();
    };
  }, [debouncedFetchCities]);

  const handleSelectCity = async (_, value) => {
    setCity(value)
  };

  return (
    <Autocomplete
      disablePortal
      options={cities}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search a city" />}
      onInputChange={handleSearchChange}
      onChange={handleSelectCity}
      getOptionLabel={(option) => option.name || ""}
      renderOption={(props, option) => {
        delete props.key;

        return (
          <Box
            key={`${option.name}-${option.id}`}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
              alt=""
            />
            {option.name} ({option.country}, {option.admin1})
          </Box>
        );
      }}
    />
  );
}