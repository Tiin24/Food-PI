import axios from "axios";

export const RECIPES = "RECIPES";
export const RECIPE_DETAIL = "RECIPE_DETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_DIET = "ORDER_BY_DIET";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/recipe`);
      return dispatch({
        type: RECIPES,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/recipe/${id}`);
      return dispatch({
        type: RECIPE_DETAIL,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/diet`);
      return dispatch({
        type: GET_DIETS,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function postRecipe(payload) {
  return async function () {
    const result = await axios.post(`/recipe`, payload);
    return {
      type: POST_RECIPE,
      payload: result.data,
    }
  }
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/recipe?name=${name}`);
      return dispatch({
        type: GET_BY_NAME,
        payload: result.data,
      });
    } catch (error) {
      alert('Recipe not found');
      console.log(error);
    }
  }
}

export function orderByName(payload){
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByDiet(payload){
  return {
    type: ORDER_BY_DIET,
    payload
  }
}





