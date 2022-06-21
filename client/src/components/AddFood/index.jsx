//crear un formulario para agregar un nuevo plato
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/action/index";
import './Add.css'

function validate(post) {
  let errors = {};
  if (!post.name) {
    errors.name = "El nombre es requerido";
  } else if (!isNaN(post.name)) {
    errors.name = "El nombre no puede tener numeros";
  }

  if (!post.summary) {
    errors.summary = "La descripción es requerida";
  } else if (post.summary.length > 100) {
    errors.summary = "La descripción no puede tener mas de 100 caracteres";
  }

  if (!post.steps) {
    errors.steps = "Las instrucciones son requeridas";
  } else if (post.steps.length > 100) {
    errors.steps = "Las instrucciones no pueden tener mas de 100 caracteres";
  }
  // the health score must be between 0 and 100
  if (post.health_score < 0 || post.health_score > 100) {
    errors.health_score = "El puntaje debe estar entre 0 y 100";
  }
  return errors;
}

function AddFood() {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const allDiets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});

  const [post, setPost] = useState({
    name: "",
    summary: "",
    healt_score: "",
    steps: "",
    image: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleSubmit(e) {
    if (!post.name && !post.summary) {
      e.preventDefault();
      return alert("Por favor ingrese un nombre y una descripción");
    } else if (!post.diets.length) {
      e.preventDefault();
      return alert("Por favor seleccione al menos una dieta");
    } else {
      if (!post.image) {
        post.image =
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";
      }
      dispatch(postRecipe(post));
      alert("Plato agregado");
      setPost({
        name: "",
        summary: "",
        health_score: "",
        steps: "",
        image: "",
        diets: [],
      });
      navigate("/");
    }
  }

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...post,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    const select = post.diets.find((el) => el === e.target.value);
    if (select) {
      setPost({
        ...post,
        diets: post.diets.filter((el) => el !== e.target.value),
      });
    } else {
      setPost({
        ...post,
        diets: [...post.diets, e.target.value],
      });
    }
  }

  return (
    <div className="flex">
      <div>
      <Link to="/">
        <button className="btn_back">
          <span> Go Back </span>
        </button>
      </Link>
      </div>
      <div className="card">
        <div className="card_header">
          <h1 className="form_heading">Agregar plato</h1>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="field">
            <label>Name:</label>
            <input
              className="inputAd"
              placeholder="Name"
              type="text"
              name="name"
              value={post.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="field">
            <label>Summary:</label>
            <input
              className="inputAd"
              placeholder="Summary"
              type="text"
              name="summary"
              value={post.summary}
              onChange={(e) => handleChange(e)}
            />
            {errors.summary && <p>{errors.summary}</p>}
          </div>
          <div className="field">
            <label>Health Score:</label>
            <input
              className="inputAd"
              placeholder="Health Score"
              type="number"
              name="health_score"
              value={post.health_score}
              onChange={(e) => handleChange(e)}
            />
            {errors.health_score && (<p>{errors.health_score}</p>)}
          </div>
          <div className="field">
            <label>Steps:</label>
            <input
              className="inputAd"
              placeholder="Steps"
              type="text"
              name="steps"
              value={post.steps}
              onChange={(e) => handleChange(e)}
            />
            {errors.steps && <p>{errors.steps}</p>}
          </div>
          <div className="field">
            <label>Image:</label>
            <input
              className="inputAd"
              placeholder="Image"
              type="url"
              name="image"
              value={post.image}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <select className="sele_add" onChange={(e) => handleSelect(e)}>
            <option value="">sect</option>
            {allDiets?.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <ul className="ul_add">
            <li className="li_add" >
              {post.diets.map((i) => i + ", ")}
              </li>
          </ul>
          <div className="field">
          <button className="btn_agre">Agregar</button>
          </div>
        </form>
        {/* {
        input.diets.map(e =>
        <div className="divOcc">
            <p>{e}</p>
            <button className="buttonX" onClick={() => handleDelete(e)}>X</button>
            </div>
            )}  */}
      </div>
    </div>
  );
}

export default AddFood;
