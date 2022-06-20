import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../../redux/action";
import icons from "../../../img/buscar.png";
import "./Search.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setName("");
  }

  return (
    <div className="group">
        <input
          className="inputS inputSs"
          type="text"
          placeholder="Search"
          onChange={(e) => handleChange(e)}
          value={name}
        />
        <button className="btnS" type="submit" onClick={(e) => handleSubmit(e)}>
          <img className="icon" src={icons} alt="icon" />
        </button> 
    </div>
  );
}

export default SearchBar;
