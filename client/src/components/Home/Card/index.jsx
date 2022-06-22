import React from "react";
import './Card.css'

function Card({ name, diets, image, id }) {
  return (
    <div className="card_food">
      <div>
        <img className="card_image" src={image} alt={name} max={`50px`}/>
      </div>
      <h1 className="heading" >{name}</h1>
      <p className="category">{diets}</p>
    </div>
  );
}

export default Card;
