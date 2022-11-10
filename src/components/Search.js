import { useState } from "react";
import Card from "./Card";
import "./Search.css";
const algoliasearch = require("algoliasearch");

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchedData, setSearchedData] = useState({});

  const handleSearch = async () => {
    try {
      //Algolia credentials
      const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
      const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
      const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

      //Initialise the client
      const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

      //Access the index in Algolia
      const index = client.initIndex(ALGOLIA_INDEX_NAME);

      let res = await index.search(inputValue);
      //console.log("res hits: ", res.hits);
      setSearchedData(res.hits);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    await setInputValue(e.target.value);
  };

  return (
    <section className="search-section">
      <div className="search-bar-container">
        <form className="search-form">
          <input
            placeholder="Search a room by location"
            type="search"
            id="search-input"
            name="search"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            Search
          </button>
        </form>
      </div>
      {searchedData[0]?.room.availability === "available" ? (
        <div className="search-results-container">
          <div className="search-title-container">
            <h1 className="search-title">{searchedData[0].location.name}</h1>
          </div>
          <div className="search-results">
            {Object.entries(searchedData).map((data, i) => (
              <Card
                type={searchedData[0].room.room_type}
                address={searchedData[0].location.address}
                city={searchedData[0].location.name}
                number={searchedData[0].room.room_number}
                beds={searchedData[0].room.beds}
                view={searchedData[0].room.view}
                price={searchedData[0].room.price}
                availability={searchedData[0].room.availability}
              />
            ))}
          </div>
          <hr />
        </div>
      ) : null}
    </section>
  );
};

export default Search;
