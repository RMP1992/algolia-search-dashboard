import React from "react";
import "./Card.css";

const Card = (props) => {
  const { type, address, city, number, availability, price, beds, view } =
    props;
  return (
    <>
      <div className="card">
        <h3 className="info">
          <span>Room Type: {type}</span>
        </h3>
        <div className="info">
          Address: <span>{address}</span>
        </div>
        <div className="info">
          City: <span>{city}</span>
        </div>
        <div className="info">
          Room Number: <span>{number}</span>
        </div>
        <div className="info">
          Beds: <span>{beds}</span>
        </div>
        <div className="info">
          Price: <span>£{price}</span>
        </div>
        <div className="info">
          View: <span>{view}</span>
        </div>
        <div className="info">
          Availability: <span>{availability}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
