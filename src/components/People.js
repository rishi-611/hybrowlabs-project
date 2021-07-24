import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import PeopleItem from "./PeopleItem";
import SearchForm from "./SearchForm";
import Spinner from "./Spinner";
import Error404 from "./Error404";

const People = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const onFormChange = (e) => setSearch(e.target.value);

  const fetchPeople = async ({ queryKey }) => {
    const { data } = await axios.get(
      `https://swapi.dev/api/people?search=${queryKey[2]}&page=${queryKey[1]}`
    );
    return data;
  };
  const { data, status } = useQuery(["people", page, search], fetchPeople, {
    keepPreviousData: true,
  });

  const renderPageBtns = () => (
    <div className="pagination">
      <div className="btn-container prev">
        <button
          className="btn page-btns"
          onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))}
          disabled={page === 1}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
      </div>
      <div className="btn-container current">
        <button className="btn page-btns">{page}</button>
      </div>
      <div className="btn-container next">
        <button
          className="btn page-btns"
          onClick={() => setPage((prevPage) => Math.min(9, prevPage + 1))}
          disabled={data?.next === null}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
  );
  return (
    <div className="container main">
      <SearchForm search={search} onChange={onFormChange} />

      {renderPageBtns()}

      <section className="people-section">
        {status === "loading" ? (
          <Spinner />
        ) : status === "error" ? (
          <Error404 />
        ) : (
          <ul>
            {data.results.map((person, index) => (
              <PeopleItem person={person} index={index} key={`${index}`} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default People;
