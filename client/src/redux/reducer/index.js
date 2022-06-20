import {
  RECIPES,
  RECIPE_DETAIL,
  POST_RECIPE,
  GET_DIETS,
  GET_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_DIET,
} from "../action";

const initialState = {
  recipe: [],
  allRecipes: [],
  detail: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPES:
      console.log(action.payload);
      return {
        ...state,
        recipe: action.payload,
        allRecipes: action.payload,
      };
    case RECIPE_DETAIL:
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    case GET_DIETS:
      console.log(action.payload);
      return {
        ...state,
        diets: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_BY_NAME:
      console.log(action.payload);
      return {
        ...state,
        allRecipes: action.payload,
      };
    case ORDER_BY_NAME:
      const sortedRecipes =
        action.payload === "Asc"
          ? state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes: sortedRecipes,
      };
    case ORDER_BY_DIET:
      const recipes = state.allRecipes;
      // eslint-disable-next-line array-callback-return
      const sortedRecipesByDiet = action.payload === '' ? recipes : recipes.filter(recipe => {
        let diet = recipe.diets.map(d => d.name)
        if (diet.includes(action.payload)) {
          return recipe
        }
      })
      return {
        ...state,
        allRecipes: sortedRecipesByDiet,
      };
    default:
      return state;
  }
};

export default rootReducer;
