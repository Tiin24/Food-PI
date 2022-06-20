import React from "react";
import { Link } from "react-router-dom";
import img from "../../../img/icon.png";
import "./Nav.css";

function Nav() {
  return (
    <header>
      <nav className="navTop">
        <div className="iconFood">
          <Link to="/">
            <img src={img} alt="icon" width={`50px`} height={`50px`} />
          </Link>
        </div>
        <div className="btnCreate">
          <Link to="/create">
            <button className="btnNav">Create new Food</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
