import axios from "axios";

export const getPerson = async (name) => {
  const { data } = await axios.get(
    `https://swapi.dev/api/people?search=${name}`
  );
  return data;
};

export const getStarship = async (shipUrl) => {
  const { data } = await axios.get(shipUrl);
  return data;
};

export const getVehicles = async (vehicleUrl) => {
  const { data } = await axios.get(vehicleUrl);
  return data;
};

export const getFilms = async (filmsUrl) => {
  const { data } = await axios.get(filmsUrl);
  return data;
};
