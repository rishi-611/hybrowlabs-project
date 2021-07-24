import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useQuery } from "react-query";

const PeopleItem = ({ person, index }) => {
  const fetchHomeWorld = async (query) => {
    const { data } = await axios.get(query.queryKey[1]);
    return data;
  };
  const { data, status } = useQuery(
    ["planet", person.homeworld],
    fetchHomeWorld
  );

  return (
    <div className="peopleItem" key={`${index}`}>
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
        <div className="right-inner">{person.hair_color}</div>
      </div>
    </div>
  );
};

PeopleItem.propTypes = {
  person: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default PeopleItem;
