import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import {
  getRecipes,
  orderByName,
  orderByDiet,
  getDiets,
} from "../../redux/action/index";
import { Link } from "react-router-dom";
import Pagination from "./Paginado/index";
import Nav from "./Nav/index";
import SearchBar from "./SearchBar";
import './Filter.css'
import './Home.css'

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const allDiets = useSelector((state) => state.diets);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [order ,setOrder] = useState("");
  const [score, setScore] = useState("");

  function handleSortedByName(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setScore(e.target.value);
    e.preventDefault();
  }

  function handleSortedByDiet(e) {
    dispatch(orderByDiet(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    e.preventDefault();
  }

  return (
    <div>
      <Nav />
      <SearchBar/>
      <div className="divHome">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className="Svg_top" d="M0,96L30,106.7C60,117,120,139,180,138.7C240,139,300,117,360,96C420,75,480,53,540,48C600,43,660,53,720,80C780,107,840,149,900,181.3C960,213,1020,235,1080,218.7C1140,203,1200,149,1260,122.7C1320,96,1380,96,1410,96L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
      <div className="divF">
          <select className="selectF" onChange={(e) => handleSortedByName(e)}>
            <option className="orderF" value="">Select Order</option>
            <option value="Asc">A to Z</option>
            <option value="Desc">Z to A</option>
          </select>
          <select className="selectF" onChange={(e) => handleSortedByDiet(e)}>
            <option className="orderF"  value="">Select Diet</option>
            {allDiets?.map((diet) => {
              return (
                <option key={diet.id} value={diet.name}>
                  {diet.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {allRecipes.length > 0 ? (
        <div className="div_main">
          <div className="container">
            <div className="All_Cards">
              {currentRecipes.map((recipe) => (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <Card
                    key={recipe.id}
                    name={recipe.name}
                    diets={recipe.diets.map((diet) => diet.name).join(", ")}
                    image={recipe.image}
                    id={recipe.id}
                  ></Card>
                </Link>
              ))}
            </div>
          </div>
          <Pagination
            recipePerPage={recipesPerPage}
            recipes={allRecipes.length}
            paginado={pagination}
          />
        </div>
      ) : (
        <div className="container">
          <img src="https://media.giphy.com/media/ADyQEh474eu0o/giphy.gif" alt="loading" />
        </div>
      )}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className="Svg_bot" d="M0,192L30,208C60,224,120,256,180,250.7C240,245,300,203,360,186.7C420,171,480,181,540,186.7C600,192,660,192,720,160C780,128,840,64,900,74.7C960,85,1020,171,1080,181.3C1140,192,1200,128,1260,101.3C1320,75,1380,85,1410,90.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
    </div>
  );
}

export default Home;
