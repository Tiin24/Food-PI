import React from "react";
import './Paginado.css'

export function Pagination({ recipePerPage, recipes, paginado }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(recipes / recipePerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="nav_pag">
      <ul className="ul_pag">
        {pageNumber &&
          pageNumber.map((number) => (
            <li className="li_pag" key={number}>
              <a className="btn_pag" onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Pagination;
