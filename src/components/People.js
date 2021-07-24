import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import PeopleItem from "./PeopleItem";
import SearchForm from "./SearchForm";

const People = () => {
  const fetchPeople = async () => {
    const { data } = await axios.get("https://swapi.dev/api/people");
    return data;
  };
  const { data, status } = useQuery("people", fetchPeople);
  if (data) {
    console.log(data.results[0]);
  }

  return (
    <div className="container main">
      <SearchForm />
      <div className="pagination">
        <div className="btn-container prev">
          <button className="btn page-btns">Previous</button>
        </div>
        <div className="btn-container current">
          <button className="btn page-btns">1</button>
        </div>
        <div className="btn-container next">
          <button className="btn page-btns">Next</button>
        </div>
      </div>
      <section className="people-section">
        {status === "loading" ? (
          <div>Loading</div>
        ) : status === "error" ? (
          <div>error</div>
        ) : (
          <ul>
            {data.results.map((person, index) => (
              <PeopleItem person={person} index={index} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default People;
