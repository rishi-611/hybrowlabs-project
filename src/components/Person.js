import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { getPerson, getStarship, getVehicles, getFilms } from "../utils";

const Person = ({ match }) => {
  // fetch person
  const fetchPerson = async ({ queryKey }) => {
    const data = await getPerson(queryKey[1]);
    return data;
  };
  const { data: personData, status: personStatus } = useQuery(
    ["person", match.params.name],
    fetchPerson
  );

  const person = personData?.results[0];

  // fetchship
  const fetchStarships = async ({ queryKey }) => {
    const ships = [];
    const starshipsUrl = queryKey[1];
    if (!starshipsUrl) {
      return null;
    }
    for (const shipUrl of starshipsUrl) {
      const data = await getStarship(shipUrl);
      ships.push(data.name);
    }
    return ships;
  };

  const { data: shipData, status: shipStatus } = useQuery(
    ["starships", person?.starships],
    fetchStarships
  );

  // fetch vehicles
  const fetchVehicles = async ({ queryKey }) => {
    const vehicles = [];
    const vehiclesUrl = queryKey[1];
    if (!vehiclesUrl) {
      return null;
    }
    for (const vehicleUrl of vehiclesUrl) {
      const data = await getVehicles(vehicleUrl);
      vehicles.push(data.name);
    }
    return vehicles;
  };

  const { data: vehicleData, status: vehicleStatus } = useQuery(
    ["Vehicles", person?.vehicles],
    fetchVehicles
  );

  // fetch vehicles
  const fetchFilms = async ({ queryKey }) => {
    const films = [];
    const filmsUrl = queryKey[1];
    if (!filmsUrl) {
      return null;
    }
    for (const filmUrl of filmsUrl) {
      const data = await getFilms(filmUrl);
      films.push(data.title);
    }
    return films;
  };

  const { data: filmData, status: filmStatus } = useQuery(
    ["films", person?.films],
    fetchFilms
  );

  const renderStarships = () =>
    shipData.map((ship, i) => (
      <li className="starship" key={i}>
        {ship}
      </li>
    ));

  const renderVehicles = () =>
    vehicleData.map((vehicle, i) => (
      <li className="vehicle" key={i}>
        {vehicle}
      </li>
    ));

  const renderFilms = () =>
    filmData.map((film, i) => (
      <li className="film" key={i}>
        {film}
      </li>
    ));

  const renderPersonCard = () => (
    <div className="ui-box person-ui-box">
      <h1>{person.name}</h1>
      <ul className="vehicles">
        Vehicles:
        {vehicleData.length === 0 ? <li>None</li> : renderVehicles()}
      </ul>
      <ul className="starshipss">
        Starships:
        {shipData.length === 0 ? <li>None</li> : renderStarships()}
      </ul>
      <ul className="films">
        Films:
        {filmData.length === 0 ? <li>None</li> : renderFilms()}
      </ul>
      <div className="homeworld">Homeworld: Earth</div>
      <div className="birthyear">Birth Year: {person.birth_year}</div>
      <div className="height">Height: {person.height} cm</div>
      <div className="mass">Mass: {person.mass} kg</div>
      <div className="gender">Gender: {person.gender}</div>
      <div className="haircolor">Hair Color: {person.hair_color}</div>
    </div>
  );

  return (
    <div className="container main">
      <div className="person-btn-container">
        <Link to="/">
          <button className="btn">Back</button>
        </Link>
      </div>
      {personStatus === "loading" ||
      shipStatus === "loading" ||
      vehicleStatus === "loading" ||
      filmStatus === "loading" ? (
        <Spinner />
      ) : personStatus === "error" ? (
        "error"
      ) : (
        renderPersonCard()
      )}
    </div>
  );
};

export default Person;
