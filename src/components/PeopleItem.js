import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const PeopleItem = ({ person, index }) => {
  const fetchHomeWorld = async (query) => {
    const { data } = await axios.get(query.queryKey[1]);
    return data;
  };
  const { data } = useQuery(["planet", person.homeworld], fetchHomeWorld);

  const fetchSpecies = async ({ queryKey }) => {
    const url = queryKey[1][0];
    const { data } = await axios.get(url);
    return data.name;
  };

  const { data: speciesData, status: speciesStatus } = useQuery(
    ["species", person.species],
    fetchSpecies
  );

  if (speciesData) {
    console.log(speciesData);
  }

  return (
    <Link to={`/people/${person.name}`}>
      <div className="peopleItem">
        <div className="left">
          <div className="name">{person.name}</div>
          <div className="info">
            {data ? (
              data.name
            ) : (
              <p className="dummy" aria-hidden="true">
                dummy
              </p>
            )}
          </div>
        </div>
        <div className="right">
          <div className="right-inner">
            {person.species.length === 0 ? "human" : speciesData}
          </div>
        </div>
      </div>
    </Link>
  );
};

PeopleItem.propTypes = {
  person: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default PeopleItem;
