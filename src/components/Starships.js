import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { getStarship } from "../utils";

const Starships = ({ starshipsUrl }) => {
  const fetchStarships = async () => {
    const ships = [];
    for (const shipUrl of starshipsUrl) {
      const data = await getStarship(shipUrl);
      ships.push(data.name);
    }
    return ships;
  };
  const { data, status } = useQuery("starships", fetchStarships);

  if (status === "loading") {
    return null;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  return (
    <ul>
      {data.map((starship, i) => (
        <li key={i}>{starship}</li>
      ))}
    </ul>
  );
};

Starships.propTypes = {
  starshipsUrl: PropTypes.array.isRequired,
};

export default Starships;
