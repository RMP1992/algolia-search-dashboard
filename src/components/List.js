import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./List.css";

const algoliasearch = require("algoliasearch");

const List = (props) => {
  const [listData, setListData] = useState({});
  useEffect(() => {
    listItems();
  }, []);
  const listItems = async () => {
    try {
      //Algolia credentials
      const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
      const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
      const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

      //Initialise the client
      const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

      //Access the index in Algolia
      const index = client.initIndex(ALGOLIA_INDEX_NAME);

      let res = await index.search("");
      //console.log("res hits: ", res.hits);
      setListData(res.hits);

      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //console.log("list item: ", listData);
  return (
    <div className="list-container">
      {Object.entries(listData).map((item, i) => (
        <Card
          key={i}
          type={item[1].room.room_type}
          address={item[1].location.address}
          city={item[1].location.name}
          number={item[1].room.room_number}
          beds={item[1].room.beds}
          view={item[1].room.view}
          price={item[1].room.price}
          availability={item[1].room.availability}
        />
      ))}
    </div>
  );
};

export default List;
