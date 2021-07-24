import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import PeopleItem from "./PeopleItem";
import SearchForm from "./SearchForm";
import loader from "./loader.gif";

const People = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const onFormChange = (e) => setSearch(e.target.value);

  const fetchPeople = async ({ queryKey }) => {
    const { data } = await axios.get(
      `https://swapi.dev/api/people?page=${queryKey[1]}&search=${queryKey[2]}`
    );
    return data;
  };
  const { data, status, isPreviousData } = useQuery(
    ["people", page, search],
    fetchPeople,
    {
      keepPreviousData: true,
    }
  );
  // if (data) {
  //   console.log(data.results[0]);
  // }

  return (
    <div className="container main">
      <SearchForm search={search} onChange={onFormChange} />

      <div className="pagination">
        <div className="btn-container prev">
          <button
            className="btn page-btns"
            onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
        </div>
        <div className="btn-container current">
          <button className="btn page-btns">{page}</button>
        </div>
        <div className="btn-container next">
          <button
            className="btn page-btns"
            onClick={() => setPage((prevPage) => Math.min(9, prevPage + 1))}
            disabled={page === 9}
          >
            Next
          </button>
        </div>
      </div>

      <section className="people-section">
        {status === "loading" ? (
          <div className="loader-container ">
            <img src={loader} alt="Loading" />
          </div>
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
